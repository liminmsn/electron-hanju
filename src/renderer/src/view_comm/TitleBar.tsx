import { IpcRendererEvent } from 'electron'
import { useEffect, useState } from 'react'
import './css/titlebar.css'
import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { HostList } from '@renderer/network/net'

export default function TitleBar() {
  //更改标题栏的全屏小化按钮
  const [expand, setExpand] = useState(false)
  const btns: string[] = ['fa-minus', 'fa-expand', 'fa-xmark']
  function onitleBtnClick(key: string) {
    window.electron.ipcRenderer.send('titlebar', key)
  }
  const [iptLabel, setIptLabel] = useState('...')
  const [hostList, setHostList] = useState<HostList[]>([])
  const [down, setdown] = useState(false)
  useEffect(() => {
    window.electron.ipcRenderer.on('fa-expand', (_e: IpcRendererEvent, bol) => setExpand(bol))
    GlobalEvents.on('titlebar_ipt_label', (label: string) => setIptLabel(label))
    GlobalEvents.on('titlebar_host_list', (host_list: HostList[]) => setHostList(host_list))
  }, [])

  function onKeyDown(ent: any) {
    const e = ent as KeyboardEvent
    setdown(false)
    e.stopPropagation()
  }

  return (
    <div className="titleBar" style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* App名称 */}
      <div className="title">
        <span>好看韩剧3</span>
      </div>
      {/* 搜索框 */}
      <div className="drop">
        <div className="not">
          <i className="fa-solid fa-magnifying-glass"></i>&nbsp;
          <input
            type="text"
            placeholder={String('搜索').concat(iptLabel)}
            onFocus={() => setdown(true)}
            onBlur={() => setdown(false)}
            onKeyDown={onKeyDown}
          />
        </div>
        {/* 下拉推荐列表 */}
        {down && hostList.length > 0 ? (
          <div className="host_list host_list_focus">
            {hostList.map((item, idx) => {
              return (
                <p key={idx}>
                  <span>{idx + 1}</span>
                  <span>{item.label}</span>
                </p>
              )
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* 小化全屏关闭 */}
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
  )
}
