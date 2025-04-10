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

type PromisteRes = (val: VideItem[]) => void
export class NetHanJu extends NetBase {
  start(): Promise<VideItem[]> {
    return new Promise((res: PromisteRes) => {
      this.get(NetBase.HANJU, NetApi.getURi(NetApi.HANJU)).then((res_: string) =>
        res(JSON.parse(res_) as VideItem[])
      )
    })
  }
}
