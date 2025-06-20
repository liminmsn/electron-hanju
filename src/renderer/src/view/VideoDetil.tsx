import { NetVideoDetil, NetVideoDetilItem, Starring, VidoeList } from '@renderer/network/net'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
import Loading from '@renderer/components/Loading'
import React, { useEffect, useState } from 'react'
import { Button, Segmented } from 'antd'
import VideoPlay from './VideoPlay'
import './css/videodetil.css'
import { VideoHistroy, VideoHistroyItem } from '@renderer/core/VideoHistroy'
import { VideoBooks } from '@renderer/core/VideoBooks'
import { Alert } from '@renderer/components/Alert'
import { YDate } from '@renderer/core/YDate'

const videoStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'absolute'
}

function onClose() {
  localStorage.removeItem('video_detil_args')
  GlobalEvents.send('video_detil_show', false)
  GlobalEvents.send('update_histroy', false)
}
function openPlay() {
  GlobalEvents.send('video_play_show', true)
}

export default function VideoDetil() {
  GlobalEvents.on('video_play_show', (bol) => setShowVideoPlay(bol))
  GlobalEvents.on('save_history', (video: any) => {
    new VideoHistroy().init().add(new VideoHistroyItem(netVideoDetilItem, video, item))
  })
  const [item, setItem] = useState<VidoeList>(new VidoeList())

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
  //视频详情
  const [netVideoDetilItem, setNetVideoDetilItem] = useState<NetVideoDetilItem>(
    NetVideoDetilItem.init()
  )
  //视频源
  const [selectYuan, setSelectYuan] = useState(netVideoDetilItem.movieClips[0].title)
  //视频播放
  const [showVideoPlay, setShowVideoPlay] = useState(false)
  //选中视频
  const [selectVideo, setSelectVideo] = useState<Starring>({ href: '', label: '' })
  const [isLoding, setIsLoding] = useState(false)
  const [isBook, setIsbook] = useState(new VideoBooks().init().isBook(item))
  useEffect(() => {
    fetchData().then((res) => {
      new NetVideoDetil(res.href).start().then((res_) => {
        const continue_play = localStorage.getItem('continue_play')
        if (continue_play) {
          const obj = JSON.parse(continue_play)
          setSelectYuan(res_.movieClips[0].title)
          setNetVideoDetilItem(obj.one)
          setSelectVideo(obj.two)
          setIsLoding(true)
          open_play()
          return
        }
        setNetVideoDetilItem(res_)
        setSelectYuan(res_.movieClips[0].title)
        setSelectVideo(res_.movieClips[0].list[0])
        setIsLoding(true)
      })
    })
  }, [])
  //视频播放
  function playVideo(item: Starring) {
    setSelectVideo(item)
    open_play()
  }
  //检查是否有效再打开播放
  function open_play() {
    if (YDate.isValid()) {
      openPlay()
    } else {
      setShowAlert(true)
    }
  }
  //收藏
  function onBooks() {
    setIsbook(new VideoBooks().init().book(item))
  }
  //关闭弹窗
  const [showAlert, setShowAlert] = useState(false)
  function onCloseAlert() {
    setShowAlert(false)
  }
  return (
    <div style={videoStyle} className="videoDetil">
      <Alert
        show={showAlert}
        children={
          <div className="box">
            <h4>订阅时间无效</h4>
            <h5>没有订阅，首页左边侧栏订阅里面订阅权益时长</h5>
            <h5>如果是清除了缓存重启程序即可</h5>
          </div>
        }
        call={onCloseAlert}
      />
      {showVideoPlay ? <VideoPlay item={selectVideo} title={item.title} /> : <></>}
      <Loading loading={isLoding}>
        <div className="title">
          <Button onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </div>
        <div className="center">
          <img src={`https:${netVideoDetilItem.bg}`} />
          <div className="right">
            <div>{netVideoDetilItem.title}</div>
            <div>评分:{netVideoDetilItem.pic}</div>
            <div>别名:{netVideoDetilItem.alias}</div>
            <div>年份:{netVideoDetilItem.year.label}</div>
            <div>导演:{netVideoDetilItem.director.label}</div>
            <div>主演:{netVideoDetilItem.starring.map((item) => item.label)}</div>
            <div>更新:{netVideoDetilItem.update}</div>
            <div>标签:{netVideoDetilItem.tag}</div>
            <div>简介:{netVideoDetilItem.disc}</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button style={{ marginTop: '1vh' }} onClick={open_play}>
                <i className="fa-solid fa-circle-play"></i>
                立即播放
              </Button>
              <Button style={{ marginTop: '1vh' }} onClick={onBooks}>
                {isBook ? (
                  <i className="fa-solid fa-bookmark"></i>
                ) : (
                  <i className="fa-regular fa-bookmark"></i>
                )}
                收藏
              </Button>
            </div>
          </div>
        </div>
        <div className="video_detil_tag">
          <Segmented<string>
            options={netVideoDetilItem.movieClips.map((item) => item.title)}
            onChange={(value) => setSelectYuan(value)}
            value={selectYuan}
          />
          <div className="ps">视频内的水印广告与本程序无关，慎重考虑是否相信！</div>
        </div>
        <div className="video_detal_list">
          {(function () {
            const itm = netVideoDetilItem.movieClips.filter(
              (item_) => item_.title === selectYuan
            )[0]
            const idx = netVideoDetilItem.movieClips.indexOf(itm)
            if (idx > -1)
              return netVideoDetilItem.movieClips[idx].list.map((item) => {
                return (
                  <div
                    onClick={() => playVideo(item)}
                    className={`video_detal_list_item ${selectVideo.label == item.label ? 'video_detal_list_item_active' : ''}`}
                    key={item.href}
                  >
                    {item.label}
                  </div>
                )
              })
            else return <></>
          })()}
        </div>
      </Loading>
    </div>
  )
}
