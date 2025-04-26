import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetVideoSearch } from '@renderer/network/net'
import { Button } from 'antd'

const SearchStyle: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,0.2)',
  backdropFilter: 'blur(2pt)',
  padding: '3vh',
  width: '100vw',
  height: '100vh',
  zIndex: 3
}
export default function Search() {
  GlobalEvents.on('set_search_label', (label: string) => {
    new NetVideoSearch(label).start().then((res) => {
      console.log(res)
    })
  })

  return (
    <div className="search" style={SearchStyle}>
      <Button onClick={() => GlobalEvents.send('video_search_show', false)}>关闭</Button>
      <div className="search_content">{0}</div>
    </div>
  )
}
