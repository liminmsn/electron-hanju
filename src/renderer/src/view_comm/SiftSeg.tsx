import { SiftList } from '@renderer/network/net'
import { Segmented } from 'antd'
import React from 'react'
interface propType {
  siftList: SiftList[]
  onChange: (value: string) => void
}

const styleDiv: React.CSSProperties = {
  paddingInline: '5pt',
  marginBlock: '2pt',
  display: 'flex'
}
export default function SiftSeg({ onChange, siftList }: propType) {
  return (
    <div style={styleDiv}>
      <span>{siftList[0].label}</span>&nbsp;&nbsp;
      <Segmented
        style={{ flex: '1' }}
        size="small"
        options={siftList.slice(1).map((item) => item.label)}
        onChange={(val) => onChange(siftList.filter((item) => item.label == val)[0].value)}
      />
    </div>
  )
}
