/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { HeaderStyles, OrderListStyles } from "../components/commonStyle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  p { 
    text-align: right;
    font-size: 20px; 
  }
`
const Header = styled.header`
  ${HeaderStyles}
  .icon:last-of-type { opacity:0; }
`
const TableHeader = styled.div`
  ${OrderListStyles}
  font-weight: bold;
`
const List = styled.div`
  div:last-of-type { border-bottom: none; } 
`

function Item({item}) {
  const Item = styled.div`
    ${OrderListStyles}
    span:first-child { text-align: left; }
    border-bottom: 1px dashed #8bd2df;    
  `
  return (
    <Item>  
      <span>{item.title}</span>
      <span>{item.alc ? item.alc + '%' : ''}</span>
      <span>{item.count}</span>
      <span>{'￦' + item.totalPrice}</span>
    </Item>
  )
}

function OrderList() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const navigate = useNavigate()
  const orderList = useSelector(state => state.tableInfo.orderList[tableNumber])
  
  return (
    <Wrapper>   
      <Header>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} onClick={()=>navigate(-1)} />
        <span>주문 내역</span>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} />      
      </Header>
      <TableHeader>
        <span>이름</span>
        <span>도수</span>
        <span>수량</span>
        <span>가격</span>
      </TableHeader>
      <List>{orderList.map((item, i) => <Item item={item} key={i} />)}</List>      
      <p>{`합계 : ￦${orderList.reduce((acc, cur) => acc + cur.totalPrice, 0)}`}</p>    
    </Wrapper>
  )
}
export default OrderList