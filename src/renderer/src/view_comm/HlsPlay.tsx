import { useEffect, useRef } from 'react'
import Plyr from 'plyr'
import Hls from 'hls.js'
import 'plyr/dist/plyr.css'

interface Props {
  src: string
  poster?: string
}

export default function HlsPlyr({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const player = new Plyr(video, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen']
      })

      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(video)
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
      }
      player.once('timeupdate', function (e) {
        console.log('Time update:', e)
      })
      player.on('error', (error) => {
        console.error('Error:', error)
        player.destroy()
      })
      return () => {
        player?.destroy()
      }
    }
    return () => null
  }, [src])

  return (
    <video
      ref={videoRef}
      className="rounded-xl shadow-lg w-full max-w-3xl mx-auto"
      poster={poster}
      controls
    />
  )
}
