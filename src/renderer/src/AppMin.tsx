import { Header, Content } from 'antd/es/layout/layout'
import { Route, Routes } from 'react-router'
import { App, Layout } from 'antd'
import Home from './view/home/Home'
import TitleBar from './components/TitleBar'
import SiderArr from './components/SiderArr'

export default function AppMin() {
  const contentStyle: React.CSSProperties = {
    // textAlign: 'center',
    // minHeight: 120,
    // lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#0958d9'
  }

  const layoutStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh'
  }

  const headerStyle: React.CSSProperties = {
    height: 40,
    paddingInline: 0,
    lineHeight: 1,
    background: '#00000000'
  }

  return (
    <>
      <App>
        <TitleBar />
        <Layout style={layoutStyle}>
          {/* <Sider width={140} style={siderStyle}>
            Sider
          </Sider> */}
          <SiderArr />
          <Layout>
            <Header style={headerStyle}>Header</Header>
            <Content style={contentStyle}>
              <Routes>
                <Route path="/" Component={Home}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </App>
    </>
  )
}
