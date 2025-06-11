import { ipcMain, IpcMainInvokeEvent } from 'electron'
import utility from 'utility'

export class Pay {
  ///关闭原生的标题栏
  constructor() {
    ipcMain.handle('pay', this.fun)
  }
  fun(_e: IpcMainInvokeEvent, args: string) {
    switch (args) {
      case 'getPayUrl':
        getPayUrl()
        break
    }
  }
}

const key = 'f8848mCKqEGc51N5Fp69FZNyNQbtFPqp' //密钥,易支付注册会提供pid和秘钥
const pid = '2025040423043232' //商户号,易支付注册会提供pid和秘钥
//返回支付地址
function getPayUrl(money: string = '0.01', name: string = '订阅') {
  const data = {
    out_trade_no: getFormattedTimestamp().concat('123'),
    pid: pid,
    money: money,
    name: name,
    type: 'alipay',
    notify_url: 'http://bdxqs.hhycrop.com/Baidu0312_1',
    return_url: 'https://www.bing.com/',
    sitename: '好看韩剧3'
  }
  const str = getVerifyParams(data)
  const sign = utility.md5(str + key)
  const result = `https://z-pay.cn/submit.php?${str}&sign=${sign}&sign_type=MD5`
  return result
}
//参数进行排序拼接字符串(非常重要)
function getVerifyParams(params: any) {
  let sPara: any[] = []
  if (!params) return null
  for (const key in params) {
    if (!params[key] || key == 'sign' || key == 'sign_type') {
      continue
    }
    sPara.push([key, params[key]])
  }
  sPara = sPara.sort()
  let prestr = ''
  for (let i2 = 0; i2 < sPara.length; i2++) {
    const obj = sPara[i2]
    if (i2 == sPara.length - 1) {
      prestr = prestr + obj[0] + '=' + obj[1] + ''
    } else {
      prestr = prestr + obj[0] + '=' + obj[1] + '&'
    }
  }
  return prestr
}
// 格式化时间戳为YYYYMMDDHHmmss格式
function getFormattedTimestamp() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份是0起始
  const day = String(now.getDate()).padStart(2, '0')

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}
