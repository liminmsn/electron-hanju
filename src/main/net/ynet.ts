import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { get, request } from 'node:https'
import { JSDOM } from 'jsdom'

export class YNet {
  constructor() {
    // console.log('hello Ynet')
    // IPC test
    try {
      ipcMain.on('ping', () => console.log('pong'))
      ipcMain.handle('get_video', this.getVideo.bind(this))
      ipcMain.handle('get_video_url', this.getVideoUrl.bind(this))
      ipcMain.handle('get_detil', this.getDetil.bind(this))
      ipcMain.handle('post_search', this.getSearch.bind(this))
    } catch (error) {
      console.log('', error)
    }
  }
  //拼接数据(get)
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
  //请求数据(post)
  private postData(label: string) {
    const postData_ = new URLSearchParams()
    postData_.append('wd', label)
    const options = {
      hostname: 'www.thanju.com',
      path: '/index.php?s=vod-search',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': Buffer.byteLength(postData_.toString())
      }
    }
    // 创建一个 FormData 对象，并添加表单数据
    return new Promise((resolve: (val: string) => void, reject) => {
      try {
        const req = request(options, (res) => {
          let body = ''
          res.on('data', (chunk: Uint8Array) => {
            body += chunk.toString()
          })
          res.on('end', () => resolve(body.toString()))
        })
        req.write(postData_.toString())
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
      title:
        document.getElementsByClassName('myui-content__detail')[0].getElementsByTagName('h1')[0]
          .textContent ?? '未知',
      bg: document
        .getElementsByClassName('myui-content__thumb')[0]
        .getElementsByTagName('img')[0]
        .getAttribute('src'),
      pic:
        document
          .getElementsByClassName('myui-content__detail')[0]
          .getElementsByClassName('branch')[0].textContent ?? '未知',
      alias: labelArr[0].childNodes[1].textContent ?? '未知',
      year: {
        label: labelArr[1].children[1].textContent ?? '未知',
        href: labelArr[1].children[1].getAttribute('href')
      },
      director: {
        label: labelArr[2].children[1].textContent ?? '未知',
        href: labelArr[2].children[1].getAttribute('href')
      },
      starring: Array.from(labelArr[3].getElementsByTagName('a')).map((item) => {
        return {
          label: item.textContent ?? '未知',
          href: item.getAttribute('href')
        }
      }),
      update: String(labelArr[4].childNodes[1].textContent).concat(
        String(labelArr[4].childNodes[3]?.textContent ?? '')
      ),
      tag: labelArr[5].childNodes[2].textContent ?? '未知',
      disc: labelArr[6].childNodes[2].textContent ?? '未知',
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
                    label: item.textContent ?? '未知',
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
          return { name: item.textContent ?? '未知', url: item.getAttribute('href') }
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
          href: item.children[0].getAttribute('href')
        })
      }
    })
    //筛选列表
    const siftList: any[] = []
    Array.from(document.getElementsByClassName('myui-screen__list')).forEach((item) => {
      const siftListItem: any[] = []
      Array.from(item.getElementsByTagName('a')).forEach((item_) => {
        siftListItem.push({
          label: item_.textContent ?? '未知',
          value: item_.getAttribute('href')
        })
      })
      siftList.push(siftListItem)
    })
    //分页
    const pageList: any[] = []
    Array.from(document.getElementsByClassName('myui-page')[0].children).forEach((item) => {
      pageList.push({
        label: item.children[0].textContent ?? '未知',
        href: item.children[0].getAttribute('href'),
        select: item.classList.contains('disabled') ? true : false
      })
    })

    return JSON.stringify({
      video_list: dataList,
      host_list: host_list,
      sift_list: siftList,
      page_list: pageList
    })
  }
  //搜索数据
  async getSearch(_e: IpcMainInvokeEvent, label: string) {
    const res = await this.postData(label)
    const dom = new JSDOM(res).window.document
    const list = dom.getElementsByClassName('myui-vodlist__media')[0]
    if (list.children.length > 0) {
      const video_list = Array.from(list.children).map((item) => {
        return {
          bg: item.children[0].children[0].getAttribute('data-original'),
          href: item.children[0].children[0].getAttribute('href'),
          title: item.children[0].children[0].getAttribute('title'),
          pic: item.children[0].children[0]
            .getElementsByClassName('pic-tag')[0]
            .textContent?.replaceAll(' ', ''),
          director: item.children[1].children[1].textContent?.replaceAll(' ', ''),
          starring: item.children[1].children[2].textContent?.replaceAll(' ', ''),
          type: item.children[1].children[3].textContent?.replaceAll(' ', '').replaceAll('\n', '\t')
        }
      })
      return video_list
    }
    return []
  }
}
