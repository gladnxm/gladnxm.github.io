import { useState } from 'react'
import './style/App.scss'
import AllMenu from './AllMenu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [showingMenu, setShowingMenu] = useState(AllMenu.cocktail)
  const tableNum = 0
  return (
    <>
    <header>
      <button onClick={()=>setShowingMenu(AllMenu.cocktail)}>칵테일</button>
      <button onClick={()=>setShowingMenu(AllMenu.beer)}>맥주</button>
      <button onClick={()=>setShowingMenu(AllMenu.wine)}>와인</button>
      <button onClick={()=>setShowingMenu(AllMenu.whiskey)}>위스키</button>
      <button onClick={()=>setShowingMenu(AllMenu.dish)}>안주</button>
      <p>Table {tableNum + 1}</p>
    </header>
    {
      showingMenu.map(el=>{
        return (
          //key 없으면 에러
          <div className={'item1'} key={el.id}>  
            <span>{el.title}</span>
            <span>{el.alc ? el.alc + '%' : ''}</span>
            <span>{'￦' + el.price}</span>
            <FontAwesomeIcon 
              icon={faMagnifyingGlassPlus} 
              onClick={()=>console.log('2132')}
            />
            <FontAwesomeIcon 
              icon={faCartShopping} 
              onClick={()=>console.log('aasds')}
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

export default App
