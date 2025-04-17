import { Content } from 'antd/es/layout/layout'
import { Route, Routes } from 'react-router'
import { App, Layout } from 'antd'
import TitleBar from './view_comm/TitleBar'
import SiderArr from './view_comm/SiderArr'
import About from './view/about/About'
import HanJu from './view/HanJu'
import DianYin from './view/DianYin'
import ZongYi from './view/ZongYi'
import Setting from './view/setting/Setting'
import { Theme, ThemeColor } from './theme/Theme'
import VideoDetil from './view/VideoDetil'
import React, { useEffect, useState } from 'react'
import { GlobalEvents } from './core/GlobalEvents'

const contentStyle: React.CSSProperties = {
  background: 'linear-gradient(var(--color-two), var(--color-one))'
}

const layoutStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'relative'
}

export default function AppMain() {
  //设置主题色
  Theme.Init(ThemeColor.Green)
  const [show, showVideoDetil] = useState(false)
  useEffect(() => {
    GlobalEvents.on('video_detil_open', () => showVideoDetil(true))
    GlobalEvents.on('video_detil_close', () => showVideoDetil(false))
  }, [])
  return (
    <App>
      <TitleBar />
      <Layout style={layoutStyle}>
        <SiderArr />
        {show ? <VideoDetil /> : <></>}
        <Layout>
          <Content style={contentStyle}>
            <Routes>
              <Route path="/" Component={HanJu}></Route>
              <Route path="/dy" Component={DianYin}></Route>
              <Route path="/zy" Component={ZongYi}></Route>
              <Route path="/about" Component={About}></Route>
              <Route path="/setting" Component={Setting}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </App>
  )
}
