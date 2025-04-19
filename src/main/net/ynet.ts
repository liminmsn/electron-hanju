import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { get } from 'node:https'
import { JSDOM } from 'jsdom'

export class YNet {
  constructor() {
    console.log('hello Ynet')
    // IPC test
    try {
      ipcMain.on('ping', () => console.log('pong'))
      ipcMain.handle('get_video', this.getVideo.bind(this))
      ipcMain.handle('get_video_url', this.getVideoUrl.bind(this))
      ipcMain.handle('get_detil', this.getDetil.bind(this))
    } catch (error) {
      console.log('', error)
    }
  }
  //拼接数据
  private getData(url: string) {
    return new Promise((resole: (val: string) => void, reject) => {
      let body = ''
      try {
        const req = get(url, (res) => {
          res.on('data', (chunk: Uint8Array) => {
            body += chunk.toString()
          })
          res.on('end', () => resole(body.toString()))
        })
        req.end()
      } catch (error) {
        reject(error)
      }
    })
  }
  //获取视频地址
  async getVideoUrl(_e: IpcMainInvokeEvent, url: string) {
    const body = await this.getData(url)
    const dom = new JSDOM(body)
    const document = dom.window.document
    //获取视频地址
    // 'var cms_player = {"yun":true,"url":"https:\\/\\/v10.tlkqc.com\\/wjv10\\/202503\\/22\\/UBWapDNKjY82\\/video\\/index.m3u8","copyright":0,"name":"wjm3u8","jiexi":"","time":10,"buffer":"","pause":"","next_path":"\\/play\\/2305\\/1-2.html","next_url":"https:\\/\\/v3.tlkqc.com\\/wjv3\\/202503\\/26\\/Gq0k8ksbTE75\\/video\\/index.m3u8"};'
    const videoUrl = document.getElementsByClassName('embed-responsive')[0].children[0].textContent
    return videoUrl?.replace('var cms_player = ', '').replace(';', '')
  }
  //获取视详情
  async getDetil(_e: IpcMainInvokeEvent, url: string) {
    const body = await this.getData(url)
    const dom = new JSDOM(body)
    const document = dom.window.document
    //获取视频详情
    const labelArr = Array.from(
      document.getElementsByClassName('myui-content__detail')[0].getElementsByTagName('p')
    ).filter((item) => item.children.length > 0)
    return {
      alias: labelArr[0].childNodes[1].textContent,
      year: {
        label: labelArr[1].children[1].textContent,
        href: labelArr[1].children[1].getAttribute('href')
      },
      director: {
        label: labelArr[2].children[1].textContent,
        href: labelArr[2].children[1].getAttribute('href')
      },
      starring: Array.from(labelArr[3].getElementsByTagName('a')).map((item) => {
        return {
          label: item.textContent,
          href: item.getAttribute('href')
        }
      }),
      update: String(labelArr[4].childNodes[1].textContent).concat(
        String(labelArr[4].childNodes[3]?.textContent ?? '')
      ),
      tag: labelArr[5].childNodes[2].textContent,
      disc: labelArr[6].childNodes[2].textContent,
      movieClips: (function () {
        const videoList: any[] = []
        const tb = Array.from(document.getElementsByClassName('myui-panel-box')[0].children)
        Array.from(tb[0].children[0].children[2].children).forEach((li, idx) => {
          videoList.push({
            title: li.textContent?.replaceAll(' ', '').replace('\n', ''),
            list: (function () {
              const arr = Array.from(Array.from(tb[1].children)[idx].getElementsByTagName('a')).map(
                (item) => {
                  return {
                    label: item.textContent,
                    href: item.getAttribute('href')
                  }
                }
              )
              return arr
            })()
          })
        })
        return videoList
      })()
    }
  }
  //获取视频列表
  async getVideo(_e: IpcMainInvokeEvent, url: string) {
    const body = await this.getData(url)
    const dom = new JSDOM(body)
    const document = dom.window.document
    //视频列表
    const ulBox = document.getElementsByClassName('myui-vodlist')[0]
    const dataList: object[] = []
    Array.from(ulBox.children).filter((item) => {
      const obj = item.children[0].children[0]
      const obj_2 = item.children[0].children[1]
      const title = obj.getAttribute('title')
      const bg = obj.getAttribute('style')?.replaceAll('background:', '').replaceAll(';', '')
      const href = obj.getAttribute('href')
      dataList.push({
        title,
        bg,
        href,
        pic: {
          one: obj.getElementsByClassName('pic-tag')[0].textContent?.replaceAll(' ', ''),
          two: obj.getElementsByClassName('pic-text')[0].textContent
        },
        actor: Array.from(obj_2.children[1].children).map((item) => {
          return { name: item.textContent, url: item.getAttribute('href') }
        })
      })
    })
    //搜索热搜列表
    const host = document.getElementsByClassName('search-dropdown-hot')[0].children[0]
    const host_list: any[] = []
    Array.from(host.children).forEach((item) => {
      if (item.children.length > 0) {
        host_list.push({
          label: item.children[0].getAttribute('title'),
          url: item.children[0].getAttribute('href')
        })
      }
    })
    //年份
    const siftList: any[] = []
    Array.from(document.getElementsByClassName('myui-screen__list')).forEach((item) => {
      const siftListItem: any[] = []
      Array.from(item.getElementsByTagName('a')).forEach((item_) => {
        siftListItem.push({
          label: item_.textContent,
          value: item_.getAttribute('href')
        })
      })
      siftList.push(siftListItem)
    })
    return JSON.stringify({
      video_list: dataList,
      host_list: host_list,
      sift_list: siftList
    })
  }
}
