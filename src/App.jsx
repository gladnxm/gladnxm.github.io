import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, Link, useParams } from 'react-router-dom'
import { collection, getDocs, query } from "firebase/firestore"
import { auth, db } from "./firebase"

import './style/App.scss'
import { addItemToCart } from './store.js';
import Detail from './components/Detail.jsx'
import OrderList from './pages/OrderList.jsx';
import OrderStatus from './pages/OrderStatus';
import Cart from './pages/Cart.jsx'
import EditMenu from './pages/EditMenu';
import Book from './member-pages/book';
import CreateAccount from './pages/create-account';
import Login from './pages/login';

function Home() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const user = auth.currentUser
  console.log(user)
  const dispatch = useDispatch()
  const [currentCategory, setCurrentCategory] = useState('cocktail')
  const [menu, setMenu] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [selected, setSelected] = useState(null) //돋보기 클릭한거. state아닌 일반변수로 하면 작동안함.
  
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
    <nav className='home nav'>
      <button onClick={()=>setCurrentCategory('cocktail')}>칵테일</button>
      <button onClick={()=>setCurrentCategory('beer')}>맥주</button>
      <button onClick={()=>setCurrentCategory('wine')}>와인</button>
      <button onClick={()=>setCurrentCategory('whiskey')}>위스키</button>
      <button onClick={()=>setCurrentCategory('dish')}>안주</button>
      <p><Link to='/book'> Table {tableNumber + 1} </Link></p>
    </nav> 
    {
        menu.map((item, i) => {
        return (
          <div className='home item' key={i}>  
            <span>{item.title}</span>
            <span>{item.alc && item.alc + '%'}</span>
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
          </div>
        )
      })
    }
    <footer className='home footer'>
      <Link to={`/${tableNumber}/orderList`}>주문내역</Link>
      <Link to={`/${tableNumber}/cart`}>장바구니</Link>
    </footer>
    {showDetail && <Detail item={selected} setShowDetail={setShowDetail} />}
    </>
  )
} 

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <p><Link to='/0/login'>1번테이블의 qr </Link></p>
          <p><Link to='/1/login'>2번테이블 qr </Link></p>
          <p><Link to='/2/login'>3번테이블 qr</Link></p>
          <p><Link to='/admin'>어드민 </Link></p>
          <p><Link to='/edit'>메뉴수정 </Link></p>
          <p><Link to='/book'>도감 </Link></p>
          <p><Link to='/Login'>로그인 </Link></p>
        </>
      } />
      <Route path='/:tableNumber' element={<Home/>}/>
      <Route path='/:tableNumber/cart' element={<Cart/>}/>
      <Route path='/:tableNumber/orderList' element={<OrderList/>}/>
      <Route path='/admin' element={<OrderStatus/>}/>
      <Route path='/edit' element={<EditMenu/>}/>
      <Route path='/book' element={<Book/>}/>
      <Route path='/:tableNumber/login' element={<Login/>}/>
      <Route path='/:tableNumber/create-account' element={<CreateAccount/>}/>
    </Routes>
  )
}
export default App