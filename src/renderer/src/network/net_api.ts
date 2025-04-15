/**api地址 */
export class NetApi {
  private static baseUrl = 'https://www.thanju.com'
  static HANJU: string = '/list-select-id-1-type--area--year--star--state--order-addtime.html'
  static DIANYIN: string = '/list-select-id-2-type--area--year--star--state--order-addtime.html'
  static ZONGYI: string = '/list-select-id-3-type--area--year--star--state--order-addtime.html'
  //返回拼接好的url地址
  static getURi(url: string): string {
    const url_ = this.baseUrl.concat(url)
    return url_
  }
  //筛选数据用到
  static body = {
    year: '',
    order: 'addtime',
    page: 0
  }
  static getBodyUrl(url: string) {
    const regex = /id-(\d+)-type/
    const match = url.match(regex)
    if (match) {
      const idNumber = match[1]
      return `${this.baseUrl}/list-select-id-${idNumber}-type--area--year-${this.body.year}-star--state--order-${this.body.order}-p-${this.body.page}.html`
    }
    throw Error('url地址错误')
  }
}
