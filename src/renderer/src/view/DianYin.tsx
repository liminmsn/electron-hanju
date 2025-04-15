import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import Loading from '@renderer/components/Loading'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetDianYin, SiftList, VidoeList } from '@renderer/network/net'
import SiftSeg from '@renderer/view_comm/SiftSeg'
import { useState, useEffect } from 'react'

///电影
export default function DianYin() {
  const [list, setList] = useState<VidoeList[]>([])
  const [siftList, setIftList] = useState<SiftList[][]>([])
  useEffect(() => new NetDianYin().getData(setList), [])
  GlobalEvents.on('view_sift_list', (val: any) => {
    setIftList(val)
  })
  GlobalEvents.on('up_video_list', (val: any) => {
    setList(val)
  })
  function onChange(val: string) {
    setList([])
    new NetDianYin().sift(val)
  }
  return (
    <>
      {siftList.slice(1).map((sift, idx) => {
        return <SiftSeg key={idx} siftList={sift} onChange={onChange} />
      })}
      <Loading loding={list.length > 0}>
        <GridView>
          {list.map((item) => {
            return <CardImg key={item.title} item={item} />
          })}
        </GridView>
      </Loading>
    </>
  )
}
