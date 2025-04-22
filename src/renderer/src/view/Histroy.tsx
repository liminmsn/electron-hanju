import { VideoHistroy, VideoHistroyItem } from '@renderer/core/VideoHistroy'
import { useEffect, useState } from 'react'
import './css/histroy.css'
import { Button } from 'antd'

export default function Histroy() {
  const [histList, setHisList] = useState<VideoHistroyItem[]>([])
  useEffect(() => {
    setHisList(new VideoHistroy().init().histroy)
  }, [])
  function onDel(item: VideoHistroyItem) {
    new VideoHistroy().init().del(item)
    setHisList(new VideoHistroy().init().histroy)
  }
  return (
    <div className="histroy">
      {histList.length > 0 ? (
        histList.map((item, idx) => {
          return (
            <div key={idx} className="histroy_item">
              <img src={item.one.bg} alt="" />
              <div className="histroy_item_right">
                <div className="histroy_item_right_one">
                  <h2>{item.one.title}</h2>
                  <span>类型：{item.one.tag}</span>
                  <span>演员：{item.one.starring.map((item) => item.label).join('、')}</span>
                  <span>播放集数：{item.two.label}</span>
                  <span>播放进度：{item.two['time']}</span>
                </div>
                <div className="histroy_item_right_two">
                  <Button onClick={() => onDel(item)}>删除历史</Button>
                  <Button>继续播放</Button>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="histroy_not_data">
          <i className="fa-solid fa-clock-rotate-left"></i>
          <span>暂无观看记录</span>
        </div>
      )}
    </div>
  )
}
