import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

export class TitleBar {
  private win: BrowserWindow
  constructor(win: BrowserWindow) {
    this.win = win
    //关闭原生的标题栏
    ipcMain.on('', this.fun)
    ipcMain.on('', this.fun)
    ipcMain.on('', this.fun)
  }
  fun(_e: IpcMainEvent, args: string) {
    console.log(_e)
    console.log(args)
    return ''
  }
}
