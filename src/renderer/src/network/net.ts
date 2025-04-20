import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetBase } from './base/net_base'
import { NetApi } from './net_api'

//视频m3u8地址
export class NetVideoM3u8 extends NetBase {
  public data: string = ''
  public url: string
  constructor(url: string) {
    super()
    this.url = url
  }
  start() {
    return new Promise((res: (val: any) => void) => {
      this.get(NetBase.VideoUrl, NetApi.getURi(this.url)).then((res_) => res(res_))
    })
  }
}

//视频详情页
export class NetVideoDetil extends NetBase {
  public data: string = ''
  public url: string
  constructor(url: string) {
    super()
    this.url = url
  }
  start() {
    return new Promise<NetVideoDetilItem>((res: (val: NetVideoDetilItem) => void) => {
      this.get(NetBase.Detil, NetApi.getURi(this.url)).then((res_) => res(res_))
    })
  }
}
export class NetVideoDetilItem {
  title: string = '--'
  bg: string = '--'
  pic: string = '--'
  alias: string = '--'
  year: NetVideoDetilItemYear = { label: '--', href: '--' }
  director: NetVideoDetilItemDirector = { label: '--', href: '--' }
  starring: Starring[] = []
  update: string = '--'
  tag: string = '--'
  disc: string = '--'
  movieClips: movieClipsItem[] = [{ title: '播放源', list: [] }]
  static init() {
    return new NetVideoDetilItem()
  }
}

export interface NetVideoDetilItemYear {
  label: string
  href: string
}

export interface NetVideoDetilItemDirector {
  label: string
  href: string
}

export interface Starring {
  label: string
  href: string
}

export interface movieClipsItem {
  title: string
  list: Starring[]
}

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

export class VidoeList {
  title: string = '--'
  bg: string = ''
  href: string = ''
  pic: {
    one: string
    two: string
  } = { one: '', two: '' }
  actor: Array<{
    name: string
    url: string
  }> = []
}
export interface HostList {
  label: string
  href: string
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
