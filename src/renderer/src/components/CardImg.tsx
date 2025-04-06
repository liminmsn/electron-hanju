import './css/card.css'
import { ReactNode } from 'react'

interface CardProps {
  url: string
  children: ReactNode
}

export default function CardImg({ url, children }: CardProps): JSX.Element {
  return (
    <div
      className="card"
      style={{
        backgroundSize: '100% 100%',
        backgroundImage: `url(${url})`
      }}
    >
      {children}
    </div>
  )
}
