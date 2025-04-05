import '@renderer/assets/app.css'

export default function App() {
  const btns: string[] = ['fa-minus', 'fa-expand', 'fa-xmark']
  function onitleBtnClick(key: string) {
    console.log(key)
  }

  return (
    <>
      <div className="titleBar" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="title">
          <span>好看韩剧3</span>
        </div>
        <div className="drop"></div>
        <div className="btns">
          {btns.map(function (item) {
            return (
              <span key={item} onClick={() => onitleBtnClick(item)}>
                <i className={`fa-solid ${item}`}></i>
              </span>
            )
          })}
        </div>
      </div>
    </>
  )
}
