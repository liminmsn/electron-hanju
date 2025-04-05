import '@renderer/assets/app.css'
import { IpcRendererEvent } from 'electron'
import { useEffect, useState } from 'react'

export default function App() {
  //更改标题栏的全屏小化按钮
  const [expand, setExpand] = useState(false)
  useEffect(() => {
    //监听全名状态变化
    window.electron.ipcRenderer.on('fa-expand', (e_: IpcRendererEvent, bol) => {
      setExpand(bol)
    })
  })
  //顶部右上方的按钮
  const btns: string[] = ['fa-minus', 'fa-expand', 'fa-xmark']
  //按钮点击调用electron
  function onitleBtnClick(key: string) {
    window.electron.ipcRenderer.send('titlebar', key)
  }

  return (
    <>
      <div className="titleBar" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="title">
          <span>好看韩剧3</span>
        </div>
        <div className="drop"></div>
        <div className="btns">
          {btns.map(function (item) {
            if (item == 'fa-expand') {
              return (
                <span key={item} onClick={() => onitleBtnClick(item)}>
                  <i className={`fa-solid ${expand ? 'fa-compress' : 'fa-expand'}`}></i>
                </span>
              )
            }
            return (
              <span key={item} onClick={() => onitleBtnClick(item)}>
                <i className={`fa-solid ${item}`}></i>
              </span>
            )
          })}
        </div>
      </div>
    </>
  )
}
