type entFun = (args: any) => void
export class GlobalEvents {
  private static _ents: Map<string, entFun> = new Map()
  static on(key: string, fun: entFun) {
    this._ents.set(key, fun)
  }
  static off(key: string) {
    this._ents.delete(key)
  }
  static send(key: string, args: any) {
    const call = this._ents.get(key)
    if (call != null) call(args)
  }
}
