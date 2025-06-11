export function Pay() {
  return (
    <div
      className="pay"
      style={{
        widows: '100%',
        height: '100%',
        textAlign: 'center'
      }}
    >
      <iframe
        style={{
          width: '500px',
          height: '500px',
          border: 'none',
          scale: '0.5',
          backgroundColor: '#fff'
        }}
        src="https://z-pay.cn/submit.php?money=0.01&name=订阅&notify_url=http://bdxqs.hhycrop.com/Baidu0312_1&out_trade_no=2019050823435494926&pid=2025040423043232&return_url=https://www.bing.com/&sitename=易支付&type=alipay&sign=5cf44f0e5fbaafbc3c9c51961c84139f&sign_type=MD5"
      ></iframe>
    </div>
  )
}
export default Pay
