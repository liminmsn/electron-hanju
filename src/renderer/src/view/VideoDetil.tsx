import React, { useEffect, useState } from 'react'
import { Button, Segmented } from 'antd'
import './css/videodetil.css'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetVideoDetil, NetVideoDetilItem, Starring, VidoeList } from '@renderer/network/net'
import VideoPlay from './VideoPlay'

const videoStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'absolute'
}

function onClose() {
  GlobalEvents.send('video_detil_show', false)
}
function openPlay() {
  GlobalEvents.send('video_play_show', true)
}

export default function VideoDetil() {
  GlobalEvents.on('video_play_show', (bol) => setShowVideoPlay(bol))
  const [item, setItem] = useState<VidoeList>(new VidoeList())
  const { title, pic } = item

  //从本地读取传参
  function fetchData(): Promise<VidoeList> {
    return new Promise((res) => {
      const val = localStorage.getItem('video_detil_args')
      if (val != null) {
        const obj = JSON.parse(val)
        setItem(() => obj)
        res(obj)
      }
    })
  }

  const [netVideoDetilItem, setNetVideoDetilItem] = useState<NetVideoDetilItem>(
    NetVideoDetilItem.init()
  )
  const [selectYuan, setSelectYuan] = useState(netVideoDetilItem.movieClips[0].title)
  //视频播放
  const [showVideoPlay, setShowVideoPlay] = useState(false)

  function playVideo(item: Starring) {
    setSelectVideo(item)
    openPlay()
  }

  const [selectVideo, setSelectVideo] = useState<Starring>({ href: '', label: '' })
  useEffect(() => {
    fetchData().then((res) => {
      new NetVideoDetil(res.href).start().then((res_) => {
        setNetVideoDetilItem(res_)
        setSelectYuan(res_.movieClips[0].title)
        setSelectVideo(res_.movieClips[0].list[0])
      })
    })
  }, [])
  return (
    <div style={videoStyle} className="videoDetil">
      {showVideoPlay ? <VideoPlay item={selectVideo} title={item.title} /> : <></>}
      <div className="title">
        <Button onClick={onClose}>返回</Button>
      </div>
      <div className="center">
        <img src={item.bg.replace('url(', '').replace(')', '')} />
        <div className="right">
          <div>{title}</div>
          <div>评分:{pic.one}</div>
          <div>别名:{netVideoDetilItem.alias}</div>
          <div>年份:{netVideoDetilItem.year.label}</div>
          <div>导演:{netVideoDetilItem.director.label}</div>
          <div>主演:{netVideoDetilItem.starring.map((item) => item.label)}</div>
          <div>更新:{netVideoDetilItem.update}</div>
          <div>标签:{netVideoDetilItem.tag}</div>
          <div>简介:{netVideoDetilItem.disc}</div>
          <Button style={{ marginTop: '1vh' }} onClick={openPlay}>
            立即播放
          </Button>
        </div>
      </div>
      <div className="video_detil_tag">
        <Segmented<string>
          options={netVideoDetilItem.movieClips.map((item) => item.title)}
          onChange={(value) => setSelectYuan(value)}
          value={selectYuan}
        />
      </div>
      <div className="video_detal_list">
        {(function () {
          const itm = netVideoDetilItem.movieClips.filter((item_) => item_.title === selectYuan)[0]
          const idx = netVideoDetilItem.movieClips.indexOf(itm)
          if (idx > -1)
            return netVideoDetilItem.movieClips[idx].list.map((item) => {
              return (
                <div
                  onClick={() => playVideo(item)}
                  className={`video_detal_list_item ${selectVideo == item ? 'video_detal_list_item_active' : ''}`}
                  key={item.href}
                >
                  {item.label}
                </div>
              )
            })
          else return <></>
        })()}
      </div>
    </div>
  )
}
