import { Spin } from 'antd'
import { ReactNode } from 'react'

interface ParentComponentProps {
  label?: string
  loading: boolean
  children: ReactNode
}
export default function Loading({ label, loading, children }: ParentComponentProps) {
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
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>{children}</div>
      ) : (
        <div style={divStyle}>
          <Spin size="large" />
          <span>{label || '加载中...'}</span>
        </div>
      )}
    </>
  )
}
