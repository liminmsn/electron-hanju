import { SiftList } from '@renderer/network/net'
import { Segmented } from 'antd'
interface propType {
  siftList: SiftList[]
}
export default function SiftSeg({ siftList }: propType) {
  return <Segmented options={siftList} />
}
