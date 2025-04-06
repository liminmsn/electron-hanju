import Card from '@renderer/components/Card'
import './main.css'
import GridView from '@renderer/components/GridView'

export default function Home(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const ipcGET = (): void => {
    window.electron.ipcRenderer.invoke('get', 'https://www.thanju.com/').then((val) => {
      console.log(val)
    })
  }
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
