import React from 'react'
import './css/videodetil.css'
import { Button } from 'antd'
import { YRouter, YRouterProp } from '@renderer/router'
import { VidoeList } from '@renderer/network/net'

const videoStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'absolute',
  zIndex: '2',
  backgroundColor: 'red'
}
export default function VideoDetil(obj?: YRouterProp) {
  const { title, href } = obj?.args as VidoeList
  return (
    <div style={videoStyle} className="videoDetil">
      <div className="title">
        <Button onClick={() => YRouter.I.break()}>返回123</Button>
        <span className="label">{title}</span>
      </div>
      {href}
    </div>
  )
}
