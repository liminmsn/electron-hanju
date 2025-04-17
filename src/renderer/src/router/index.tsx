export type YElement = (obj?: YRouterProp) => JSX.Element
export type YRouterCall = (widget: YElement, obj?: YRouterProp) => void

/**路由参数 */
export class YRouterProp {
  args: any
}

/**路由item */
export class YRouterItem {
  static VIEODETIL = 'video_detil'
  key: string
  view: YElement
  constructor(key: string, view: YElement) {
    this.key = key
    this.view = view
  }
}

/**自定义路由 */
export class YRouter {
  static I: YRouter
  router: Map<string, YElement> = new Map()
  routerAll: YElement[] = []
  call: YRouterCall
  constructor(routers: YRouterItem[], call: YRouterCall) {
    routers.forEach((item) => this.router.set(item.key, item.view))
    this.call = call
    YRouter.I = this
  }
  rerurnView(obj?: YRouterProp) {
    const view = this.routerAll[this.routerAll.length - 1]
    if (view != null) this.call(view, obj)
    else this.call(() => <></>, obj)
  }
  /**打开页面 */
  go(key: string, args?: YRouterProp) {
    const view = this.router.get(key)
    if (view) {
      this.routerAll.push(view)
    }
    this.rerurnView(args)
  }
  break() {
    this.routerAll.pop()
    this.rerurnView()
  }
}
