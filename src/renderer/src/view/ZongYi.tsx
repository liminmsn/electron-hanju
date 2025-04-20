import { NetZongYi, PageList, SiftList, VidoeList } from '@renderer/network/net'
import { useState, useEffect } from 'react'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import Loading from '@renderer/components/Loading'
import PageArr from '@renderer/view_comm/PageArr'
import SiftSeg from '@renderer/view_comm/SiftSeg'

export default function ZongYi() {
  useEffect(() => new NetZongYi().getData<VidoeList[]>(setList), [])
  const onChange = (val: string) => {
    setList([])
    new NetZongYi().sift(val)
  }
  const [list, setList] = useState<VidoeList[]>([])
  const [siftList, setIftList] = useState<SiftList[][]>([])
  const [pageList, setPageList] = useState<PageList[]>([])
  GlobalEvents.on('view_sift_list', (val: any) => setIftList(val))
  GlobalEvents.on('up_video_list', (val: any) => setList(val))
  GlobalEvents.on('vide_page_list', (val: any) => setPageList(val))
  return (
    <>
      {siftList.slice(1).map((sift, idx) => {
        return <SiftSeg key={idx} siftList={sift} onChange={onChange} />
      })}
      <PageArr list={pageList} onChange={onChange} />
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
