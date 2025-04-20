import { PageList } from '@renderer/network/net'
import { NetApi } from '@renderer/network/net_api'
import { useEffect, useState } from 'react'
import './css/page_list.css'

interface propType {
  list: PageList[]
  onChange: (value: string) => void
}

export default function PageArr({ list, onChange }: propType): JSX.Element {
  const onChange_ = (item: PageList) => {
    const regex = /p-(\d+)\.html/
    const match = item.href.match(regex)
    if (match) {
      const pageNumber = match[1]
      console.log(pageNumber) // 输出: 2
      NetApi.body.page = Number(pageNumber)
    } else {
      NetApi.body.page = 1
      console.log('未找到匹配项')
    }
    onChange(item.href)
  }
  const [pageList, setPageList] = useState<PageList[]>([])
  useEffect(() => {
    setPageList(list)
  }, [list])
  return (
    <div className="page_list">
      {pageList.length > 0 && <div className="page_list_fy">页数</div>}
      {pageList.map((item, idx) => {
        return (
          <div key={idx} onClick={() => onChange_(item)} className="page_list_item">
            <div className={`page_list_item_label ${item.select ? 'page_list_item_select' : ''}`}>
              {item.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
