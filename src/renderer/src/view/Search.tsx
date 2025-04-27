import Loading from '@renderer/components/Loading'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetVideoSearch } from '@renderer/network/net'
import { Button } from 'antd'
import { useState } from 'react'

export interface VideoSearchItem {
  bg: string
  href: string
  title: string
  pic: string
  director: string
  starring: string
  type: string
}

const SearchStyle: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(4pt)',
  paddingTop: '30pt',
  paddingInline: '4vh',
  boxSizing: 'border-box',
  width: '100vw',
  height: '100vh',
  overflowY: 'scroll',
  zIndex: 3
}
const SearchItemStyle: React.CSSProperties = {
  marginBottom: '4pt'
}
const CloseBtnStyle: React.CSSProperties = {
  position: 'absolute',
  right: '6pt',
  top: '6pt',
  fontSize: '16pt',
  cursor: 'pointer'
}

function onClose() {
  GlobalEvents.send('titlebar_ipt_label_close', '')
  GlobalEvents.send('video_search_show', false)
}

function onPlay(item: VideoSearchItem) {
  //本地存一个
  localStorage.setItem('video_detil_args', JSON.stringify(item))
  GlobalEvents.send('video_detil_show', true)
}

export default function Search() {
  const [histList, setHisList] = useState<VideoSearchItem[]>([])
  const [notData, setNotdata] = useState(false)
  GlobalEvents.on('set_search_label', (label: string) => {
    new NetVideoSearch(label).start().then((res) => {
      if (res.length == 0) setNotdata(true)
      setHisList(res)
      console.log(res)
    })
  })

  return (
    <div className="search" style={SearchStyle}>
      <i style={CloseBtnStyle} onClick={() => onClose()} className="fa-solid fa-xmark"></i>
      {notData ? (
        <div style={{ textAlign: 'center' }}>
          <h1>没有找到相关的视频</h1>
        </div>
      ) : (
        <Loading loding={histList.length > 0}>
          {histList.map((item, idx) => {
            return (
              <div key={idx} style={SearchItemStyle} className="histroy_item">
                <img src={item.bg} alt="" />
                <div className="histroy_item_right">
                  <div className="histroy_item_right_one">
                    <h2>{item.title}</h2>
                    <span>类型：{item.pic}</span>
                    <span>演员：{item.starring}</span>
                  </div>
                  <div className="histroy_item_right_two">
                    <Button onClick={() => onPlay(item)}>
                      {/* <i className="fa-solid fa-circle-play"></i> */}
                      <i className="fa-solid fa-right-to-bracket"></i>
                      {/* <i className="fa-solid fa-share-from-square"></i> */}
                      {/* 继续播放 */}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
          <div style={{ minHeight: '1vh' }}></div>
        </Loading>
      )}
    </div>
  )
}
