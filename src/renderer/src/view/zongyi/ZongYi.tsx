import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import Loading from '@renderer/components/Loading'
import { VideItem, NetHanJu } from '@renderer/net/net'
import { useState, useEffect } from 'react'

export default function ZongYi() {
  const [list, setList] = useState<VideItem[]>([])
  useEffect(() => NetHanJu.getData(setList), [])
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
