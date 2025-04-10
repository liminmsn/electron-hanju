import { VideItem } from '@renderer/net/net'
import './css/card.css'
import React, { ReactNode } from 'react'

interface CardProps {
  item: VideItem
  children?: ReactNode
}

export default function CardImg({ item, children }: CardProps): JSX.Element {
  const imgStyle: React.CSSProperties = {
    borderRadius: '0pt',
    boxShadow: 'var(--border-show)',
    transition: 'transform 0.2s',
    backgroundSize: '100%',
    backgroundImage: item.bg
  }
  const labelStyle: React.CSSProperties = {
    textShadow: 'var(--border-show)'
  }

  return (
    <div className="card_img">
      <img style={imgStyle} alt="" />
      <div className="title" style={labelStyle}>
        {item.title}
      </div>
      <p className="disc" style={labelStyle}>
        导演、小杨、李妹
      </p>
      {children}
    </div>
  )
}
