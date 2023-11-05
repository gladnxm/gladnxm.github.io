/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { auth, db } from "../firebase"
import { collection, doc, onSnapshot, query, updateDoc } from "firebase/firestore"
import { HeaderStyles, WrapperStyles } from "../components/commonStyle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  ${WrapperStyles}
  * {box-sizing: border-box;}  
`
const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 10px;
  @media (min-width: 500px) {      
    width: 400px;
    height: 500px;    
  }  /* 화면 폭이 500 이상인 경우에만 적용 */
`
const Header = styled.header`
  ${HeaderStyles}
  .icon:last-of-type { opacity:0; }
`
const ChatBox = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  min-height: 20%;
  padding: 10px;
  border: 1px solid #60c6d8;
  @media (min-width: 500px) { height: 300px; }
  .me, .you {
    padding: 7px;
    color: #312268;
    width: max-content;
  }
  .me {
    background-color: #e6e6e6;
    margin-left: auto;
  }
  .you {
    border: 1px solid #e6e6e6;
    margin-right: auto;
  }
`
const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #dfdfdf;
  height: 50px;
  input {
    width: 250px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #dfdfdf;
    font-size: 16px;
  }
  svg {
    width: 35px;
    height: 35px;
    padding: 7px;
    /* background-color: #9859eb; */
    background-color: #60c6d8;
    color: #fff;
    border-radius: 50%;
  }
`

function Chat() {
  //현재 로그인한 계정이 관리자냐? 에 따라서 관리자로직과 손님로직 구분할필요잇음
  let {tableNumber} = useParams() 
  tableNumber = parseInt(tableNumber)
  const [chatting, setChatting] = useState(null)
  const [message, setMessage] = useState("")
  const who = (auth.currentUser?.uid === "749DMpmSITalUBJA7sykxHAFmVY2") ? "직원" : "손님"
  const navigate = useNavigate()

  const sendMessage = () => {    
    updateDoc(
      doc(db, "Chatting", `${tableNumber}`),
      { list: [...chatting[tableNumber], `${who}:${message}`] }
    )
    setMessage("")
  }

  const naming = msg => {    
    if(who === "손님") 
      return msg.includes("손님") ? "me" : "you"
    else if(who === "직원") 
      return msg.includes("직원") ? "me" : "you"   
  }

  useEffect(()=>{
    onSnapshot(
      query(collection(db, "Chatting")), 
      snapshot => setChatting( snapshot.docs.map(doc=>doc.data().list) )
    );
  }, [])

  if(chatting === null) return <p>로딩중</p>
  //초기값이 널인데 이때 랜더링되면 널에 인덱스로 접근하는게 돼서 에러가남
  //에러나면 state바꾼다고 재렌더링 되지않음 걍거기서 멈추게됨 그래서 일단 에러안나게 해야함
  return (
    <Wrapper>
    <Main>
      <Header>
        <FontAwesomeIcon 
          className="icon" 
          icon={faArrowLeft} 
          onClick={()=>navigate(-1)} 
        />
        {
          who === "직원"
          ? <span>{tableNumber+1}번 테이블과 채팅</span>
          : <span>직원 도움이 필요하신가요?</span>
        }
        <FontAwesomeIcon 
          className="icon" 
          icon={faArrowLeft} 
        />
      </Header>
      
      <ChatBox who={who}>
      {
        chatting[tableNumber].map((msg, i) => {
          return (
            <span className={naming(msg)} key={i}>
            {msg.split(':')[1]}
            </span>
          )
        })
      }
      </ChatBox>
      
      <Footer>
        <input 
          type="text" 
          onChange={e=>setMessage(e.target.value)} 
          value={message}
          placeholder="메시지를 입력하세요" 
        />
        <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </Footer>
    </Main>
    </Wrapper>
  )
}
export default Chat