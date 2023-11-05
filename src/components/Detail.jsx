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
  img { width: 50%; }  
  p:first-of-type {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 18px;
  }
  p:nth-of-type(3) {
    
  }
  p:last-of-type {
    margin: 30px 40px 40px;
  }
  button {
    width: 25%;
    height: 40px;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #60c6d8;
  }
`
function Detail({ item, setShowDetail }) {
  return (
    <Wrapper>
      <img src={item.imgURL} alt="상품이미지" />
      <p>{item.title}</p>
      <p>{item.alc ? `알코올 ${item.alc}%` : ''}</p>
      <p>{'￦' + item.price}</p>
      <p>{item.explanation}</p>
      <button onClick={()=>setShowDetail(prev=>!prev)}>닫기</button>
    </Wrapper>    
  )
}
export default Detail