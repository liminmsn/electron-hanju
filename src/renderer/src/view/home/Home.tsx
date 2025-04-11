import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import Loading from '@renderer/components/Loading'
import { NetHanJu, VideItem } from '@renderer/net/net'
import { useEffect, useState } from 'react'

export default function Home(): JSX.Element {
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
