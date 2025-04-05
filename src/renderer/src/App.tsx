import '@renderer/assets/app.css'
import { IpcRendererEvent } from 'electron'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './view/home/Home'

import { Layout } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

export default function App() {
  //更改标题栏的全屏小化按钮
  const [expand, setExpand] = useState(false)
  useEffect(() => {
    //监听全名状态变化
    window.electron.ipcRenderer.on('fa-expand', (_e: IpcRendererEvent, bol) => {
      setExpand(bol)
    })
  })
  //顶部右上方的按钮
  const btns: string[] = ['fa-minus', 'fa-expand', 'fa-xmark']
  //按钮点击调用electron
  function onitleBtnClick(key: string) {
    window.electron.ipcRenderer.send('titlebar', key)
  }

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff'
  }

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9'
  }

  const layoutStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh'
  }

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    // background: 'white',
    boxShadow: '1px 1px 2pt black'
  }
  return (
    <>
      <div className="titleBar" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="title">
          <span>好看韩剧3</span>
        </div>
        <div className="drop"></div>
        <div className="btns">
          {btns.map(function (item) {
            if (item == 'fa-expand') {
              return (
                <span key={item} onClick={() => onitleBtnClick(item)}>
                  <i className={`fa-solid ${expand ? 'fa-compress' : 'fa-expand'}`}></i>
                </span>
              )
            }
            return (
              <span key={item} onClick={() => onitleBtnClick(item)}>
                <i className={`fa-solid ${item}`}></i>
              </span>
            )
          })}
        </div>
      </div>
      <Layout style={layoutStyle}>
        <Sider width={'200px'} style={siderStyle}>
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
    </>
  )
}
