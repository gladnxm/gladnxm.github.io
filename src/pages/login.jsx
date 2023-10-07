import { Link, useParams } from 'react-router-dom'

function Login() {
  const onSubmit = () => {

  }

  return (
    <>
    <form action="#" onSubmit={onSubmit}>
      <input type="email" />
      <input type="password" />
    </form>
    <p>계정이 없다면?</p>
    <Link to="">가입하기</Link>
    <button>비회원 주문하기</button>
    </>
  )
}