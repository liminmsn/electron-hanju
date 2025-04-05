import { Header, Content } from 'antd/es/layout/layout'
import { Route, Routes } from 'react-router'
import { App, Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Home from './view/home/Home'
import TitleBar from './components/TitleBar'

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

  const siderStyle: React.CSSProperties = {
    background: 'white',
    boxShadow: '1px 1px 2pt #0000001f'
  }
  return (
    <>
      <App>
        <TitleBar />
        <Layout style={layoutStyle}>
          <Sider width={140} style={siderStyle}>
            Sider
          </Sider>
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
