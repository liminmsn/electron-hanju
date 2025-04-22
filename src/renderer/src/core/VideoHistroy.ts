import { Starring, VidoeList } from '@renderer/network/net'

//扩展视频详情
export class VideoHistroyItem {
  one: VidoeList
  two: Starring
  constructor(one: VidoeList, two: Starring) {
    this.one = one
    this.two = two
  }
}

export class VideoHistroy {
  private histroy: VideoHistroyItem[] = []
  private save() {
    localStorage.setItem(VideoHistroy.name, JSON.stringify(this.histroy))
  }
  init() {
    const histtroy = localStorage.getItem(VideoHistroy.name)
    if (histtroy == null) {
      localStorage.setItem(VideoHistroy.name, '[]')
    } else {
      this.histroy = JSON.parse(histtroy)
    }
    return this
  }
  add(item: VideoHistroyItem) {
    this.del(item)
    this.histroy.unshift(item)
    this.save()
  }
  del(item: VideoHistroyItem) {
    this.histroy.forEach((itm) => {
      if (itm.one.title == item.one.title) {
        if (this.histroy.length > 1) {
          const idx = this.histroy.indexOf(itm)
          this.histroy = this.histroy.splice(idx, idx + 1)
        } else {
          this.histroy = []
        }
      }
    })
    this.save()
  }
}
