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
    boxShadow: 'var(--border-show)',
    transition: 'transform 0.2s'
  }
  const labelStyle: React.CSSProperties = {
    textShadow: 'var(--border-show)'
  }

  return (
    <div className="card_img">
      <img style={imgStyle} src={url} alt="" />
      <div className="title" style={labelStyle}>
        我们的约定
      </div>
      <p className="disc" style={labelStyle}>
        导演、小杨、李妹
      </p>
      {children}
    </div>
  )
}
