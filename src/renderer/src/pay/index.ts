export class Pay {
  private pid: string
  private cide: string | null
  private type: 'alipay' | 'weixin'
  private outTrade_no: string
  private notifyUrl: string
  private name: string
  private money: string
  private clientip: string
  private device: string | null
  private param: string | null
  private sign: string
  private signType: string
}
