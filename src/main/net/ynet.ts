import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { get } from 'node:https'
import { JSDOM } from 'jsdom'

export class YNet {
  constructor() {
    console.log('hello Ynet')
    // IPC test
    try {
      ipcMain.on('ping', () => console.log('pong'))
      ipcMain.handle('get_video', this.getVideo.bind(this))
    } catch (error) {
      console.log('', error)
    }
  }
  private getData(url: string) {
    return new Promise((resole: (val: string) => void) => {
      let body = ''
      const req = get(url, (res) => {
        res.on('data', (chunk: Uint8Array) => {
          body += chunk.toString()
        })
        res.on('end', () => resole(body.toString()))
        res.on('error', (e) => resole(JSON.stringify(e)))
      })
      req.end()
    })
  }

  async getVideo(_e: IpcMainInvokeEvent, url: string) {
    const body = await this.getData(url)
    const dom = new JSDOM(body)
    const document = dom.window.document
    const ulBox = document.getElementsByClassName('myui-vodlist')[0]
    const dataList: object[] = []
    Array.from(ulBox.children).filter((item) => {
      const obj = item.children[0].children[0]
      const obj_2 = item.children[0].children[1]
      const title = obj.getAttribute('title')
      const bg = obj.getAttribute('style')?.replaceAll('background:', '').replaceAll(';', '')
      const href = obj.getAttribute('href')
      dataList.push({
        title,
        bg,
        href,
        pic: {
          one: obj.getElementsByClassName('pic-tag')[0].textContent?.replaceAll(' ', ''),
          two: obj.getElementsByClassName('pic-text')[0].textContent
        },
        actor: Array.from(obj_2.children[1].children).map((item) => {
          return { name: item.textContent, url: item.getAttribute('href') }
        })
      })
    })
    // console.log('123')
    return JSON.stringify(dataList)
  }
}
