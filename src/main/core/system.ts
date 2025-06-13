import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { machineIdSync } from 'node-machine-id'
export class System {
  constructor() {
    ipcMain.handle('system', this.fun.bind(this))
  }
  fun(_e: IpcMainInvokeEvent, type: string) {
    let data: any = {}
    switch (type) {
      case 'device_id':
        data = this.getDeviceId()
        break
    }
    return data
  }
  getDeviceId() {
    // 同步获取设备唯一 ID
    const id = machineIdSync()
    return id;
  }
}
