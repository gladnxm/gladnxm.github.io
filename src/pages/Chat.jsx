/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { auth, db } from "../firebase"
import { collection, doc, onSnapshot, query, updateDoc } from "firebase/firestore"

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  width: 400px;
  height: 500px;
  border: 1px solid #000;
  * {box-sizing: border-box}
  header {
    height: 60px;
    text-align: center;
    border-bottom: 1px solid #000;
  }
  input {
    width: 80%;
    height: 30px;
  }
  button {
    width: 20%;
    height: 30px;
  }
`
const ChatBox = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  gap: 5px;
  height: 300px;
`

function Chat() {
  //현재 로그인한 계정이 관리자냐? 에 따라서 관리자로직과 손님로직 구분할필요잇음
  let {tableNumber} = useParams() 
  tableNumber = parseInt(tableNumber)
  const [chatting, setChatting] = useState(null)
  const [message, setMessage] = useState("")
  const who = auth.currentUser ? "직원" : "손님"

  const sendMessage = () => {    
    updateDoc(
      doc(db, "Chatting", `${tableNumber}`),
      { list: [...chatting[tableNumber], `${who} : ${message}`] }
    )
    setMessage("")
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
      {
        who === "직원"
        ? <header>{tableNumber}번 테이블과 채팅</header>
        : <header>직원 도움이 필요하신가요?<br/>메세지를 남겨주세요</header>
      }
      <ChatBox>
      {chatting[tableNumber].map((text, i) => <span key={i}>{text}</span>)}
      </ChatBox>
      <input 
        type="text" 
        onChange={e=>setMessage(e.target.value)} 
        value={message} 
      />
      <button onClick={sendMessage}>전송</button>
    </Wrapper>
  )
}
export default Chat