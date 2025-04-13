/**api地址 */
export class NetApi {
  private static baseUrl = 'https://www.thanju.com'
  static HANJU: string = '/list-select-id-1-type--area--year--star--state--order-addtime.html'
  static DIANYIN: string = '/list-select-id-2-type--area--year--star--state--order-addtime.html'
  static ZONGYI: string = '/list-select-id-3-type--area--year--star--state--order-addtime.html'
  //返回拼接好的url地址
  static getURi(url: string): string {
    return this.baseUrl.concat(url)
  }
}
