import { Content } from 'antd/es/layout/layout'
import { Route, Routes } from 'react-router'
import { App, Layout } from 'antd'
import TitleBar from './comm/TitleBar'
import SiderArr from './comm/SiderArr'
import About from './view/about/About'
import HanJu from './view/HanJu'
import DianYin from './view/DianYin'
import ZongYi from './view/ZongYi'
import Setting from './view/setting/Setting'
import { useEffect } from 'react'
import { Theme, ThemeColor } from './theme/Theme'

export default function AppMin() {
  const contentStyle: React.CSSProperties = {
    background: 'linear-gradient(var(--color-one), var(--color-two))'
  }

  const layoutStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh'
  }

  useEffect(() => Theme.Init(ThemeColor.Green), [])

  return (
    <App>
      <TitleBar />
      <Layout style={layoutStyle}>
        <SiderArr />
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
