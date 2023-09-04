/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux"
import '../style/Detail.scss'
import { useNavigate } from "react-router-dom"

function Detail({item, setShowDetail}) {
  const navigate = useNavigate()
  const comment = []
  return (
    <div className="detail">
      <img src="https://i1.sndcdn.com/avatars-000290569641-i7c4xl-t240x240.jpg" alt="" />
      <div className="info">
        <p>{item.title}</p>
        <p>{item.alc ? `알코올 ${item.alc}%` : ''}</p>
        <p>{'￦' + item.price}</p>
        <p>{item.explanation}</p>
      </div>
      {
        comment.map(el=>{
          <p>댓글 여기서 쫙 보여줄 예정</p>
        })
      }      
      <button onClick={()=>setShowDetail(prev=>!prev)}>닫기</button>
    </div>    
  )
}
export default Detail