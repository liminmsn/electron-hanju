export class YDate {
  // 定义一个函数来格式化时间戳
  static formatTimestamp(timestamp: number) {
    const date = new Date(timestamp)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // 使用24小时制
    }
    const formattedDate = date.toLocaleString('cn-ZH', options)
    return formattedDate
  }
  /* 获取剩余时间 */
  static getValidTime() {
    const one = new Date().getTime()
    const two = Number(localStorage.getItem('pay_premium_time'))
    const three = two - one
    if (three > 0) {
      return three
    }
    return 0
  }
  /* 检查是否有效 */
  static isValid() {
    const one = new Date().getTime()
    const two = Number(localStorage.getItem('pay_premium_time'))
    if (one < two) {
      return true
    }
    return false
  }
}
