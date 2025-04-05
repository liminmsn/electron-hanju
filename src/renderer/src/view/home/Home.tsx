import Versions from '@renderer/components/Versions'
import './main.css'

function Home(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const ipcGET = (): void => {
    window.electron.ipcRenderer.invoke('get', 'https://www.thanju.com/').then((val) => {
      console.log(val)
    })
  }

  return (
    <>
      <button onClick={ipcHandle}>ipc</button>
      <button onClick={ipcGET}>get</button>
      <Versions></Versions>
    </>
  )
}

export default Home
