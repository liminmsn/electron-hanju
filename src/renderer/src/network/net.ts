import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetBase } from './base/net_base'
import { NetApi } from './net_api'
import { NetCheck } from './base/net_check'

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
      new NetCheck().init().getData<NetVideoDetilItem>('_detil', this.url, (data) => {
        if (data != null && data.year.label != String(new Date().getFullYear())) {
          //如果本地有缓存数据，就直接使用
          res(data as any)
        } else {
          this.get(NetBase.Detil, NetApi.getURi(this.url)).then((res_) => {
            new NetCheck().init().saveData('_detil', this.url, res_) //缓存数据
            res(res_)
          })
        }
      })
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
        new NetCheck().init().saveData('_video', NetApi.HANJU, res_) //缓存数据
        this.data = res_
        GlobalEvents.send('titlebar_host_list', JSON.parse(this.data)['host_list']) //🔥搜
        GlobalEvents.send('view_sift_list', JSON.parse(this.data)['sift_list']) //筛选
        GlobalEvents.send('vide_page_list', JSON.parse(this.data)['page_list']) //分页
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
        new NetCheck().init().saveData('_video', NetApi.DIANYIN, res_) //缓存数据
        this.data = res_
        GlobalEvents.send('titlebar_host_list', JSON.parse(this.data)['host_list']) //🔥搜
        GlobalEvents.send('view_sift_list', JSON.parse(this.data)['sift_list']) //筛选
        GlobalEvents.send('vide_page_list', JSON.parse(this.data)['page_list']) //分页
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
        new NetCheck().init().saveData('_video', NetApi.ZONGYI, res_) //缓存数据
        this.data = res_
        GlobalEvents.send('titlebar_host_list', JSON.parse(this.data)['host_list']) //🔥搜
        GlobalEvents.send('view_sift_list', JSON.parse(this.data)['sift_list']) //筛选
        GlobalEvents.send('vide_page_list', JSON.parse(this.data)['page_list']) //分页
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
export interface PageList {
  label: string
  href: string
  select: boolean
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
