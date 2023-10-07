import { useState } from "react"
import { Form } from "../components/auth-components"
import { useNavigate, useParams } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

function CreateAccount() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  console.log("가입페이지에서 테이블번호.. ", tableNumber)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const onChange = e => {
    const {target:{name,value}} = e;
    ({
      "email": () => setEmail(value),
      "password": () => setPassword(value),      
      "nickname": () => setNickname(value),
    })[name]();
  }
  const onSubmit = async e => {
    e.preventDefault() 
    const credentions = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credentions.user, {displayName: nickname})    
    await setDoc(doc(db, `UserCollection/${credentions.user.uid}`), {
      cocktail: [],
      whiskey: [],
      wine: [],
      beer: [],
      dish: [],
    })
    alert("가입완료")
    navigate(`/${tableNumber}`)
  }
  return (
    <Form action="#" onSubmit={onSubmit}>
      <label htmlFor="email">이메일</label>
      <input 
        required
        id="email"
        type="email" 
        name="email"
        value={email} 
        placeholder='이메일' 
        onChange={onChange} 
      />
      <label htmlFor="password">비밀번호</label>
      <input 
        required
        id="password"
        type="password" 
        name="password"
        value={password} 
        placeholder='비밀번호' 
        onChange={onChange} 
      />
      <label htmlFor="nickname">닉네임</label>
      <input 
        required
        id="nickname"
        type="text" 
        name="nickname"
        value={nickname} 
        placeholder='닉네임' 
        onChange={onChange} 
      />
      <button type="submit">가입하기</button>
    </Form>
  )
}
export default CreateAccount