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
    return new Promise((resole: (val: string) => void, reject) => {
      let body = ''
      try {
        const req = get(url, (res) => {
          res.on('data', (chunk: Uint8Array) => {
            body += chunk.toString()
          })
          res.on('end', () => resole(body.toString()))
        })
        req.end()
      } catch (error) {
        reject(error)
      }
    })
  }

  async getVideo(_e: IpcMainInvokeEvent, url: string) {
    const body = await this.getData(url)
    const dom = new JSDOM(body)
    const document = dom.window.document
    //视频列表
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
    //搜索热搜列表
    const host = document.getElementsByClassName('search-dropdown-hot')[0].children[0]
    const host_list: any[] = []
    Array.from(host.children).forEach((item) => {
      if (item.children.length > 0) {
        host_list.push({
          label: item.children[0].getAttribute('title'),
          url: item.children[0].getAttribute('href')
        })
      }
    })

    return JSON.stringify({
      video_list: dataList,
      host_list: host_list
    })
  }
}
