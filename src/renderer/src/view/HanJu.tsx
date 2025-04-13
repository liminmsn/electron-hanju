import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import Loading from '@renderer/components/Loading'
import { NetHanJu, VidoeList } from '@renderer/network/net'
import { useEffect, useState } from 'react'
///韩剧
export default function HanJu(): JSX.Element {
  const [list, setList] = useState<VidoeList[]>([])
  useEffect(() => new NetHanJu().getData<VidoeList[]>(setList), [])
  return (
    <Loading loding={list.length > 0}>
      <GridView>
        {list.map((item) => {
          return <CardImg key={item.title} item={item} />
        })}
      </GridView>
    </Loading>
  )
}
