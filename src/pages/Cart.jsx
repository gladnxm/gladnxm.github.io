/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addOrderList, updateTableOrderList } from '../store.js'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase.js"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CartItem from "../components/CartItem.jsx"
import { HeaderStyles } from "../style.js"

const Wrapper = styled.div`
`
const Header = styled.header`
  ${HeaderStyles}
  .icon:last-of-type { opacity:0; }
`
const UsePoint = styled.div`
  width: 200px;
  height: 100px;
  input { width: 50px; }
  p { margin-bottom: 10px; }
`
const Footer = styled.footer`
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  display: flex;
  button {
    background-color: #fff;
    border: 1px dashed #60c6d8;
    width: 140px;
    height: 100%;
    font-size: 16px;
  }
  p { font-size: 18px; }
`
function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = auth.currentUser || null
  const cart = useSelector(state => state.tableInfo.cart)
  const [totalAmount, setTotalAmount] = useState(0)
  const [usedPoint, setUsedPoint] = useState("")
  const [havePoint, setHavePoint] = useState(0)

  useEffect(()=>{
    (async() => {
      if(user === null) return
      let p = await getDoc(doc(db, 'UserPoint', user.uid))
      setHavePoint(p.data()['myPoint'])
    })()
  }, [])

  useEffect(()=>{
    setTotalAmount(cart.reduce((acc, cur) => acc + cur.totalPrice, 0))
  }, [cart])

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
    if(cart.length <= 0) {
      alert("장바구니에 담긴 상품이 없어요.")
      return
    }
    if(havePoint < usedPoint) {
      alert("사용하려는 포인트가 보유포인트보다 큽니다.")
      setUsedPoint("")
      return
    }
    if(user) {
      updateDoc(
        doc(db, 'UserPoint', user.uid),
        {'myPoint':havePoint-usedPoint}
      )
      updateCollection()
    }    
    dispatch(addOrderList())
    dispatch(updateTableOrderList())
    dispatch(setTotalAmount(totalAmount-usedPoint))
    setHavePoint(prev => prev-usedPoint)
    setUsedPoint("")
    setTotalAmount(0)
  }

  return (
    <Wrapper>         
      <Header>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} onClick={()=>navigate(-1)} />
        <span>장바구니</span>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
      </Header>
      { cart.map((item, i) => <CartItem item={item} key={i} />) }
         
      {user && (
        <UsePoint>
          <p>보유 포인트 : {havePoint}</p>
          <span>포인트 사용 : </span>
          <input 
            type="number"
            max={havePoint}
            value={usedPoint}
            onChange={e=>setUsedPoint(parseInt(e.target.value || 0))}
          />
        </UsePoint>
      )}
      <Footer>
        <button onClick={order}>주문하기</button>
        <p>{`주문 금액 : ￦${totalAmount - usedPoint}`}</p>
      </Footer>
    </Wrapper>
  )
}
export default Cart