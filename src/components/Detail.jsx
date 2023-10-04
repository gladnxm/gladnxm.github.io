/* eslint-disable react/prop-types */
import '../style/Detail.scss'

function Detail({ item, setShowDetail }) {
  return (
    <div className="detail">
      <img src={item.imgURL} alt="상품이미지" />
      <div className="info">
        <p>{item.title}</p>
        <p>{item.alc ? `알코올 ${item.alc}%` : ''}</p>
        <p>{'￦' + item.price}</p>
        <p>{item.explanation}</p>
      </div>  
      <button onClick={()=>setShowDetail(prev=>!prev)}>닫기</button>
    </div>    
  )
}
export default Detail