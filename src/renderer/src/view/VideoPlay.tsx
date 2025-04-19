import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import HlsPlyr from '@renderer/view_comm/HlsPlay'
import './css/videoplay.css'
import { Starring } from '@renderer/network/net'

function onClose() {
  GlobalEvents.send('video_play_show', false)
}
export default function VideoPlay({ item, title }: { item: Starring; title: string }) {
  const [url, setUrl] = useState('')
  function fetchData() {
    // new NetVideoM3u8(item.href).start().then((res) => {
    //   console.log(res)
    // })
    fetch(String('https://www.thanju.com/').concat(item.href))
      .then((res) => res.text())
      .then((body) => {
        const match = body.match(/var\s+cms_player\s*=\s*(\{.*?\});/s)
        if (match != null) {
          console.log(JSON.parse(match[1]))
          setUrl(JSON.parse(match[1])['url'])
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
        <Button onClick={onClose}>返回</Button>
      </div>
      {url != '' ? <HlsPlyr src={url} /> : <></>}
    </div>
  )
}
