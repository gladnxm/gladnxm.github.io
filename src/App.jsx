import { useState } from 'react'
import './style/App.scss'
import AllMenu from './AllMenu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom'
import Detail from './pages/Detail.jsx'
import { changeClickedItem } from './store.js';
import { useDispatch } from 'react-redux';

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentCategory, setCurrentCategory] = useState('cocktail')
  const tableNum = 0

  return (
    <>
    <header>
      <button onClick={()=>setCurrentCategory('cocktail')}>칵테일</button>
      <button onClick={()=>setCurrentCategory('beer')}>맥주</button>
      <button onClick={()=>setCurrentCategory('wine')}>와인</button>
      <button onClick={()=>setCurrentCategory('whiskey')}>위스키</button>
      <button onClick={()=>setCurrentCategory('dish')}>안주</button>
      <p>Table {tableNum + 1}</p>
    </header>
    {
      AllMenu[currentCategory].map((el, i) => {
        return (
          //key 없으면 에러
          <div className={'item'} key={el.id}>  
            <span>{el.title}</span>
            <span>{el.alc ? el.alc + '%' : ''}</span>
            <span>{'￦' + el.price}</span>
            <FontAwesomeIcon
              className='icon' 
              icon={faMagnifyingGlassPlus} 
              onClick={()=>{
                dispatch(changeClickedItem({currentCategory, i}))
                navigate('/detail')
              }}
            />
            <FontAwesomeIcon 
              className='icon' 
              icon={faCartShopping} 
              onClick={()=>navigate('/cart')}
            />
          </div>
        )
      })
    }
    <footer>
      <button>주문내역</button>
      <button>장바구니</button>
    </footer>
    </>
  )
} 

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/detail' element={<Detail />} />
    </Routes>

    
    </>
  )
}

export default App
