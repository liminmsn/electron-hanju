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
    gap: '12pt',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'ZiKuXingQiuFeiYangTi'
  }
  return (
    <>
      {loding ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
      ) : (
        <div style={divStyle}>
          <Spin size="large" />
          <span>加载中。。。</span>
        </div>
      )}
    </>
  )
}
