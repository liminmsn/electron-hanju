import { Spin } from 'antd'
import { ReactNode, useRef } from 'react'

interface ParentComponentProps {
  label?: string
  loading: boolean
  children: ReactNode
}
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
export default function Loading({ label, loading, children }: ParentComponentProps) {
  const box = useRef<HTMLDivElement>(null)
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>{children}</div>
      ) : (
        <div style={divStyle} ref={box}>
          <Spin size="large" />
          <span>{label || '加载中...'}</span>
        </div>
      )}
    </>
  )
}
