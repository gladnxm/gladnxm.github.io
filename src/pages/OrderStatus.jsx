/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import '../style/OrderStatus.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebase"

function Payment({tableNumber, setShowPayment}) {
  const orderList = useSelector(state => state.tableInfo.orderList[tableNumber])
  
  return (
    <div className="payment">
      {
        orderList.map(item => {
          return (
            <div key={1}>
              <span>{item.title}</span>
              <span>{item.count}</span>
              <span>{'￦' + item.totalPrice}</span>
            </div>
          )
        })
      }
      <button onClick={() => alert('결제완료됨')}>결제하기</button>
      <button onClick={() => setShowPayment(prev=>!prev)}>뒤로가기</button>
    </div>
  )
}

function OrderStatus() {
  // let orderStatus = useSelector(state => state.tableInfo.orderStatus)
  const navigate = useNavigate()
  const [showPayment, setShowPayment] = useState(false)
  const [tableNumber, setTableNumber] = useState(null)
  const [tables, setTables] = useState([])

  const clickEvent = i => {
    setTableNumber(i)
    setShowPayment(prev=>!prev)
  }

  useEffect(()=>{
    let unsubscribe = onSnapshot(
      query(collection(db, "OrderState")), 
      snapshot => setTables(snapshot.docs.map(doc => doc.data()['list']))        
    )    
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  return ( 
    <div className="orderstate">
      {
        tables.map((table, i) => {
          return (
            <div className="box" key={i}>
              { table.map(item => <span key={i}>{item}</span>) }
              <button onClick={()=>clickEvent(i)}>결제</button>
            </div>
          )
        })
      }
      <span 
        className="goback" 
        onClick={()=>navigate(-1)}
      >뒤로 가기
      </span>
      { showPayment && (
        <Payment 
          tableNumber={tableNumber} 
          setShowPayment={setShowPayment} 
        />)
      }
    </div>
  ) 
}
export default OrderStatus