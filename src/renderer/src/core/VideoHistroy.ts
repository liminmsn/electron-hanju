import { NetVideoDetilItem, Starring } from '@renderer/network/net'

//扩展视频详情
export class VideoHistroyItem {
  one: NetVideoDetilItem
  two: Starring
  constructor(one: NetVideoDetilItem, two: Starring) {
    this.one = one
    this.two = two
  }
}

export class VideoHistroy {
  private save() {
    localStorage.setItem(VideoHistroy.name, JSON.stringify(this.histroy))
  }
  histroy: VideoHistroyItem[] = []
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
        const idx = this.histroy.indexOf(itm)
        this.histroy.splice(idx, 1)
      }
    })
    this.save()
  }
}
