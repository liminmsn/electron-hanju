type CMDTYPE = '_video' | '_video_url' | '_detil'
export class NetCheck {
  _video: Map<string, string> = new Map()
  _video_url: Map<string, string> = new Map()
  _detil: Map<string, string> = new Map()
  init(): NetCheck {
    const val = localStorage.getItem(NetCheck.name)
    if (val != null) {
      const json = JSON.parse(val)
      this._video = json['_video']
      this._detil = json['_detil']
      this._video_url = json['_video_url']
    }
    return this
  }
  private getMap(key: string): Map<string, string> {
    if (key == '_video') return this._video
    if (key == '_video_url') return this._video_url
    if (key == '_detil') return this._detil
    return new Map()
  }
  getData(cmd: CMDTYPE, url: string, callback: (data: string) => void) {
    const map = this.getMap(cmd)
    callback(map[url])
  }
  saveData(cmd: CMDTYPE, url: string, data: string) {
    const map = this.getMap(cmd)
    map[url] = data
    localStorage.setItem(NetCheck.name, JSON.stringify(this))
  }
}
