import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import Loading from '@renderer/components/Loading'
import { NetDianYin, VidoeList } from '@renderer/network/net'
import { useState, useEffect } from 'react'

///电影
export default function DianYin() {
  const [list, setList] = useState<VidoeList[]>([])
  useEffect(() => new NetDianYin().getData(setList), [])
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
