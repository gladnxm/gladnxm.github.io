import styled from "styled-components"
import { useEffect, useState } from "react";
import OrderStatus from "./OrderStatus";
import EditMenu from "./EditMenu";
import Sales from "./Sales"
import { setMonth, setDay, addSales, updateSales } from '../store.js'
import { useDispatch } from "react-redux";

const x = page => {
  switch (page) {
    case 'page1': return '0'
    case 'page2': return '-100vw'
    case 'page3': return '-200vw'
  }
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const Wrapper = styled.div`
  display: flex;
  width: 300vw;
  height: 100vh;
  transition: transform 1s ease; 
  transform: translateX(${props => x(props.page)});
`
const Svg = styled.svg`
  width: 40px;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  &:nth-of-type(1) { left: 90vw; }
  &:nth-of-type(2) { left: 107vw; }
  &:nth-of-type(3) { left: 190vw; }
  &:nth-of-type(4) { left: 207vw; }
`

function Admin() {
  const date = new Date()
  // const [day, setP] = useState(date.getDay());
  // const [month, setPa] = useState(date.getMonth()+1);
  const [page, setPage] = useState("page2");
  const dispatch = useDispatch()

  useEffect(()=>{
    const date = new Date()
    dispatch(setMonth(date.getMonth()+1))
    dispatch(setDay(date.getDate()))
  }, [])

  return (
    <Container>
    <Wrapper page={page}>
      <Svg onClick={()=>setPage("page2")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
      </Svg>
      <Svg onClick={()=>setPage("page1")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
      </Svg>
      <Svg onClick={()=>setPage("page3")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
      </Svg>
      <Svg onClick={()=>setPage("page2")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
      </Svg>
      <Sales/>
      <OrderStatus/>
      <EditMenu/>
    </Wrapper>
    </Container>
  )
}
export default Admin