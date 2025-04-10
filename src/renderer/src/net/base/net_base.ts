type PromisteRes = (val: object) => void
export abstract class NetBase {
  static HANJU = '_hanju'
  abstract start(): void
  get(cmd: string, url: string) {
    const _cmd = String('get').concat(cmd)
    return new Promise((res: PromisteRes) => {
      window.electron.ipcRenderer.invoke(_cmd, url).then((val: object) => {
        res(val)
      })
    })
  }
}
