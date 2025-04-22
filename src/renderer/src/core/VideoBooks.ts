import { VidoeList } from '@renderer/network/net'

export class VideoBooks {
  private histroy: VidoeList[] = []
  private save() {
    localStorage.setItem(VideoBooks.name, JSON.stringify(this.histroy))
  }
  init() {
    const histtroy = localStorage.getItem(VideoBooks.name)
    if (histtroy == null) {
      localStorage.setItem(VideoBooks.name, '[]')
    } else {
      this.histroy = JSON.parse(histtroy)
    }
    return this
  }
  isBook(item: VidoeList): boolean {
    const val = this.histroy.filter((itm) => itm.title == item.title)
    return val.length > 0
  }
  book(item: VidoeList) {
    if (this.isBook(item)) {
      this.del(item)
    } else {
      this.histroy.unshift(item)
    }
    this.save()
    return this.isBook(item)
  }
  del(item: VidoeList) {
    this.histroy.forEach((itm) => {
      if (itm.title == item.title) {
        const idx = this.histroy.indexOf(itm)
        this.histroy.splice(idx, 1)
      }
    })
    this.save()
  }
}
