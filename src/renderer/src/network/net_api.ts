/**api地址 */
export class NetApi {
  static body = {
    year: '',
    order: ','
  }
  private static baseUrl = 'https://www.thanju.com'
  static HANJU: string = '/list-select-id-1-type--area--year--star--state--order-addtime.html'
  static DIANYIN: string = '/list-select-id-2-type--area--year--star--state--order-addtime.html'
  static ZONGYI: string = '/list-select-id-3-type--area--year--star--state--order-addtime.html'
  //返回拼接好的url地址
  static getURi(url: string): string {
    const url_ = this.baseUrl.concat(url)
    return url_
  }
  static getBodyUrl(url: string) {
    const one = /order-(\w+)\.html/ //分类
    const two = /year-(\d{4})/ //年份
    const order = url.match(one)
    const year = url.match(two)
    const bol = url.indexOf(this.body.order)
    if (order != null && bol < 0) NetApi.body.order = `order-${order[1]}.html`
    if (year != null) NetApi.body.year = `year-${year[1]}`
    console.log(NetApi.body)
    return this.baseUrl.concat(url)
  }
}
