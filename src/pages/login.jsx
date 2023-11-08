import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Wrapper } from '../components/auth-components'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import styled from 'styled-components'
import { FormStyle } from "../style"

const Form = styled.form`
  ${FormStyle}
  & > button {    
    margin-top: 10px;
  }  
  footer {
    margin-top: 100px;
    button {
      width: 50%;
    }
  }
`
const Footer =styled.footer`
  display: flex;
  width: 100%;
`

function Login() {
  let { tableNumber } = useParams()
  tableNumber = parseInt(tableNumber)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async e => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password) 
    auth.currentUser.uid === "YRq79gnxhNPtneqJ5khwzvHiXRs1"
    ? navigate("/admin")
    : navigate(`/${tableNumber}`)    
  }
  const nonMemberAccess = async() => {
    if(auth.currentUser) await auth.signOut()
    navigate(`/${tableNumber}`)
  }

  return (
    <Wrapper>
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
      <Footer>
        <button type='button' onClick={() => navigate(`/${tableNumber}/create-account`)}>회원 가입</button>
        <button type='button' onClick={nonMemberAccess}>비회원 접속</button> 
      </Footer>
    </Form>
    </Wrapper>
  )
}
export default Login