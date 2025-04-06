import './css/card.css'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export default function Card({ children }: CardProps): JSX.Element {
  return <div className="card">{children}</div>
}
