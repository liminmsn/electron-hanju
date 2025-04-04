import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { get } from 'node:https'

export class YNet {
  constructor() {
    console.log('hello Ynet')
    // IPC test
    ipcMain.on('ping', () => console.log('pong'))
    ipcMain.handle('get', this.get)
  }

  async get(_e: IpcMainInvokeEvent, url: string) {
    return new Promise((resole, reject) => {
      let body: string = ''

      const req = get(url, async function (res) {
        console.log('statusCode:', res.statusCode)
        console.log('headers:', res.headers)

        res.on('data', (chunk: Uint8Array) => {
          body += chunk.toString()
        })

        res.on('end', () => resole(body))
      })
      req.on('error', (e) => reject(e))
    })
  }
}
