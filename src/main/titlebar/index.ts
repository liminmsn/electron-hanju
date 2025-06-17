import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

export class TitleBar {
  //覆盖原生的标题栏事件
  constructor(mainWindow: BrowserWindow) {
    mainWindow.on('maximize', () => {
      // 窗口最大化事件
      mainWindow.webContents.send('fa-expand', true)
    })

    mainWindow.on('unmaximize', () => {
      // 窗口取消最大化事件
      mainWindow.webContents.send('fa-expand', false)
    })

    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
      // mainWindow.webContents.openDevTools()
    })
    ipcMain.on('titlebar', this.fun)
  }
  fun(_e: IpcMainEvent, args: string) {
    const win = BrowserWindow.getFocusedWindow()
    if (win != null)
      switch (args) {
        case 'fa-minus':
          win.minimize()
          break
        case 'fa-expand':
          if (win.isMaximized()) win.restore()
          else win.maximize()
          //告诉前端
          win.webContents.send('fa-expand', win.isMaximized())
          break
        case 'fa-xmark':
          win.close()
          break
      }
  }
}
