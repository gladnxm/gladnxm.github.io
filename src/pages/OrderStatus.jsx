/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebase"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 800px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  border: 2px solid #524f4f;
`
const Box = styled.div`
  box-sizing: border-box;
  border: 1px solid #b0e691;
  width: 200px;
  height: 200px;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`
const GoBack = styled.button`
  position: relative;
  right: -20px;
`
const PaymentWrapper = styled.div`
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


function Payment({tableNumber, setShowPayment}) {
  const orderList = useSelector(state => state.tableInfo.orderList[tableNumber])
  
  return (
    <PaymentWrapper>
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
    </PaymentWrapper>
  )
}

const Span = styled.span`
  color: ${props => props.isRed ? 'red' : 'green'};
`
function Item({item}) {
  const [isRed, setIsRed] = useState(true)
  return (
    <Span isRed={isRed} onClick={()=>setIsRed(prev=>!prev)}>{item}</Span>
  )
}

function OrderStatus() {
  const navigate = useNavigate()
  const [showPayment, setShowPayment] = useState(false)
  const [tableNumber, setTableNumber] = useState(null)
  const [tables, setTables] = useState([])

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
    <Wrapper>
      {
        tables.map((table, i) => {
          return (
            <Box key={i}>
              { table.map(item => <Item key={i} item={item} />) }
              <button onClick={()=>{
                setTableNumber(i)
                setShowPayment(prev=>!prev)}
              }>결제
              </button>
              <button onClick={()=>navigate(`/${i}/chat`)}>채팅</button>
            </Box>
          )
        })
      }
      <GoBack onClick={()=>navigate(-1)}>뒤로 가기</GoBack>
      { showPayment && (
        <Payment 
          tableNumber={tableNumber} 
          setShowPayment={setShowPayment} 
        />)
      }
    </Wrapper>
  ) 
}
export default OrderStatus