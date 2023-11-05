import styled, {css} from "styled-components"
import { WrapperStyles } from '../components/commonStyle'
import { useState } from "react";
import OrderStatus from "./OrderStatus";
import EditMenu from "./EditMenu";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const Wrapper = styled.div`
  /* ${WrapperStyles} */
  display: flex;
  width: 200vw;
  height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
  transition: transform 1s ease;  
  /* ${props => (props.pagee === "page2") ? css`transform: translateX(-100vw);` : css`transform: translateX(0);`} */
  transform: translateX(${props => props.pagee === 'page2' ? '-100vw' : 0});
`
const Button = styled.svg`
  width: 40px;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  &:nth-of-type(1) { left: 90vw; }
  &:nth-of-type(2) { right: 90vw; }
`

function Admin() {
  const [pagee, setPage] = useState("page1");
  return (
    <Container>
    <Wrapper pagee={pagee}>
      <Button onClick={()=>setPage("page2")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
      </Button>
      <Button onClick={()=>setPage("page1")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
      </Button>
      <OrderStatus/>
      <EditMenu/>
    </Wrapper>
    </Container>
  )
}
export default Admin