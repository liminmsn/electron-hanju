import { Dispatch, SetStateAction } from 'react'

export abstract class NetBase {
  static Video = '_video'
  async get(cmd: string, url: string) {
    const _cmd = String('get').concat(cmd)
    return await window.electron.ipcRenderer.invoke(_cmd, url)
  }
  //子类实现
  abstract start(): Promise<any>
  getData<T>(setState: Dispatch<SetStateAction<T>>) {
    this.start().then((val: T) => setState(() => val))
  }
}
