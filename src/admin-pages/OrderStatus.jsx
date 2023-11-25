/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebase"
import styled from "styled-components"
import { WrapperStyles } from '../style'

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
  svg, button { 
    height:80%;   
    background: transparent;
    border: none;
    border-top: 1px solid #60c6d8;
    border-left: 1px solid #60c6d8; 
  }
  svg {
    color: orange;
    border: none;
  }
`
const Span = styled.span`
  color: ${props => props.isRed ? 'red' : 'green'};
`

function Item({title}) {
  const [isRed, setIsRed] = useState(true)
  return <Span isRed={isRed} onClick={()=>setIsRed(prev=>!prev)}>{title}</Span>
}

function OrderStatus() {
  const navigate = useNavigate()
  const [tables, setTables] = useState([])
  const [bell, setBell] = useState([])

  useEffect(()=>{
    let unsubscribe1 = onSnapshot(
      query(collection(db, "OrderState")), 
      snapshot => setTables(snapshot.docs.map(doc => doc.data()['list']))        
    )    
    let unsubscribe2 = onSnapshot(
      query(collection(db, "Check")), 
      snapshot => setBell(snapshot.docs.map(doc => doc.data()['on']))        
    )
  }, [])

  return ( 
    <Wrapper>
      <Main>
      {
        tables.map((table, i) => {
          return (
            <Article key={i}>
              <P>{i+1}번 테이블</P>
              <Box>{table.map(title => <Item key={i} title={title}/>)}</Box>
              <Footer>
                {
                  bell[i] == false && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>)
                }
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