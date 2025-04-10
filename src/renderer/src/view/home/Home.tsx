import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import { NetHanJu, VideItem } from '@renderer/net/net'
import { Button } from 'antd'
import { useEffect, useState } from 'react'

export default function Home(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [list, setList] = useState<VideItem[]>([])
  function getData() {
    new NetHanJu().start().then((val) => setList(() => val))
  }
  useEffect(() => {}, [])
  return (
    <GridView>
      {list.map((item) => {
        return <CardImg key={item.title} item={item} />
      })}
      <Button onClick={getData}>GO</Button>
    </GridView>
  )
}
