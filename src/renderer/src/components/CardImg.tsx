import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { VidoeList } from '@renderer/network/net'
import React, { ReactNode } from 'react'
import './css/card.css'

interface CardProps {
  item: VidoeList
  children?: ReactNode
}

export default function CardImg({ item, children }: CardProps): JSX.Element {
  const imgStyle: React.CSSProperties = {
    borderRadius: '6pt',
    boxShadow: 'var(--border-show)',
    transition: 'transform 0.2s',
    backgroundSize: '100% 100%'
  }

  function onclick() {
    //删除继续播放参数
    localStorage.removeItem('continue_play')
    //本地存一个
    localStorage.setItem('video_detil_args', JSON.stringify(item))
    GlobalEvents.send('video_detil_show', true)
  }

  return (
    <div className="card_img" onClick={onclick}>
      <div className="card_img_card">
        <span className="card_img_one">{item.pic.one}</span>
        <span className="card_img_two">{item.pic.two}</span>
        <img style={imgStyle} src={item.bg.replace('url(', '').replace(')', '')} />
      </div>
      <div className="title">{item.title}</div>
      {item.actor.map((item_) => {
        return (
          <span key={item_.url} className="disc">
            {item_.name}
          </span>
        )
      })}
      {children}
    </div>
  )
}
