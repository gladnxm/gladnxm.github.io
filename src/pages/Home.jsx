import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { collection, getDocs, query } from "firebase/firestore"
import { auth, db } from "../firebase"
import { addItemToCart } from '../store.js';
import Detail from '../components/Detail.jsx';
import styled from 'styled-components';
import { 
  faCartShopping, 
  faCartPlus, 
  faMagnifyingGlass, 
  faList,
  faBook, 
  faComments, 
  faInfo,
  faCircleInfo,
  faBagShopping
} from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
  width: 100%;
  height: 17vh;
  /* position: sticky;
  top: 0; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #EDF0F2;
  * {
    width: 25%;
    height: 40px;
    margin: 10px;
    border-radius: 15px;
    border: none;
    color: #b159a9;
    background-color: #fff;
    font-size: 14px;
  }
  p {
    text-align: center;
    line-height: 3;
    color: #000;
    background-color: transparent;
  }
`
const Item = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: #EDF0F2;
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
  height: 67vh;  
  overflow-y: scroll;
  * {    color: #424242;  }
  div:nth-child(even) {    background-color: #f8f8f8;  }
  .icon { font-size: 22px; }
`
const Footer = styled.footer`
  width: 100%;
  height: 16vh;
  background-color: #EDF0F2;
  display: flex;
  /* border-bottom: 1px solid #000; */
  button {
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    text-align: center;
    color: black;
    border: none;
    flex-grow: 1;
    flex-basis: 0;
    &:nth-child(1) { 
      color: #d85c5c;
    }
    &:nth-child(2) {
      color: #e6af5d;
    }
    &:nth-child(3) {
      color: #5eca70;
    }
    &:nth-child(4) { 
      color: #70c7bb;
    }
    &:first-child { 
      border-top-left-radius: 40px; 
    }
    &:last-child { 
      border-top-right-radius: 40px; 
    }

    /* * { color: #b159a9; } */
    .icon {
      margin-top: 15px;
      font-size: 26px; 
    }
    p { 
      font-size: 16px; 
      margin-bottom: 0;
    }
  }
`

function Home() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    /*
    홈에서 메뉴목록 불러오면 마운트될때마다 계속됨
    최초 1회 불러와서 한번 저장해두면 계속써먹는건데 오래걸리는 페칭 반복하게됨
    그래서 메뉴 state를 홈 컴포넌트에 두지말고 
    전역스토어에 저장해두고 홈에서는 불러만 오는식으로 성능 개선해야함
    테이블인포 말고 별도의 슬라이스로
    */
  }, [currentCategory]) 

  return (
    <>
    <Nav>
      <button onClick={()=>setCurrentCategory('cocktail')}>칵테일</button>
      <button onClick={()=>setCurrentCategory('beer')}>맥주</button>
      <button onClick={()=>setCurrentCategory('wine')}>와인</button>
      <button onClick={()=>setCurrentCategory('whiskey')}>위스키</button>
      <button onClick={()=>setCurrentCategory('dish')}>안주</button>
      <p>Table {tableNumber + 1}</p>
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
                className='icon' 
                icon={faCircleInfo} 
                onClick={()=>{
                  setSelected(item)
                  setShowDetail(prev=>!prev)
                }}
              />
              <FontAwesomeIcon 
                className='icon' 
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
      {
        auth.currentUser &&
        (
          <button onClick={()=>navigate("/book")}>
            <FontAwesomeIcon className='icon' icon={faBook}/>
            <p>도감</p>
          </button>
        )
      }      
      <button onClick={()=>navigate(`/${tableNumber}/chat`)}>
        <FontAwesomeIcon className='icon' icon={faComments}/>
        <p>채팅문의</p>
      </button>
      <button onClick={()=>navigate(`/${tableNumber}/orderList`)}>
        <FontAwesomeIcon className='icon' icon={faList}/>
        <p>주문내역</p>
      </button>
      <button onClick={()=>navigate(`/${tableNumber}/cart`)}>
        <FontAwesomeIcon className='icon' icon={faBagShopping}/>
        <p>장바구니</p>
      </button>
       
      {/* <Link to={`/${tableNumber}/chat`}>채팅 문의</Link>
      <Link to={`/${tableNumber}/orderList`}>주문 내역</Link>
      <Link to={`/${tableNumber}/cart`}>장바구니</Link> */}
    </Footer>
    {showDetail && <Detail item={selected} setShowDetail={setShowDetail} />}
    </>
  )
} 

export default Home