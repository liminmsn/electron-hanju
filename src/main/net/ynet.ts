import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { get } from 'node:https'
import { JSDOM } from 'jsdom'

export class YNet {
  constructor() {
    console.log('hello Ynet')
    // IPC test
    try {
      ipcMain.on('ping', () => console.log('pong'))
      ipcMain.handle('get_hanju', this.getHanju.bind(this))
    } catch (error) {
      console.log('', error)
    }
  }
  getData(url: string) {
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

  async getHanju(_e: IpcMainInvokeEvent, url: string) {
    const body = await this.getData(url)
    const dom = new JSDOM(body)
    const document = dom.window.document
    return document.textContent
  }
}
