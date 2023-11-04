/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import styled, {css} from "styled-components"
import { HeaderStyles } from "../components/commonStyle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  p { 
    text-align: right;
    font-size: 20px; 
  }
`
const Ho = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #666;
  span {
    text-align: center;
    &:nth-child(1) { flex: 5; }
    &:nth-child(2) { flex: 1; }
    &:nth-child(3) { flex: 1; }
    &:nth-child(4) { flex: 2; }
  }
`
const List = styled.div`
  
`
const Header = styled.header`
  ${HeaderStyles}
  .icon:last-of-type { opacity:0; }
`

function Item({item}) {
  const Item = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #666;
    span {
      text-align: center;
      &:nth-child(1) { flex: 5; text-align: left; }
      &:nth-child(2) { flex: 1; }
      &:nth-child(3) { flex: 1; }
      &:nth-child(4) { flex: 2; }
    }
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

      <Ho>
        <span>이름</span>
        <span>도수</span>
        <span>수량</span>
        <span>가격</span>
      </Ho>

      <List> 
        {/* list태그자체는 불필요해보임 */}
      { orderList.map((item, i) => <Item item={item} key={i} />) }
      </List>
      
      <p>
      { `합계 : ￦${orderList.reduce((acc, cur) => acc + cur.totalPrice, 0)}` }
      </p>      

    </Wrapper>
  )
}
export default OrderList