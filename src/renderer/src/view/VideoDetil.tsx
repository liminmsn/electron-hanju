import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import './css/videodetil.css'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { VidoeList } from '@renderer/network/net'
import HlsPlyr from './HlsPlay'

const videoStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'absolute'
}
function onClose() {
  GlobalEvents.send('video_detil_close', null)
}
export default function VideoDetil() {
  const [item, setItem] = useState<VidoeList>(new VidoeList())
  const { title, actor } = item

  useEffect(() => {
    //从本地读取传参
    const val = localStorage.getItem('video_detil_args')
    if (val != null) {
      setItem(() => JSON.parse(val))
    }
  }, [])

  return (
    <div style={videoStyle} className="videoDetil">
      <div className="title">
        <Button onClick={onClose}>返回</Button>
      </div>
      <div className="center">
        <div>
          <img src={item.bg.replace('url(', '').replace(')', '')} />
          <div>{item.pic.two}</div>
        </div>
        <div className="right">
          <div>{title}</div>
          <div>演员:{actor.map((item) => item.name).join('\t')}</div>
          <Button style={{ marginTop: '10vh' }}>立即播放</Button>
        </div>
        {/* <ReactPlayer
          url="https://v5.tlkqc.com/wjv5/202503/29/fcjnM5g8ct77/video/index.m3u8"
          controls
          playing
          width="100%"
          height="100%"
        /> */}
        <HlsPlyr src="https://v5.tlkqc.com/wjv5/202503/29/fcjnM5g8ct77/video/index.m3u8" />
      </div>
    </div>
  )
}
