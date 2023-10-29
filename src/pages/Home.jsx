import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs, query } from "firebase/firestore"
import { auth, db } from "../firebase"
import { addItemToCart } from '../store.js';
import Detail from '../components/Detail.jsx';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  position: sticky;
  display: flex;
  flex-wrap: wrap;
  top: 0;
  gap: 20px;
  justify-content: space-around;
  background-color: #b0e691;
  * {
    width: 25%;
    height: 40px;
  }
  p {
    text-align: center;
    margin: 0;
    line-height: 2.5;
  }
`
const Item = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #b0e691;  
  * {
    margin-top: 20px;
    &:nth-child(1) { width: 140px; }
    &:nth-child(2) { width: 45px; }
    &:nth-child(3) { width: 70px; }
    &:nth-child(4), 
    &:nth-child(5) { width: 55px; font-size: 1.5em; }
  }
  .icon:hover { cursor: pointer; }
`
const MenuBox = styled.div`
  height: 460px;
  overflow-y: scroll;
`
const Footer = styled.footer`
  width: 100%;
  height: 100px;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  bottom: 0;
  * {
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    width: 50%;
    height: 50px;
    background-color: #b0e691;
    text-align: center;
    text-decoration: none;
    color: black;
    line-height: 3;
    border: 1px solid black;
  }
`

function Home() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const dispatch = useDispatch()
  const [currentCategory, setCurrentCategory] = useState('cocktail')
  const [menu, setMenu] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [selected, setSelected] = useState(null) //돋보기 클릭한거. state아닌 일반변수로 하면 작동안함.
  console.log("홈에서..", auth.currentUser)

  useEffect(()=>{
    const fetchMenu = async() => {
      const menuQuery = query(collection(db, currentCategory))
      const snapshot = await getDocs(menuQuery)
      const temp = snapshot.docs.map(doc => doc.data())
      setMenu(temp)
    }
    fetchMenu()
  }, [currentCategory])

  return (
    <>
    <Nav>
      <button onClick={()=>setCurrentCategory('cocktail')}>칵테일</button>
      <button onClick={()=>setCurrentCategory('beer')}>맥주</button>
      <button onClick={()=>setCurrentCategory('wine')}>와인</button>
      <button onClick={()=>setCurrentCategory('whiskey')}>위스키</button>
      <button onClick={()=>setCurrentCategory('dish')}>안주</button>
      <p><Link to='/book'> Table {tableNumber + 1} </Link></p>
    </Nav> 
    <MenuBox>
    {
        menu.map((item, i) => {
          return (
            <Item key={i}>  
              <span>{item.title}</span>
              <span>{item.alc ? item.alc + '%' : ''}</span>
              <span>{'￦' + item.price}</span>
              <FontAwesomeIcon
                className='home icon' 
                icon={faMagnifyingGlassPlus} 
                onClick={()=>{
                  setSelected(item)
                  setShowDetail(prev=>!prev)
                }}
              />
              <FontAwesomeIcon 
                className='home icon' 
                icon={faCartShopping} 
                onClick={()=>{
                  const temp = {
                    title: item.title,
                    alc: item.alc,
                    pricePerPiece: item.price,
                    totalPrice: item.price,
                    category: item.category,
                    count: 1,
                  }
                  dispatch(addItemToCart({item: temp, tableNumber}))                
                }}
              />
            </Item>
        )
      })
    }
    </MenuBox>
    <Footer>
      {auth.currentUser ? <Link to="/book">도감</Link> : <div />}
      <Link to={`/${tableNumber}/chat`}>채팅 문의</Link>
      <Link to={`/${tableNumber}/orderList`}>주문 내역</Link>
      <Link to={`/${tableNumber}/cart`}>장바구니</Link>
    </Footer>
    {showDetail && <Detail item={selected} setShowDetail={setShowDetail} />}
    </>
  )
} 

export default Home