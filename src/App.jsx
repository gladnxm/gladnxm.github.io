import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart.jsx'
import Chat from './pages/Chat';
import Login from './pages/login';
import CreateAccount from './pages/create-account';
import OrderList from './pages/OrderList.jsx';
import Book from './member-pages/Book';
import Admin from './admin-pages/Admin.jsx';
import EditMenu from './admin-pages/EditMenu.jsx';
import Payment from './admin-pages/Payment.jsx';

function App() {
  //언마운트시 로그아웃하는 유즈이펙트 만들기
  return (
    <Routes>
      <Route path='/' element={
        <>
          <p><Link to='/0/login'>1번테이블의 qr </Link></p>
          <p><Link to='/1/login'>2번테이블 qr </Link></p>
          <p><Link to='/2/login'>3번테이블 qr</Link></p>
        </>
      } />
      <Route path='/:tableNumber' element={<Home/>}/>
      <Route path='/:tableNumber/cart' element={<Cart/>}/>
      <Route path='/:tableNumber/chat' element={<Chat/>}/>
      <Route path='/:tableNumber/payment' element={<Payment/>}/>
      <Route path='/:tableNumber/login' element={<Login/>}/>
      <Route path='/:tableNumber/orderList' element={<OrderList/>}/>
      <Route path='/:tableNumber/create-account' element={<CreateAccount/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/edit' element={<EditMenu/>}/>
      <Route path='/book' element={<Book/>}/>
    </Routes>
  )
}
export default App