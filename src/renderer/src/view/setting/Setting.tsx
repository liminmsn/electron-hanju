import { Theme, ThemeColor } from '@renderer/theme/Theme'
import { Button, Segmented } from 'antd'
import React from 'react'

const labelStyle: React.CSSProperties = {
  fontFamily: 'ZiKuXingQiuFeiYangTi',
  textShadow: 'var(--border-show)'
}

export default function Setting() {
  function setCssProperty(key: string) {
    return new Theme(themeArr[key])
  }
  const themeArr = {
    薄荷绿: ThemeColor.Green,
    活力黄: ThemeColor.Yellow,
    蓝色: ThemeColor.Blue,
    紫色: ThemeColor.Purple,
    红色: ThemeColor.Red
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
    <div style={{ padding: '5vh', display: 'flex', flexDirection: 'column' }}>
      <div>
        <span style={labelStyle}>主题颜色</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <Segmented
          defaultValue={index_key}
          options={Object.keys(themeArr)}
          onChange={setCssProperty}
        />
      </div>
      <br />
      <div>
        <span style={labelStyle}>储存</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button>清空缓存</Button>
      </div>
    </div>
  )
}
