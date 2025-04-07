import './css/card.css'
import React, { ReactNode } from 'react'

interface CardProps {
  url: string
  children?: ReactNode
}

export default function CardImg({ url, children }: CardProps): JSX.Element {
  const imgStyle: React.CSSProperties = {
    width: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s'
  }
  return (
    <div className="card_img">
      <img style={imgStyle} src={url} alt="" />
      <div className="title">我们的约定</div>
      <p className="disc">导演、小杨、李妹</p>
      {children}
    </div>
  )
}
