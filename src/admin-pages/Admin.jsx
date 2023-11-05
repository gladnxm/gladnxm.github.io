import styled from "styled-components"
import { useState } from "react";
import OrderStatus from "./OrderStatus";
import EditMenu from "./EditMenu";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const Wrapper = styled.div`
  display: flex;
  width: 200vw;
  height: 100vh;
  transition: transform 1s ease; 
  transform: translateX(${props => props.page === 'page2' ? '-100vw' : 0});
`
const Svg = styled.svg`
  width: 40px;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  &:nth-of-type(1) { left: 90vw; }
  &:nth-of-type(2) { right: 90vw; }
`

function Admin() {
  const [page, setPage] = useState("page1");
  return (
    <Container>
    <Wrapper page={page}>
      <Svg onClick={()=>setPage("page2")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
      </Svg>
      <Svg onClick={()=>setPage("page1")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
      </Svg>
      <OrderStatus/>
      <EditMenu/>
    </Wrapper>
    </Container>
  )
}
export default Admin