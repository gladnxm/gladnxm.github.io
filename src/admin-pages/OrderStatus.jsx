/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebase"
import styled from "styled-components"
import { WrapperStyles } from '../components/commonStyle'

const Wrapper = styled.div`
  ${WrapperStyles}
`
const Main = styled.main`
  width: 60%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  background-color: #fff;
`
const Article = styled.article`
  *{box-sizing: border-box;}
  border: 1px solid #60c6d8;
  width: 30%;
  height: 230px;
`
const P = styled.p`
  width: 100%;
  height: 15%;
  text-align: center;
  margin: 0;
`
const Box = styled.div`
  width: 100%;
  height: 70%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`
const Footer = styled.footer`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: right;
  align-items: end;
  button { 
    height:80%;   
    background: transparent;
    border: none;
    border-top: 1px solid #60c6d8;
    border-left: 1px solid #60c6d8; 
  }
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
  // useEffect(()=>{
  //   onSnapshot(
  //     query(collection(db, "OrderState")), 
  //     snapshot => setTables(snapshot.docs.map(doc => doc.data()['list']))        
  //   )    
  // }, [])

  return ( 
    <Wrapper>
      <Main>
      {
        tables.map((table, i) => {
          return (
            <Article key={i}>
              <P>{i+1}번 테이블</P>
              <Box>{table.map(item => <Item key={i} item={item} />)}</Box>
              <Footer>
                <button onClick={()=>navigate(`/${i}/chat`)}>채팅</button>
                <button onClick={()=>navigate(`/${i}/payment`)}>결제</button>
              </Footer>
            </Article>
          )
        })
      }
      </Main>
    </Wrapper>
  ) 
}
export default OrderStatus