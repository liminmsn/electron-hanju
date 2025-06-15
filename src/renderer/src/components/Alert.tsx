import { ReactNode, useRef } from 'react'
import './css/alert.css'
import Card from './Card'

interface PropType {
  show: boolean
  children: ReactNode
  call: () => void
}
export function Alert({ show, children, call }: PropType) {
  const alert = useRef<HTMLDivElement>(null)
  return show ? (
    <div className="alert" ref={alert}>
      <Card
        children={
          <div className="alert_context">
            {children}
            <button onClick={call}>知道了</button>
          </div>
        }
      />
    </div>
  ) : null
}
