import { Theme, ThemeColor } from '@renderer/theme/Theme'
import { Segmented } from 'antd'

export default function Setting() {
  function setCssProperty(key: string) {
    return new Theme(themeArr[key])
  }
  const themeArr = {
    薄荷绿: ThemeColor.Green,
    活力黄: ThemeColor.Yellow,
    蓝色: ThemeColor.Blue
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
    <div style={{ padding: '5vh' }}>
      <span>主题颜色</span>&nbsp;&nbsp;
      <Segmented
        defaultValue={index_key}
        options={Object.keys(themeArr)}
        onChange={setCssProperty}
      />
    </div>
  )
}
