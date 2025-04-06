import Card from '@renderer/components/Card'
import GridView from '@renderer/components/GridView'
import { NetHome } from '@renderer/net/net_home'
import { useEffect } from 'react'

export default function Home(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const ipcGET = (): void => {
    window.electron.ipcRenderer.invoke('get', 'https://www.thanju.com/').then((val) => {
      console.log(val)
    })
  }
  useEffect(() => {
    const netHome = new NetHome()
    netHome.getData()
  }, [])
  return (
    <>
      <GridView>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
        <Card>
          <button onClick={ipcHandle}>ipc</button>
          <button onClick={ipcGET}>get</button>
        </Card>
      </GridView>
    </>
  )
}
