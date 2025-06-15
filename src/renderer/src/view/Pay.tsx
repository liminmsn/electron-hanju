import { useCallback, useEffect, useState } from 'react'
import './css/pay.css'
import Loading from '@renderer/components/Loading'
import { YDate } from '@renderer/core/YDate'
import { Alert } from '@renderer/components/Alert'
import { GlobalEvents } from '@renderer/core/GlobalEvents'

interface PayQueryLoding {
  code: number
  message: string
  data: PayQueryLodingData
}
interface PayQueryLodingData {
  code: string
  msg: string
  status: string
  name: string
  money: string
  out_trade_no: string
  trade_no: string
  type: string
  param: string
  addtime: string
  endtime: string
  pid: string
  buyer: string
}

export interface PayQuery {
  code: number
  message: string
  data: PayQueryData
}
interface PayQueryData {
  _id: string
  device_id: string
  premium_time: number
}
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
interface PremiumList {
  affectedDocs: number
  data: Datum[]
}
interface Datum {
  _id: string
  title: string
  price: number
  dec: string
  data: PayResponse | undefined
}
// 获取价格列表
async function get_premium_list(): Promise<PremiumList> {
  const data: PremiumList = await fetch(
    'https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/get_preimium_list'
  ).then((res) => res.json())
  return data
}
// 创建生成二维码请求（闭包）
function get_pay_closure(deviceId: string) {
  let ok = true
  return async function (item: Datum, call: (item: PayResponse) => void) {
    if (!ok) return
    ok = false
    const data: PayResponse = await fetch(
      'https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/pay',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          device_id: deviceId,
          title: item.title,
          price: item.price
        })
      }
    ).then((res) => res.json())
    call(data)
    item.data = data // 将支付二维码订单数据
    ok = true
  }
}
//查询单支付结果（闭包）
export function pay_query_closure(item: PayResponse | null) {
  let ok = true
  return async function (callback: (res: any) => void, query_type: '0' | '1' = '0') {
    if (query_type !== '1') {
      if (!ok || !item) return
    }
    ok = false
    //获取设备id
    const device_id = await window.electron.ipcRenderer.invoke('system', 'device_id')
    const data = await fetch(
      'https://fc-mp-00fbb6fa-0b8f-41d8-ac0c-122a477de70e.next.bspapp.com/pay_query',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          out_trade_no: item?.trade_no || '',
          device_id: device_id,
          query_type: query_type // 0:查询支付结果
        })
      }
    ).then((res) => res.json())
    callback(data)
    ok = true
  }
}
export function Pay() {
  const [deviceId, setDeviceId] = useState<string>('')
  const [payResponse, setPayResponse] = useState<PayResponse | null>(null)
  const [premiumList, setPremiumList] = useState<PremiumList | null>(null)
  const [selectedPayItem, setSelectedPayItem] = useState<Datum | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [timeMap, setTimeMap] = useState<string>('---')
  const get_pay = useCallback(get_pay_closure(deviceId), [deviceId])
  const pay_query = pay_query_closure(payResponse)
  useEffect(() => {
    window.electron.ipcRenderer.invoke('system', 'device_id').then((res) => setDeviceId(res))
    get_premium_list().then((data) => setPremiumList(data))
    get_pay_premium_state()
  }, [])
  // 获取支付二维码数据回调
  const get_pay_data_call = (item: PayResponse) => {
    setLoading(false)
    setPayResponse(item)
  }
  // 获取支付二维码数据
  const get_pay_data = (item: Datum) => {
    setLoading(true)
    setPayResponse(null)
    setSelectedPayItem(item)
    if (item.data) {
      get_pay_data_call(item.data)
    } else {
      get_pay(item, get_pay_data_call)
    }
  }
  // 查询订阅剩余时间
  const get_pay_premium_state = () => {
    pay_query((res: PayQuery) => {
      if (res.code == 200) {
        setTimeMap(YDate.formatTimestamp(res.data.premium_time))
        localStorage.setItem('pay_premium_time', JSON.stringify(res.data.premium_time))
      }
    }, '1')
  }
  const [showAlert, setShowAlert] = useState(false)
  const [PayQueryData, setPayQueryData] = useState<PayQueryLoding | null>(null)
  // 查询订阅
  const get_pay_query = () => {
    setPayQueryData(null)
    setShowAlert(true)
    pay_query((res: PayQueryLoding) => {
      setPayQueryData(res)
      if (res.code == 200) {
        setTimeout(() => {
          GlobalEvents.send('slider_arr_update', 0)
        }, 1000)
        get_pay_premium_state()
      }
    }, '0')
  }
  return (
    <div className="pay-container">
      <Alert
        show={showAlert}
        call={() => setShowAlert(false)}
        children={
          PayQueryData != null ? (
            <div>
              <h3>{PayQueryData.message}</h3>
              {PayQueryData.code == 200 ? (
                <ul className="pay_query_info">
                  <li>时间：{PayQueryData.data.endtime}</li>
                  <li>单号：{PayQueryData.data.out_trade_no}</li>
                  <li>名称：{PayQueryData.data.name}</li>
                  <li>价格：{PayQueryData.data.money}</li>
                </ul>
              ) : null}
            </div>
          ) : (
            <Loading label="查询激活状态中..." loading={false} children={undefined} />
          )
        }
      />
      <div className="pay_premium">
        <div>
          设备唯一标识：
          <span className="device_id">{deviceId}</span>
        </div>
        <div>
          订阅到期时间：
          <span>{timeMap}</span>
        </div>
      </div>
      {premiumList === null ? (
        <Loading loading={false} children={null} />
      ) : premiumList.affectedDocs === 0 ? (
        <span className="loading">暂无付费内容</span>
      ) : null}
      <ul className="pay-list">
        {premiumList?.data.map((item) => (
          <li
            className={`pay-item ${selectedPayItem === item ? 'pay_item_selected' : ''}`}
            data-day={item.title}
            key={item._id}
            onClick={() => selectedPayItem !== item && get_pay_data(item)}
          >
            <div>{item.dec}</div>
            <div>
              <span>{item.price}¥</span>
            </div>
            <span className="pay-item-title">好看韩剧3</span>
          </li>
        ))}
      </ul>
      <div className="pay-info-container">
        {payResponse ? (
          <div className="pay-info">
            <img src={payResponse.img} alt="支付二维码" />
            <span>创建状态：{payResponse.msg}</span>
            <span>订单号：{payResponse.trade_no}</span>
            <span>订阅类型：{selectedPayItem?.title}</span>
            <span>价格：{selectedPayItem?.price}¥</span>
            {/* <span>ZPAY订单号：{payResponse.O_id}</span> */}
            <button onClick={get_pay_query}>更新订阅</button>
          </div>
        ) : premiumList != null ? (
          loading ? (
            <Loading loading={false} children={null} />
          ) : (
            <div>选择订阅类型</div>
          )
        ) : null}
      </div>
      <p className="pay_ps">
        购买说明：
        <br />
        1.手机支付宝扫描码完成支付
        <br />
        2.先不要点击切换其它订阅!!!
        <br />
        &nbsp;&nbsp;&nbsp;.购买那个就要立即点击更新订阅
        <br />
        &nbsp;&nbsp;&nbsp;.频繁切换极大可能丢失订单号导致无法激活到设备id
        <br />
        3.点击更新订阅
        <br />
        订阅说明：
        <br />
        &nbsp;&nbsp;&nbsp;购买多个订阅时间会累加
        <br />
        &nbsp;&nbsp;&nbsp;购买完成后还想购买同一订阅,侧边栏切换为(设置)选项再点回(订阅)刷新订单
        <br />
      </p>
    </div>
  )
}
export default Pay
