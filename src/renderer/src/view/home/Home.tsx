import CardImg from '@renderer/components/CardImg'
import GridView from '@renderer/components/GridView'
// import { NetHome } from '@renderer/net/net_home'
import { useEffect } from 'react'

export default function Home(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // const ipcGET = (): void => {
  //   window.electron.ipcRenderer.invoke('get', 'https://www.thanju.com/').then((val) => {
  //     console.log(val)
  //   })
  // }
  useEffect(() => {
    // const netHome = new NetHome()
    // netHome.getData()
  }, [])
  return (
    <GridView>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
        return <CardImg key={item} url="//pp.thanju.com/U/vod/67dae9fa26ff5.jpg" />
      })}
    </GridView>
  )
}
