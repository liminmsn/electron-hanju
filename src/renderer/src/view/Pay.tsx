import { useEffect, useState } from 'react'
import './css/pay.css'
interface PayResponse {
  code: number
  msg: string
  trade_no: string
  O_id: string
  payurl: string
  payurl2: string
  qrcode: string
  img: string
}
async function get_pay(call: (item: PayResponse) => void): Promise<void> {
  const data: PayResponse = await fetch(
    'https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/pay'
  ).then((res) => res.json())
  call(data)
}

interface PremiumList {
  affectedDocs: number
  data: Datum[]
}
interface Datum {
  _id: string
  title: string
  price: number
  dec: string
}
async function get_premium_list(): Promise<PremiumList> {
  const data: PremiumList = await fetch(
    'https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/get_preimium_list'
  ).then((res) => res.json())
  return data
}

export function Pay() {
  const [payResponse, setPayResponse] = useState<PayResponse | null>(null)
  const [premiumList, setPremiumList] = useState<PremiumList | null>(null)
  const [selectedPayItem, setSelectedPayItem] = useState<Datum | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    //获取付费列表
    get_premium_list().then((data) => {
      console.log('Premium list:', data)
      setPremiumList(data)
    })
    return () => {
      console.log('Pay component unmounted')
    }
  }, [])
  const payCall = (item: PayResponse) => {
    setLoading(false)
    setPayResponse(item)
  }
  const paySend = (item: Datum) => {
    setSelectedPayItem(item)
    setLoading(true)
    setPayResponse(null)
    get_pay(payCall)
  }
  return (
    <div className="pay-container">
      <h3>支付宝扫码订阅</h3>
      {premiumList === null ? (
        <span className="loading">加载中...</span>
      ) : premiumList.affectedDocs === 0 ? (
        <span className="loading">暂无付费内容</span>
      ) : null}
      <ul className="pay-list">
        {premiumList?.data.map((item) => (
          <li className="pay-item" key={item._id} onClick={() => paySend(item)}>
            <div>{item.dec}</div>
            <div>
              <span><sup>{item.title}</sup></span><span>{item.price}¥</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="pay-info-container">
        {payResponse ? (
          <div className="pay-info">
            <span>订单生成状态：{payResponse.msg}</span>
            <span>
              订阅类型：{selectedPayItem?.title}/{selectedPayItem?.price}¥
            </span>
            <span>订单号：{payResponse.trade_no}</span>
            {/* <span>ZPAY订单号：{payResponse.O_id}</span> */}
            <img src={payResponse.img} alt="支付二维码" />
          </div>
        ) : premiumList != null ? (
          <div>{loading ? '订单创建中...' : '待选择订阅类型'}</div>
        ) : null}
      </div>
    </div>
  )
}
export default Pay
