/**自定义路由 */
export type YElement = () => Element
export class YRouter {
  static I: YRouter
  router: Map<string, YElement> = new Map()
  routerAll: JSX.Element[] = []
  call: (widget: YElement) => void
  constructor(routers: YRouterItem[], call: (widget: YElement) => void) {
    this.call = call
    routers.forEach((item) => {
      this.router.set(item.key, item.view)
    })
    YRouter.I = this
  }
  /**打开页面 */
  go(key: string) {
    const view = this.router.get(key)
    if (view) {
      this.routerAll.push()
      // this.call(this.routerAll[this.routerAll.length - 1])
    }
  }
  break() {
    this.routerAll.pop()
    if (this.routerAll.length > 0) {
      // this.call(this.routerAll[this.routerAll.length - 1])
    } else {
      // this.call(<></>)
    }
  }
}

/**路由item */
export class YRouterItem {
  key: string
  view: YElement
  constructor(key: string, view: YElement) {
    this.key = key
    this.view = view
  }
}
