import Versions from '@renderer/components/Versions'
import React from 'react'

export default function About() {
  const versionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  }
  return (
    <div style={versionStyle}>
      <Versions />
    </div>
  )
}
