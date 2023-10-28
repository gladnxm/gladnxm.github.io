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
    &:first-of-type {right: 0;}
    &:last-of-type {right: 50px;}
  }

`
const GoBack = styled.button`
  position: relative;
  right: -20px;
`

const Span = styled.span`
  color: ${props => props.isRed ? 'red' : 'green'};
`
function Item({item}) {
  const [isRed, setIsRed] = useState(true)
  return <Span isRed={isRed} onClick={()=>setIsRed(prev=>!prev)}>{item}</Span>
}

function OrderStatus() {
  const navigate = useNavigate()
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
              <button onClick={()=>navigate(`/${i}/payment`)}>결제</button>
              <button onClick={()=>navigate(`/${i}/chat`)}>채팅</button>
            </Box>
          )
        })
      }
      <GoBack onClick={()=>navigate(-1)}>뒤로 가기</GoBack>
    </Wrapper>
  ) 
}
export default OrderStatus