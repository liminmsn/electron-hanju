import { VidoeList } from '@renderer/network/net'
import React, { ReactNode } from 'react'
import './css/card.css'
import { YRouter, YRouterItem } from '@renderer/router'

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

  function onClick() {
    YRouter.I.go(YRouterItem.VIEODETIL, { args: item })
    YRouter.I.go(YRouterItem.VIEODETIL, { args: item })
    return item
  }

  return (
    <div className="card_img" onClick={onClick}>
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
