/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { plusCount, minusCount, removeItem } from '../store.js'
import '../style/Cart.scss'

function Item({item, tableNumber}) {
  const dispatch = useDispatch()
  return (
    <div className='cart item'>  
      <span>{item.title}</span>
      <span>{item.alc && item.alc + '%'}</span>
      <span>{'￦' + item.totalPrice}</span>

      <div className="control">
        <button className="minus" onClick={() => dispatch(minusCount({item,tableNumber}))}>-</button>
        <span>{item.count}</span>
        <button className="plus" onClick={() => dispatch(plusCount({item,tableNumber}))}>+</button>
        <button className="remove" onClick={() => dispatch(removeItem({item,tableNumber}))}>X</button>
      </div>
    </div>
  )
}

function Cart() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const navigate = useNavigate()
  const cart = useSelector(state => state.tableInfo.cart[tableNumber])
  console.log(cart)

  return (
    <>   
      <header className="cart header">
        <span>이름</span>
        <span>도수</span>
        <span>가격</span>
        <span>수량</span>
        <span>삭제</span>
      </header>
      { cart.map((item, i) => <Item item={item} tableNumber={tableNumber} key={i} />) }
      
      <span className="cart total">
      { `합계 : ￦${cart.reduce((acc, cur) => acc + cur.totalPrice, 0)}` }
      </span>      

      <footer className="cart footer">
        <button onClick={()=>navigate(-1)}>뒤로가기</button>
        <button>주문하기</button>
      </footer>
    </>
  )
}
export default Cart