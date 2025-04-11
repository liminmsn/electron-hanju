import { Spin } from 'antd'
import { ReactNode } from 'react'

interface ParentComponentProps {
  loding: boolean
  children: ReactNode
}
export default function Loading({ loding, children }: ParentComponentProps) {
  const divStyle: React.CSSProperties = {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <>
      {loding ? (
        children
      ) : (
        <div style={divStyle}>
          <Spin size="large" />
        </div>
      )}
    </>
  )
}
