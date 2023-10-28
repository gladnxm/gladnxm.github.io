import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { clearTable } from "../store"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const Wrapper = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid #b0e691;;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  button {
    //
  }
`

function Payment() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderList = useSelector(state => state.tableInfo.orderList[tableNumber])
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(()=>{
    (async() => {
      let totalAmount = await getDoc(doc(db, "OrderState", tableNumber))
      setTotalAmount(totalAmount.totalAmount)
    })()
    // console.log(totalAmount)
  },[])
  const payment = () => {
    const ok = confirm("계산할까요?")
    if(!ok) return
    dispatch(clearTable({tableNumber}))
    alert('결제완료됨')
    navigate(-1)
  }
  return (
    <Wrapper>
      {
        orderList.map((item,i) => {
          return (
            <div key={i}>
              <span>{item.title}</span>
              <span>{item.count}</span>
              {/* <span>{'￦' + item.totalPrice}</span> */}
            </div>
          )
        })
      }
      <p>총 금액 : {'￦' + totalAmount}</p>
      <button onClick={payment}>결제하기</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </Wrapper>
  )
}
export default Payment