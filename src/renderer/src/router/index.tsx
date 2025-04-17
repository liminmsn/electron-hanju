import React from 'react'

export type YElement = (obj?: YRouterProp) => JSX.Element
export type YRouterCall = (widget: () => JSX.Element) => void

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
  routerView: JSX.Element[] = []
  call: YRouterCall
  constructor(routers: YRouterItem[], call: YRouterCall) {
    routers.forEach((item) => this.router.set(item.key, item.view))
    this.call = call
    YRouter.I = this
  }
  rerurnView() {
    this.call(() => (
      <>
        {this.routerView.map((item, idx) => {
          const divStyle: React.CSSProperties = {
            position: 'absolute',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            zIndex: idx + 1
          }
          return (
            <div key={idx} style={divStyle}>
              {item}
            </div>
          )
        })}
      </>
    ))
  }
  /**打开页面 */
  go(key: string, obj?: YRouterProp) {
    const view = this.router.get(key)
    if (view) {
      this.routerView.push(view(obj))
    }
    this.rerurnView()
  }
  break() {
    this.routerView.pop()
    this.rerurnView()
  }
}
