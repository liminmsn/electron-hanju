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
import { useEffect, useState } from 'react'
import { Theme, ThemeColor } from './theme/Theme'
import VideoDetil from './view/VideoDetil'
import { YElement, YRouter, YRouterItem, YRouterProp } from './router'

const contentStyle: React.CSSProperties = {
  background: 'linear-gradient(var(--color-two), var(--color-one))'
}

const layoutStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'relative'
}

export default function AppMain() {
  //初始化路由
  const [view, setView] = useState<JSX.Element>(<></>)
  //设置主题色
  useEffect(() => {
    Theme.Init(ThemeColor.Green)
    new YRouter(
      [new YRouterItem(YRouterItem.VIEODETIL, VideoDetil)],
      (wideget: YElement, obj?: YRouterProp) => {
        if (obj != null) setView(() => wideget(obj))
        else setView(() => wideget())
      }
    )
  }, [])

  return (
    <App>
      <TitleBar />
      <Layout style={layoutStyle}>
        <SiderArr />
        {view}
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
