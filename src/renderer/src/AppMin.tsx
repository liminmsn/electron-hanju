import { Content } from 'antd/es/layout/layout'
import { Route, Routes } from 'react-router'
import { App, Layout } from 'antd'
import TitleBar from './components/TitleBar'
import SiderArr from './components/SiderArr'
import About from './view/about/About'
import HanJu from './view/hanju/HanJu'
import DianYin from './view/dianyin/DianYin'
import ZongYi from './view/zongyi/ZongYi'

export default function AppMin() {
  const contentStyle: React.CSSProperties = {
    // backgroundColor: 'var(--color-two)',
    background: 'linear-gradient(45deg, var(--color-one), var(--color-two))'
  }

  const layoutStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh'
  }

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
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </App>
  )
}
