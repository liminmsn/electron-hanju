import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
import { NetHanJu } from '@renderer/net/net'
import { Button } from 'antd'
import { useEffect } from 'react'

export default function Home(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  function getData() {
    new NetHanJu().start().then((val) => {
      console.log(val)
    })
  }
  useEffect(() => {}, [])
  return (
    <GridView>
      <Button onClick={getData}>GO</Button>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
        return <CardImg key={item} url="//pp.thanju.com/U/vod/67dae9fa26ff5.jpg" />
      })}
    </GridView>
  )
}
