import { SiftList } from '@renderer/network/net'
import { NetApi } from '@renderer/network/net_api'
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
  function fromUrl({ value, label }: { value: string; label: string }) {
    if (siftList[0].label == '排序') {
      const one = /order-(\w+)\.html/ //分类
      const order = value.match(one)
      if (order != null) NetApi.body.order = `${order[1]}`
      onChange(value)
      return
    }
    if (siftList[0].label == '年份') {
      const rxg = {
        全部: '',
        更早: '18001989',
        '2010-2000': '20002010',
        '90年代': '19901999'
      }
      if (rxg[label] != null) {
        NetApi.body.year = rxg[label]
        onChange(value)
        return
      }
      NetApi.body.year = label
      onChange(value)
    }
  }
  return (
    <div style={styleDiv}>
      <span>{siftList[0].label}</span>&nbsp;&nbsp;
      <Segmented
        style={{ flex: '1' }}
        size="small"
        options={siftList.slice(1).map((item) => item.label)}
        onChange={(val) => fromUrl(siftList.filter((item) => item.label == val)[0])}
      />
    </div>
  )
}
