import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router'
import Sider from 'antd/es/layout/Sider'
import './css/sliderarr.css'

export default function SiderArr() {
  const siderStyle: React.CSSProperties = {
    background: 'var(--color-two)',
    boxShadow: 'var(--border-show)',
    borderTopRightRadius: '6pt'
  }
  const keyArr: KeyItem[] = [
    new KeyItem(<i className="fa-solid fa-circle-play"></i>, '韩剧', '/'),
    new KeyItem(<i className="fa-solid fa-film"></i>, '电影', '/dy'),
    new KeyItem(<i className="fa-solid fa-video"></i>, '综艺', '/zy'),
    new KeyItem(<i className="fa-solid fa-clock-rotate-left"></i>, '历史', '/histroy'),
    new KeyItem(<i className="fa-solid fa-gear"></i>, '设置', '/setting'),
    // new KeyItem(<i className="fa-solid fa-circle-info"></i>, '关于', '/about'),
    new KeyItem(<i className="fa-solid fa-circle-check"></i>, '订阅', '/pay'),
  ]
  const [selectIdx, setSelectIdx] = useState(keyArr[0].label)
  //打开路由
  function ondownItem(item: KeyItem) {
    setSelectIdx(item.label)
    GlobalEvents.send('titlebar_ipt_label', item.label)
  }
  useEffect(() => {
    GlobalEvents.send('titlebar_ipt_label', selectIdx)
  }, [])
  return (
    <div style={{ display: 'flex', background: 'var(--color-two)' }}>
      <Sider width={120} style={siderStyle}>
        {keyArr.map((item) => {
          return (
            <Link key={item.label} to={item.path}>
              <div
                onClick={() => ondownItem(item)}
                className={selectIdx == item.label ? 'sliderItem sliderItemSelect' : 'sliderItem'}
              >
                {selectIdx == item.label ? item.selectIcon : item.icon}&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{item.label}</span>
              </div>
            </Link>
          )
        })}
      </Sider>
    </div>
  )
}

class KeyItem {
  icon: ReactNode
  selectIcon: ReactNode
  label: string
  path: string
  constructor(icon: ReactNode, label: string, path: string, selectIcon?: ReactNode) {
    this.icon = icon
    this.label = label
    this.path = path
    this.selectIcon = icon
    if (selectIcon != null) this.selectIcon = selectIcon
  }
}
