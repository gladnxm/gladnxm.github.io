/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { plusCount, minusCount, removeItem } from '../store.js'

function Item({item, tableNumber}) {
  const dispatch = useDispatch()
  return (
    <div className='item'>  
      <span>{item.title}</span>
      <span>{item.alc && item.alc + '%'}</span>
      <span>{'￦' + item.totalPrice}</span>
      <div className="control">
        <button onClick={() => dispatch(minusCount({item,tableNumber}))}>-</button>
        <span>{item.count}</span>
        <button onClick={() => dispatch(plusCount({item,tableNumber}))}>+</button>
      </div>
      <span onClick={() => dispatch(removeItem(item.title))}>X</span>
    </div>
  )
}

function Cart() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart[tableNumber])
  console.log(cart)
  return (
    <>   
      {
        cart.map((item, i) => <Item item={item} tableNumber={tableNumber} key={i} />)
      }
      {
        // cart.reducer()
      }
      <p>가격: </p>
      <footer>
        <button onClick={()=>navigate(-1)}>뒤로가기</button>
        <button>주문하기</button>
      </footer>
    </>
  )
}
export default Cart