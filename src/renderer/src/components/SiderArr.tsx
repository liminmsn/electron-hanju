import { ReactNode, useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import './css/sliderarr.css'
import { Link } from 'react-router'

export default function SiderArr() {
  const siderStyle: React.CSSProperties = {
    background: 'var(--color-one)',
    boxShadow: 'var(--border-show)'
  }
  const keyArr: KeyItem[] = [
    new KeyItem(<i className="fa-solid fa-circle-play"></i>, '韩剧', '/'),
    new KeyItem(<i className="fa-solid fa-film"></i>, '电影', '/'),
    new KeyItem(<i className="fa-solid fa-video"></i>, '综艺', '/'),
    new KeyItem(<i className="fa-solid fa-circle-info"></i>, '关于', '/about')
  ]
  const [selectIdx, setSelectIdx] = useState(keyArr[0].label)

  //打开路由
  function ondownItem(item: KeyItem) {
    setSelectIdx(item.label)
  }
  return (
    <Sider width={140} style={siderStyle}>
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
