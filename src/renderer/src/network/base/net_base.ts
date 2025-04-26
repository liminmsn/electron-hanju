import { Dispatch, SetStateAction } from 'react'
import { NetApi } from '../net_api'
import { GlobalEvents } from '@renderer/core/GlobalEvents'

export abstract class NetBase {
  static Video = '_video'
  static VideoUrl = '_video_url'
  static Detil = '_detil'
  //子类实现
  abstract start(): Promise<any>
  abstract data: string
  /**缓存判断 */
  async get(cmd: string, url: string) {
    const _cmd = String('get').concat(cmd)
    return await window.electron.ipcRenderer.invoke(_cmd, url)
  }
  /*获取数据*/
  getData<T>(setState: Dispatch<SetStateAction<T>>) {
    this.start().then((val: T) => {
      setState(() => val)
    })
  }
  /*查询数据*/
  sift(url: string) {
    const url_ = NetApi.getBodyUrl(url)
    this.get(NetBase.Video, url_).then((res_: string) => {
      GlobalEvents.send('titlebar_host_list', JSON.parse(res_)['host_list'])
      GlobalEvents.send('up_video_list', JSON.parse(res_)['video_list'])
      GlobalEvents.send('vide_page_list', JSON.parse(res_)['page_list'])
    })
  }
  /**搜索 */
  async search(label: string) {
    return await window.electron.ipcRenderer.invoke('post_search', label)
  }
}
