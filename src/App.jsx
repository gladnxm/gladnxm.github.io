import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, Link, Outlet, useNavigate, useParams } from 'react-router-dom'

import './style/App.scss'
import { addItemInCart } from './store.js';
import AllMenu from './AllMenu.js'
import Detail from './components/Detail.jsx'
import OrderList from './pages/OrderList.jsx';
import Cart from './pages/Cart.jsx'

function Home() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const dispatch = useDispatch()
  const [currentCategory, setCurrentCategory] = useState('cocktail')
  const [showDetail, setShowDetail] = useState(false)
  let [selected, setSelected] = useState(null) //돋보기 클릭한거. state아닌 일반변수로 하면 작동안함.
  
  return (
    <>
    <nav className='home nav'>
      <button onClick={()=>setCurrentCategory('cocktail')}>칵테일</button>
      <button onClick={()=>setCurrentCategory('beer')}>맥주</button>
      <button onClick={()=>setCurrentCategory('wine')}>와인</button>
      <button onClick={()=>setCurrentCategory('whiskey')}>위스키</button>
      <button onClick={()=>setCurrentCategory('dish')}>안주</button>
      <p>Table {tableNumber + 1}</p>
    </nav>
    {
      AllMenu[currentCategory].map(item => {
        return (
          <div className='home item' key={item.id}>  
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
                  id: item.id,
                  title: item.title,
                  alc: item.alc,
                  pricePerPiece: item.price,
                  totalPrice: item.price,
                  count: 1,
                }
                dispatch(addItemInCart({item: temp, tableNumber}))                
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
    {
      showDetail && <Detail item={selected} setShowDetail={setShowDetail} />
    }
    </>
  )
} 

function App() {
  return (
    <>
    <Routes>
      <Route path='/:tableNumber' element={<Home />} />
      <Route path='/:tableNumber/cart' element={<Cart />} />
      <Route path='/:tableNumber/orderList' element={<OrderList />} />
    </Routes>
    </>
  )
}
export default App