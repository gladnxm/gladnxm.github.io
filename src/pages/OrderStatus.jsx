import { useSelector } from "react-redux"
import '../style/OrderStatus.scss'
import { useNavigate } from 'react-router-dom'

function OrderStatus() {
  let orderStatus = useSelector(state => state.tableInfo.orderStatus)
  const navigate = useNavigate()
  
  return (
    <div className="orderstate">
      {
        orderStatus.map((table, i) => {
          return (
            <div className="box" key={i}>
              {
                table.map(item=><span key={i}>{item}</span>)
              }
              <button>결제</button>
            </div>
          )
        })
      }
      <span className="goback" onClick={()=>navigate(-1)}>뒤로 가기</span>
    </div>
  )
}
export default OrderStatus