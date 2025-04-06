import { NetBase } from './interface/net_base'

export class NetHome implements NetBase {
  getData() {
    window.electron.ipcRenderer
      .invoke('get', 'https://www.thanju.com/list-select-id-1-order-addtime.html')
      .then((val) => {
        console.log(val)
      })
  }
}
