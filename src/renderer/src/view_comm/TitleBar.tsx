import { GlobalEvents } from '@renderer/core/GlobalEvents'
import { HostList } from '@renderer/network/net'
import { IpcRendererEvent } from 'electron'
import { useEffect, useState } from 'react'
import './css/titlebar.css'

const btns: string[] = ['fa-minus', 'fa-expand', 'fa-xmark']
function onitleBtnClick(key: string) {
  window.electron.ipcRenderer.send('titlebar', key)
}
function onKeyDown(ent: any) {
  const e = ent as KeyboardEvent
  e.stopPropagation()
  if (e.code == 'Enter') {
    localStorage.removeItem('continue_play') //清除上次的详情页
    GlobalEvents.send('video_search_show', true)
    setTimeout(() => {
      if (e.target instanceof HTMLInputElement) {
        GlobalEvents.send('set_search_label', e.target.value)
      }
    })
  }
  // setdown(false)
}

function onclick(item: any) {
  localStorage.removeItem('continue_play') //清除上次的详情页
  //本地存一个
  localStorage.setItem('video_detil_args', JSON.stringify(item))
  GlobalEvents.send('video_detil_show', true)
}

export default function TitleBar() {
  //更改标题栏的全屏小化按钮
  const [expand, setExpand] = useState(false)
  const [iptLabel] = useState('想追的剧')
  const [hostList, setHostList] = useState<HostList[]>([])
  const [down, setdown] = useState(false)
  useEffect(() => {
    window.electron.ipcRenderer.on('fa-expand', (_e: IpcRendererEvent, bol) => setExpand(bol))
    GlobalEvents.on('titlebar_host_list', (host_list: HostList[]) => setHostList(host_list))
    // GlobalEvents.on('titlebar_ipt_label', (label: string) => setIptLabel(label))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    GlobalEvents.on('titlebar_ipt_label_close', () => (document.getElementById('ipt').value = ''))
  }, [])
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
            id="ipt"
            type="text"
            placeholder={iptLabel}
            onFocus={() => {
              setTimeout(() => {
                setdown(true)
              }, 250)
            }}
            onBlur={() => {
              setTimeout(() => {
                setdown(false)
              }, 250)
            }}
            onKeyDown={onKeyDown}
          />
        </div>
        {/* 下拉推荐列表 */}
        {down && hostList.length > 0 ? (
          <div className="host_list host_list_focus">
            {hostList.map((item, idx) => {
              return (
                <p key={idx} onClick={() => onclick(item)}>
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
