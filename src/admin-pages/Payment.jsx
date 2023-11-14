import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { clearTable } from "../store"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const Wrapper = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid #60c6d8;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  button {
    border: 1px dashed #60c6d8;
    width: 90px;
    height: 40px;
    background-color: #fff;
    color: #000;
  }
`
const Item = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  gap: 10px;
  span:nth-child(1) { flex: 7; max-width: 60%; }
  span:nth-child(2) { flex: 1; }
  span:nth-child(3) { flex: 2; }
`

function Payment() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [orderList, setOrderList] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(()=>{
    (async() => {
      let tableOrderList = await getDoc(doc(db, "TableOrderList", `${tableNumber}`))
      setOrderList(tableOrderList.data()['list'])
      setTotalAmount(tableOrderList.data()['totalAmount'])
    })()
  }, [])

  const payment = () => {
    const ok = confirm("계산을 마쳤나요?")
    if(!ok) return
    dispatch(clearTable({tableNumber}))
    alert('테이블 초기화')
    navigate(-1)
  }

  if(orderList === null) return <p>로딩중</p>
  return (
    <Wrapper>
      {
        orderList.map((item,i) => {
          const a = item.split(':')
          return (
            <Item key={i}>
              <span>{a[0]}</span>
              <span>{a[1]}</span>
              <span>{a[2]}</span>
            </Item>
          )
        })
      }
      <p>총 금액 : {'￦' + totalAmount}</p>
      <button onClick={payment}>테이블정리</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </Wrapper>
  )
}
export default Payment