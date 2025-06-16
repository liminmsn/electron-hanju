import { Theme, ThemeColor } from '@renderer/theme/Theme'
import { Button, Segmented } from 'antd'
import React from 'react'

const labelStyle: React.CSSProperties = {
  fontFamily: 'ZiKuXingQiuFeiYangTi',
  textShadow: 'var(--border-show)',
  display: 'inline-block',
  // backgroundColor:'red',
  textAlign: 'left',
  paddingLeft: '10px',
  width: '100px'
}
const boxStyle: React.CSSProperties = {
  marginBottom: '10px'
}

export default function Setting() {
  function resetTheme() {
    setCssProperty('香蕉黄')
  }
  function setCssProperty(key: string) {
    return new Theme(themeArr[key])
  }
  const themeArr = {
    薄荷绿: ThemeColor.Green,
    香蕉黄: ThemeColor.Yellow,
    天空蓝: ThemeColor.Blue,
    魅惑紫: ThemeColor.Purple,
    中国红: ThemeColor.Red
  }
  //初始化idx值
  const index_key = (function () {
    const val_loc = localStorage.getItem(Theme.name)
    if (val_loc) {
      for (const key_ in themeArr) {
        if (JSON.stringify(themeArr[key_]) == val_loc) {
          return key_
        }
      }
    }
    return Object.keys(themeArr)[0]
  })()
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <span style={labelStyle}>主题颜色</span>
        <Segmented
          defaultValue={index_key}
          options={Object.keys(themeArr)}
          onChange={setCssProperty}
        />
      </div>
      <div style={{ height: '8pt' }}></div>
      <div style={boxStyle}>
        <span style={labelStyle}>主题缓存</span>
        <Button onClick={() => { localStorage.removeItem('Theme'), resetTheme() }}>重置</Button>
      </div>
      <div style={boxStyle}>
        <span style={labelStyle}>播放历史缓存</span>
        <Button onClick={() => localStorage.removeItem('VideoHistroy')}>清空</Button></div>
      <div style={boxStyle}>
        <span style={labelStyle}>网路请求缓存</span>
        <Button onClick={() => localStorage.removeItem('NetCheck')}>清空</Button>
      </div>
    </div>
  )
}
