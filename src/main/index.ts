import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { YNet } from './net/ynet'
import { TitleBar } from './titlebar'
import { System } from './core/system'
import { YErrorEvent } from './core/yerror_event'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    minWidth: 900,
    minHeight: 800,
    height: 800,
    width: 900,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  //本地通讯网络请求
  new YNet()
  //系统对象
  new System()
  //扩展出去win对象的其它操作
  new TitleBar(mainWindow)
  //系统进程报错处理
  new YErrorEvent(mainWindow)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.haokanhanju3')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})