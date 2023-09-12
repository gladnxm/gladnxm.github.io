/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function Item({item}) {
  return (
    <div className='cart item'>  
      <span>{item.title}</span>
      <span>{item.alc && item.alc + '%'}</span>
      <span>{item.count}</span>
      <span>{'￦' + item.totalPrice}</span>
    </div>
  )
}

function OrderList() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const navigate = useNavigate()
  const orderList = useSelector(state => state.tableInfo.orderList[tableNumber])

  return (
    <>   
      <header className="cart header">
        <span>이름</span>
        <span>도수</span>
        <span>가격</span>
        <span>수량</span>
      </header>
      { orderList.map((item, i) => <Item item={item} key={i} />) }
      
      <span className="cart total">
      { `합계 : ￦${orderList.reduce((acc, cur) => acc + cur.totalPrice, 0)}` }
      </span>      

      <footer className="cart footer">
        <button onClick={()=>navigate(-1)}>뒤로가기</button>
      </footer>
    </>
  )
}
export default OrderList