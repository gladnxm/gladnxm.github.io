import { useState } from 'react'
import './style/App.module.scss'
import AllMenu from './AllMenu.js'

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
      <div>Table {tableNum + 1}</div>
    </header>
    {
      showingMenu.map(el=>{
        return (
          //key 없으면 에러
          <div key={el.id}>  
            <p>{el.title}</p>
            <p>{el.alc ? el.alc + '%' : ''}</p>
            <p>{el.price}</p>
            <button>자세히</button>
            <button>담기</button>
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
