/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { plusCount, minusCount, removeItem, addOrderList } from '../store.js'
import '../style/Cart.scss'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase.js"
import { useEffect, useState } from "react"
import styled from "styled-components"

const UsePoint = styled.div`
  width: 200px;
  height: 100px;
  input[type="number"] {
    width: 50px;
  }

`

function Item({item, tableNumber}) {
  const dispatch = useDispatch()
  return (
    <div className='cart item'>  
      <span>{item.title}</span>
      <span>{item.alc && item.alc + '%'}</span>
      <span>{'￦' + item.totalPrice}</span>

      <div className="control">
        <button className="minus" onClick={() => dispatch(minusCount({ item, tableNumber }))}>-</button>
        <span>{item.count}</span>
        <button className="plus" onClick={() => dispatch(plusCount({ item, tableNumber }))}>+</button>
        <button className="remove" onClick={() => dispatch(removeItem({ item, tableNumber }))}>X</button>
      </div>
    </div>
  )
}

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const user = null && auth.currentUser
  const cart = useSelector(state => state.tableInfo.cart[tableNumber])
  const [totalAmount, setTotalAmount] = useState(cart.reduce((acc, cur) => acc + cur.totalPrice, 0))
  const [usedPoint, setUsedPoint] = useState(0)
  const [havePoint, setHavePoint] = useState(0)

  useEffect(()=>{
    (async()=>{
      if(user === null) return
      let p = await getDoc(doc(db, 'UserPoint', user.uid))
      p = p.data()['myPoint']
      setHavePoint(p)
    })()
  }, [])
  const updateCollection = async () => {
    const ref = doc(db, 'UserCollection', user.uid)
    let collection = await getDoc(ref)
    collection = collection.data()
    cart.forEach(item => collection[item.category].push(item.title)) //여기서에러
    for (let category in collection) 
      collection[category] = [...new Set(collection[category])];    
    updateDoc(ref, collection)
  }
  const order = () => {
    console.log("오더함수실행")
    console.log(user)
    if(user) {
      updateDoc(
        doc(db, 'UserPoint', user.uid),
        {'myPoint':havePoint-usedPoint}
      )
      updateCollection()
    }
    updateDoc(
      doc(db, "OrderState", `${tableNumber}`), 
      {'totalAmount': totalAmount- usedPoint}
    )
    dispatch(addOrderList({ cart: [...cart], tableNumber }))
  }
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
      {`합계 : ￦${totalAmount - usedPoint}`}      
      {/* {`합계 : ￦${cart.reduce((acc, cur) => acc + cur.totalPrice, 0)}`}       */}
      </span>     
      {
        user && (
          <UsePoint>
            <p>보유 포인트 : {havePoint}</p>
            <span>포인트 사용 : </span>
            <input 
              type="number"
              max={havePoint}
              value={usedPoint}
              onChange={e=>setUsedPoint(parseInt(e.target.value))}
            />
          </UsePoint>
        )
      }
      <footer className="cart footer">
        <button onClick={()=>navigate(-1)}>뒤로가기</button>
        <button onClick={order}>주문하기</button>
      </footer>
    </>
  )
}
export default Cart