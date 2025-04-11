import { NetBase } from './base/net_base'
import { NetApi } from './net_api'

export interface VideItem {
  title: string
  bg: string
  href: string
  pic: {
    one: string
    two: string
  }
}

export class NetHanJu extends NetBase {
  start() {
    return new Promise((res: (val: VideItem[]) => void) => {
      this.get(NetBase.HANJU, NetApi.getURi(NetApi.HANJU)).then((res_: string) =>
        res(JSON.parse(res_))
      )
    })
  }
}
