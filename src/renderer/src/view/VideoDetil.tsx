import React from 'react'
import './css/videodetil.css'
import { Button } from 'antd'
import { YRouter } from '@renderer/router'

const videoStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'absolute',
  zIndex: '2',
  backgroundColor: 'red'
}
export default function VideoDetil() {
  return (
    <div style={videoStyle} className="videoDetil">
      <div>标题</div>
      <Button onClick={() => YRouter.I.break()}>返回</Button>
    </div>
  )
}
