import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import Loading from '@renderer/components/Loading'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetZongYi, SiftList, VidoeList } from '@renderer/network/net'
import SiftSeg from '@renderer/view_comm/SiftSeg'
import { useState, useEffect } from 'react'

export default function ZongYi() {
  const [list, setList] = useState<VidoeList[]>([])
  const [siftList, setIftList] = useState<SiftList[][]>([])
  useEffect(() => new NetZongYi().getData<VidoeList[]>(setList), [])
  GlobalEvents.on('view_sift_list', (val: any) => {
    setIftList(val)
  })
  GlobalEvents.on('up_video_list', (val: any) => {
    setList(val)
  })
  function onChange(val: string) {
    return val
  }
  return (
    <Loading loding={list.length > 0}>
      {siftList.slice(1).map((sift, idx) => {
        return <SiftSeg key={idx} siftList={sift} onChange={onChange} />
      })}
      <GridView>
        {list.map((item) => {
          return <CardImg key={item.title} item={item} />
        })}
      </GridView>
    </Loading>
  )
}
