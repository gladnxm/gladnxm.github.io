/* eslint-disable react/prop-types */
import { plusCount, minusCount, removeItem } from '../store.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux"
import styled from "styled-components"

const Item = styled.div`
  position: relative;
  height: 70px;
  margin: 10px;
  margin-bottom: 40px;
  span:nth-child(2) {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .control {
    position: absolute;
    width: 70px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    right: 0;
    bottom: 0;
    border: 1px solid #8bd2df;
    * {
      display: block;
      font-size: 18px;
      color: #5a5a5a;
    }
    button {
      background-color: transparent;
      border: none;
    }
    svg { width: 20px; }
  }
  .total-price {
    position: absolute;
    bottom: 0;
    right: 100px;
    margin: 0;
  }
  .icon.remove {
    position: absolute;
    top: 0;
    right: 0;
    font-size:22px;
  }
`
function CartItem({item, tableNumber}) {
  const dispatch = useDispatch()
  const remove = () => {
    const ok = confirm("항목을 장바구니에서 지울까요?")
    if(!ok) return 
    dispatch(removeItem({ item, tableNumber }))
  }
  return (
    <Item>  
      <span>{item.title}</span>
      <span>{item.alc ? `alc ${item.alc}%` : ''}</span>
      <p className="total-price">{'￦' + item.totalPrice}</p>

      <div className="control">
        {/* <FontAwesomeIcon 
          className="icon" 
          icon={faMinus} 
          onClick={() => dispatch(minusCount({ item, tableNumber }))} 
          /> */}
        <svg 
        onClick={() => dispatch(minusCount({ item, tableNumber }))} 
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
        </svg>

        <p>{item.count}</p>
        {/* <FontAwesomeIcon 
          className="icon" 
          icon={faPlus} 
          onClick={() => dispatch(plusCount({ item, tableNumber }))} 
        /> */}
        <svg 
        onClick={() => dispatch(plusCount({ item, tableNumber }))} 
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </div>

      <FontAwesomeIcon 
        className="icon remove" 
        icon={faXmark} 
        onClick={remove} 
      />
    </Item>
  )
}
export default CartItem