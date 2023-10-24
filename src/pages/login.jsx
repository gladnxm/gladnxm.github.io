import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form } from '../components/auth-components'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"


function Login() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onSubmit = async e => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password) 
    navigate(`/${tableNumber}`)
  }
  return (
    <>
    <Form action="#" onSubmit={onSubmit}>
      <label htmlFor="email">이메일</label>
      <input
        required
        id="email" 
        name="email"
        type="email" 
        value={email} 
        placeholder='이메일' 
        onChange={e=>setEmail(e.target.value)} 
      />
      <label htmlFor="password">비밀번호</label>
      <input 
        required
        id="password"
        name="password"
        type="password" 
        value={password} 
        placeholder='비밀번호' 
        onChange={e=>setPassword(e.target.value)} 
      />
      <button type='submit'>로그인</button>
      <button type='button' onClick={()=>navigate(`/${tableNumber}`)}>비회원으로 접속</button>
      <p onClick={()=>navigate(`/${tableNumber}/create-account`)}>계정이 없다면? 가입하기</p>
      <p>가입하면 어떤 혜택이 있나요?</p>
    </Form>
    </>
  )
}
export default Login