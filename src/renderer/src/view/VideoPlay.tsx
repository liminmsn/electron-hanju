import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { NetCheck } from '@renderer/network/base/net_check'
import { Starring } from '@renderer/network/net'
import { useEffect, useRef, useState } from 'react'
import Plyr from 'plyr'
import Hls from 'hls.js'
import './css/videoplay.css'
import 'plyr/dist/plyr.css'

export default function VideoPlay({ item, title }: { item: Starring; title: string }) {
  const [url, setUrl] = useState('')
  function fetchData() {
    //如果本地没有缓存数据，就去请求
    new NetCheck().init().getData<any>('_video_url', item.href, (data) => {
      if (data == null) {
        fetch(String('https://www.thanju.com/').concat(item.href))
          .then((res) => res.text())
          .then((body) => {
            const match = body.match(/var\s+cms_player\s*=\s*(\{.*?\});/s)
            if (match != null) {
              console.log(JSON.parse(match[1]))
              const obj = JSON.parse(match[1])
              new NetCheck().init().saveData('_video_url', item.href, obj['url']) //缓存数据
              setUrl(obj['url'])
            }
          })
      } else {
        //设置本地缓存url
        setUrl(data)
      }
    })
  }
  const videoRef = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    fetchData()

    const video = videoRef.current
    if (video) {
      setPlayer(
        new Plyr(video, {
          controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen']
        })
      )

      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(url)
        hls.attachMedia(video)
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url
      }
      player?.once('timeupdate', function (e) {
        console.log('Time update:', e)
      })
      player?.on('error', (error) => {
        console.error('Error:', error)
        player.destroy()
      })
      // player.currentTime
      return () => {
        player?.destroy()
      }
    }
    return () => null
  }, [url])
  const [player, setPlayer] = useState<Plyr>()
  function onClose() {
    GlobalEvents.send('save_history', {
      ...item,
      time: player?.currentTime
    })
    GlobalEvents.send('video_play_show', false)
  }
  return (
    <div className="video_play">
      <div className="video_play_title">
        <h3>
          {title}&nbsp;{item.label}
        </h3>
        <div onClick={onClose} className="video_play_close">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      {url != '' ? (
        <video ref={videoRef} className="rounded-xl shadow-lg w-full max-w-3xl mx-auto" controls />
      ) : (
        <></>
      )}
    </div>
  )
}
