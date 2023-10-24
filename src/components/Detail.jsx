/* eslint-disable react/prop-types */
import styled from "styled-components"

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 10;
  img { width: 100px; }  
`
function Detail({ item, setShowDetail }) {
  return (
    <Wrapper>
      <img src={item.imgURL} alt="상품이미지" />
      <div className="info">
        <p>{item.title}</p>
        <p>{item.alc ? `알코올 ${item.alc}%` : ''}</p>
        <p>{'￦' + item.price}</p>
        <p>{item.explanation}</p>
      </div>  
      <button onClick={()=>setShowDetail(prev=>!prev)}>닫기</button>
    </Wrapper>    
  )
}
export default Detail