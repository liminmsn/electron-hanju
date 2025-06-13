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
async function get_pay(
  deviceId: string,
  price: string,
  call: (item: PayResponse) => void
): Promise<void> {
  const data: PayResponse = await fetch(
    'https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/pay',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_id: deviceId,
        price: price
      })
    }
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
  const [deviceId, setDeviceId] = useState<string>('')
  const [payResponse, setPayResponse] = useState<PayResponse | null>(null)
  const [premiumList, setPremiumList] = useState<PremiumList | null>(null)
  const [selectedPayItem, setSelectedPayItem] = useState<Datum | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    //获取设备id
    window.electron.ipcRenderer.invoke('system', 'device_id').then((res) => {
      setDeviceId(res)
    })
    //获取付费列表
    get_premium_list().then((data) => {
      console.log('Premium list:', data)
      setPremiumList(data)
    })
  }, [])
  const payCall = (item: PayResponse) => {
    setLoading(false)
    setPayResponse(item)
  }
  const paySend = (item: Datum) => {
    setSelectedPayItem(item)
    setLoading(true)
    setPayResponse(null)
    get_pay(deviceId, item.price.toString(), payCall)
  }
  return (
    <div className="pay-container">
      <div className="pay_premium">
        <div>
          <div>设备ID:</div>
          <span className="device_id">{deviceId}</span>
        </div>
        <div>
          <span>订阅时长:1天</span>
        </div>
      </div>
      {premiumList === null ? (
        <span className="loading">加载中...</span>
      ) : premiumList.affectedDocs === 0 ? (
        <span className="loading">暂无付费内容</span>
      ) : null}
      <ul className="pay-list">
        {premiumList?.data.map((item) => (
          <li
            className={`pay-item ${selectedPayItem === item ? 'pay_item_selected' : ''}`}
            key={item._id}
            onClick={() => selectedPayItem !== item && paySend(item)}
          >
            <div>{item.dec}</div>
            <div>
              <span>
                <sup>{item.title}</sup>
              </span>
              <span>{item.price}¥</span>
            </div>
            <span className="pay-item-title">好看韩剧3</span>
          </li>
        ))}
      </ul>
      <div className="pay-info-container">
        {payResponse ? (
          <div className="pay-info">
            <span>创建状态：{payResponse.msg}</span>
            <span>
              订阅类型：{selectedPayItem?.title}/{selectedPayItem?.price}¥
            </span>
            <span>订单号：{payResponse.trade_no}</span>
            <span>价格：{selectedPayItem?.price}¥</span>
            {/* <span>ZPAY订单号：{payResponse.O_id}</span> */}
            <img src={payResponse.img} alt="支付二维码" />
            <button>查询支付结果</button>
          </div>
        ) : premiumList != null ? (
          <div>{loading ? '订单创建中...' : '选择订阅类型'}</div>
        ) : null}
      </div>
      <p className="pay_ps">
        支付说明：
        <br />
        1.支付宝扫描二维码完成支付
        <br />
        2.完成支付后需要
        <br />
        3.点击查询结果更新订阅
      </p>
    </div>
  )
}
export default Pay
