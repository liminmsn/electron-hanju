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
  actor: Array<{
    name: string
    url: string
  }>
}

export class NetHanJu extends NetBase {
  public data: string = ''
  start() {
    return new Promise((res: (val: VideItem[]) => void) => {
      this.get(NetBase.Video, NetApi.getURi(NetApi.HANJU)).then((res_: string) => {
        this.data = res_
        res(JSON.parse(this.data))
      })
    })
  }
}
export class NetDianYin extends NetBase {
  public data: string = ''
  start() {
    return new Promise((res: (val: VideItem[]) => void) => {
      this.get(NetBase.Video, NetApi.getURi(NetApi.DIANYIN)).then((res_: string) => {
        this.data = res_
        res(JSON.parse(this.data))
      })
    })
  }
}
export class NetZongYi extends NetBase {
  public data: string = ''
  start() {
    return new Promise((res: (val: VideItem[]) => void) => {
      this.get(NetBase.Video, NetApi.getURi(NetApi.ZONGYI)).then((res_: string) => {
        this.data = res_
        res(JSON.parse(this.data))
      })
    })
  }
}
