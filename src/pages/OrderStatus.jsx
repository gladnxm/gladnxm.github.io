import { useSelector } from "react-redux"
import '../style/OrderStatus.scss'

function OrderStatus() {
  let orderStatus = useSelector(state => state.tableInfo.orderStatus)

  return (
    <>
      {
        orderStatus.map((table, i) => {
          return (
            <div className="box" key={i}>
              {table}
              <button>결제</button>
            </div>
          )
        })
      }
    </>
  )
}
export default OrderStatus