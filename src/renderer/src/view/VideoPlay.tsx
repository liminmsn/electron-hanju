import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetCheck } from '@renderer/network/base/net_check'
import HlsPlyr from '@renderer/view_comm/HlsPlay'
import { Starring } from '@renderer/network/net'
import { useEffect, useState } from 'react'
import './css/videoplay.css'

function onClose() {
  GlobalEvents.send('video_play_show', false)
}
export default function VideoPlay({ item, title }: { item: Starring; title: string }) {
  const [url, setUrl] = useState('')
  function fetchData() {
    // new NetVideoM3u8(item.href).start().then((res) => {
    //   console.log(res)
    // })
    //如果本地没有缓存数据，就去请求
    new NetCheck().init().getData('_video_url', item.href, (data) => {
      if (data == null) {
        fetch(String('https://www.thanju.com/').concat(item.href))
          .then((res) => res.text())
          .then((body) => {
            const match = body.match(/var\s+cms_player\s*=\s*(\{.*?\});/s)
            if (match != null) {
              console.log(JSON.parse(match[1]))
              const obj = JSON.parse(match[1])
              new NetCheck().init().saveData('_video_url', item.href, obj['url']) //缓存数据
              setUrl(obj['url'])
            }
          })
      } else {
        //设置本地缓存url
        setUrl(data)
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="video_play">
      <div className="video_play_title">
        <h3>
          {title}&nbsp;{item.label}
        </h3>
        {/* <Button onClick={onClose}>返回</Button> */}
        <div onClick={onClose} className="video_play_close">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      {url != '' ? <HlsPlyr src={url} /> : <></>}
    </div>
  )
}
