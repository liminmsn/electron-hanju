import './css/card.css'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export default function Card({ children }: CardProps): JSX.Element {
  return (
    <div
      className="card"
      style={{
        backgroundSize: '100% 100%',
        backgroundImage: 'url(//pp.thanju.com/U/vod/6751aebea9d95.jpg)'
      }}
    >
      {children}
    </div>
  )
}
