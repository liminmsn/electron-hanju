export abstract class NetBase {
  static HANJU = '_hanju'
  abstract start(): void
  async get(cmd: string, url: string) {
    const _cmd = String('get').concat(cmd)
    return await window.electron.ipcRenderer.invoke(_cmd, url)
  }
}
