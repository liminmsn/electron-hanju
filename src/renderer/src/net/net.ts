import { NetBase } from './interface/net_base'
import { NetApi } from './net_api'

export class NetHome implements NetBase {
  getData() {
    window.electron.ipcRenderer.invoke('get', NetApi.getURi(NetApi.HANJU)).then((val) => {
      console.log(val)
    })
  }
}
