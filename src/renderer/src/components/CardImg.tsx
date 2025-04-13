import { VideItem } from '@renderer/net/net'
import React, { ReactNode } from 'react'
import './css/card.css'

interface CardProps {
  item: VideItem
  children?: ReactNode
}

export default function CardImg({ item, children }: CardProps): JSX.Element {
  const imgStyle: React.CSSProperties = {
    borderRadius: '6pt',
    boxShadow: 'var(--border-show)',
    transition: 'transform 0.2s',
    backgroundSize: '100% 100%'
  }

  return (
    <div className="card_img">
      <div className="card_img_card">
        <span className="card_img_one">{item.pic.one}</span>
        <span className="card_img_two">{item.pic.two}</span>
        <img style={imgStyle} src={item.bg.replace('url(', '').replace(')', '')} alt="" />
      </div>
      <div className="title">{item.title}</div>
      <p className="disc">导演、小杨、李妹</p>
      {children}
    </div>
  )
}
