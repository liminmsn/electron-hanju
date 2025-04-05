import { ReactNode, useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import './css/sliderarr.css'

export default function SiderArr() {
  const siderStyle: React.CSSProperties = {
    background: 'white',
    boxShadow: 'var(--border-show)'
  }
  const keyArr: KeyItem[] = [
    new KeyItem(
      <i className="fa-solid fa-house"></i>,
      '首页',
      <i className="fa-solid fa-house" style={{ color: 'var(--color-two)' }}></i>
    ),
    new KeyItem(<i className="fa-solid fa-circle-info"></i>, '关于')
  ]
  const [selectIdx, setSelectIdx] = useState(keyArr[0].label)
  return (
    <Sider width={140} style={siderStyle}>
      {keyArr.map((item) => {
        return (
          <div
            key={item.label}
            onClick={() => setSelectIdx(item.label)}
            className={selectIdx == item.label ? 'sliderItem sliderItemSelect' : 'sliderItem'}
          >
            {selectIdx == item.label ? item.selectIcon : item.icon}&nbsp;
            <span>{item.label}</span>
          </div>
        )
      })}
    </Sider>
  )
}

class KeyItem {
  icon: ReactNode
  selectIcon: ReactNode
  label: string
  constructor(icon: ReactNode, label: string, selectIcon?: ReactNode) {
    this.icon = icon
    this.selectIcon = selectIcon
    this.label = label
  }
}
