import { useState } from "react"
import { useSelector } from "react-redux"
import '../style/Detail.scss'

function Detail(props) {
  const [count, setCount] = useState(0)
  let clicked = useSelector(state => state.clickedItem)
  console.log(clicked)
  return (
    <div className="detail">
      <img src="https://i1.sndcdn.com/avatars-000290569641-i7c4xl-t240x240.jpg" alt="" />
      <p>{clicked.title}</p>
      <p>{clicked.alc}</p>
      <p>{clicked.explanation}</p>
      <div className="control">
        <button onClick={()=> (count > 0) && setCount(prev=>prev-1)}>-</button>
        <span >{count}</span>
        <button onClick={()=>setCount(prev=>prev+1)}>+</button>
      </div>
      <footer>
        <button>주문내역</button>
        <button>장바구니</button>
      </footer>
    </div>
    
  )
}

export default Detail