import { Content } from 'antd/es/layout/layout'
import { Route, Routes } from 'react-router'
import { App, Layout } from 'antd'
import Home from './view/home/Home'
import TitleBar from './components/TitleBar'
import SiderArr from './components/SiderArr'
import About from './view/about/About'

export default function AppMin() {
  const contentStyle: React.CSSProperties = {
    padding: '2pt',
    paddingRight: '0'
  }

  const layoutStyle: React.CSSProperties = {
    overflow: 'hidden',
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
              <Route path="/" Component={Home}></Route>
              <Route path="/about" Component={About}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </App>
  )
}
