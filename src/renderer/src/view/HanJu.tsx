import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import Loading from '@renderer/components/Loading'
import { NetHanJu, VidoeList } from '@renderer/network/net'
import SiftSeg from '@renderer/view_comm/SiftSeg'
import { SiftList } from '@renderer/network/net'
import { useEffect, useState } from 'react'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
///韩剧
export default function HanJu(): JSX.Element {
  const [list, setList] = useState<VidoeList[]>([])
  const [siftList, setIftList] = useState<SiftList[][]>([])
  useEffect(() => new NetHanJu().getData<VidoeList[]>(setList), [])
  GlobalEvents.on('view_sift_list', (val: any) => {
    setIftList(val)
  })
  GlobalEvents.on('up_video_list', (val: any) => {
    setList(val)
  })
  function onChange(val: string) {
    setList([])
    new NetHanJu().sift(val)
    return val
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
