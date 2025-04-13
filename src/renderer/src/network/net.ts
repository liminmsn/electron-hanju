import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetBase } from './base/net_base'
import { NetApi } from './net_api'
export class NetHanJu extends NetBase {
  public data: string = ''
  start() {
    return new Promise((res: (val: VideItem) => void) => {
      this.get(NetBase.Video, NetApi.getURi(NetApi.HANJU)).then((res_: string) => {
        this.data = res_
        GlobalEvents.send('titlebar_host_list', JSON.parse(this.data)['host_list'])
        GlobalEvents.send('view_sift_list', JSON.parse(this.data)['sift_list'])
        res(JSON.parse(this.data)['video_list'])
      })
    })
  }
}
export class NetDianYin extends NetBase {
  public data: string = ''
  start() {
    return new Promise((res: (val: VidoeList[]) => void) => {
      this.get(NetBase.Video, NetApi.getURi(NetApi.DIANYIN)).then((res_: string) => {
        this.data = res_
        GlobalEvents.send('titlebar_host_list', JSON.parse(this.data)['host_list'])
        GlobalEvents.send('view_sift_list', JSON.parse(this.data)['sift_list'])
        res(JSON.parse(this.data)['video_list'])
      })
    })
  }
}
export class NetZongYi extends NetBase {
  public data: string = ''
  start() {
    return new Promise((res: (val: VidoeList[]) => void) => {
      this.get(NetBase.Video, NetApi.getURi(NetApi.ZONGYI)).then((res_: string) => {
        this.data = res_
        GlobalEvents.send('titlebar_host_list', JSON.parse(this.data)['host_list'])
        GlobalEvents.send('view_sift_list', JSON.parse(this.data)['sift_list'])
        res(JSON.parse(this.data)['video_list'])
      })
    })
  }
}

export interface VidoeList {
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
export interface HostList {
  label: string
  url: string
}
export interface SiftList {
  value: string
  label: string
}
export interface VideItem {
  video_list: VidoeList[]
  host_list: HostList[]
  sift_list: SiftList[][]
}
