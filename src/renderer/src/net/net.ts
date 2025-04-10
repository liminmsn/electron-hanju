import { NetBase } from './base/net_base'
import { NetApi } from './net_api'

type PromisteRes = (val: object) => void
export class NetHanJu extends NetBase {
  start(): Promise<object> {
    return new Promise((res: PromisteRes) => {
      this.get(NetBase.HANJU, NetApi.getURi(NetApi.HANJU)).then((res_: object) => res(res_))
    })
  }
}
