import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { get } from 'node:https'
// import { JSDOM } from 'jsdom'
// import { writeFile } from 'node:fs'

export class YNet {
  constructor() {
    console.log('hello Ynet')
    // IPC test
    try {
      ipcMain.on('ping', () => console.log('pong'))
      ipcMain.handle('get', this.get)
    } catch (error) {
      console.log('', error)
    }
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

        res.on('end', () => {
          resole(body)
          // writeFile('./test.html', body, (err) => {
          //   if (err) {
          //     console.error(err)
          //     return
          //   }
          //   // file written successfully
          //   console.log('file written successfully')
          // })
          // // 创建一个虚拟的 DOM 环境
          // const dom = new JSDOM(body)
          // // 获取文档对象
          // const document = dom.window.document
          // // 操作 DOM
          // const arr = Array.from(document.querySelectorAll('.myui-panel_bd')).map((item) => item)
          // arr.forEach((item) => {
          //   const item_ = item.getElementsByClassName('clearfix')[0]
          //   if (item_ != null) {
          //     resole(
          //       JSON.stringify(
          //         Array.from(item_.getElementsByTagName('a')).map((a) => a.style.backgroundImage)
          //       )
          //     )
          //   }
          // })
          // resole(arr)
        })
      })
      req.on('error', (e) => reject(e))
    })
  }
}
