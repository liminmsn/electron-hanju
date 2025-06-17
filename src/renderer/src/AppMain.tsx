import React, { useEffect, useState } from 'react'
import { GlobalEvents } from './core/GlobalEvents'
import { Theme, ThemeColor } from './theme/Theme'
import { Route, Routes } from 'react-router'
import { App, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Setting from './view/setting/Setting'
import TitleBar from './view_comm/TitleBar'
import SiderArr from './view_comm/SiderArr'
import VideoDetil from './view/VideoDetil'
import DianYin from './view/DianYin'
import ZongYi from './view/ZongYi'
import HanJu from './view/HanJu'
import About from './view/About'
import Histroy from './view/Histroy'
import Search from './view/Search'
import Pay, { pay_query_closure, PayQuery } from './view/Pay'
import { NodeEvent } from './core/NodeEvent'

const contentStyle: React.CSSProperties = {
  background: 'linear-gradient(var(--color-two), var(--color-one))'
}

const layoutStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'relative'
}

export default function AppMain() {
  Theme.Init(ThemeColor.Yellow) //设置主题色
  const [show, showVideoDetil] = useState(false) //视频详情
  const [show_search, showSearch] = useState(false) //搜索
  GlobalEvents.on('video_detil_show', (bol) => showVideoDetil(bol))
  GlobalEvents.on('video_search_show', (bol) => showSearch(bol))
  useEffect(() => {
    initPreimumState();
    new NodeEvent();
  }, [])
  return (
    <App>
      {/* 详情 */}
      {show ? <VideoDetil /> : <></>}
      {/* 搜索 */}
      {show_search ? <Search /> : <></>}
      <TitleBar />
      <Layout style={layoutStyle}>
        <SiderArr />
        <Layout>
          <Content style={contentStyle}>
            <Routes>
              <Route path="/" Component={HanJu}></Route>
              <Route path="/dy" Component={DianYin}></Route>
              <Route path="/zy" Component={ZongYi}></Route>
              <Route path="/histroy" Component={Histroy}></Route>
              <Route path="/about" Component={About}></Route>
              <Route path="/setting" Component={Setting}></Route>
              <Route path="/pay" Component={Pay}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </App>
  )
}
//初始化订阅数据
const pay_query = pay_query_closure(null)
function initPreimumState() {
  pay_query((res: PayQuery) => {
    if (res.code == 200) {
      localStorage.setItem('pay_premium_time', JSON.stringify(res.data.premium_time))
    } else {
      localStorage.setItem('pay_premium_time', JSON.stringify(-1))
    }
    setTimeout(() => {
      GlobalEvents.send('slider_arr_update', 0)
    }, 1000)
  }, '1')
}
