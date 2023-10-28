import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import OrderList from './pages/OrderList.jsx';
import OrderStatus from './pages/OrderStatus';
import Cart from './pages/Cart.jsx'
import EditMenu from './pages/EditMenu';
import Book from './member-pages/Book';
import CreateAccount from './pages/create-account';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Payment from './pages/Payment';
function App() {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <p><Link to='/0/login'>1번테이블의 qr </Link></p>
          <p><Link to='/1/login'>2번테이블 qr </Link></p>
          <p><Link to='/2/login'>3번테이블 qr</Link></p>
          <p><Link to='/admin'>어드민 </Link></p>
          <p><Link to='/edit'>메뉴수정 </Link></p>
          <p><Link to='/book'>도감 </Link></p>
          <p><Link to='/Login'>로그인 </Link></p>
        </>
      } />
      <Route path='/:tableNumber' element={<Home/>}/>
      <Route path='/:tableNumber/cart' element={<Cart/>}/>
      <Route path='/:tableNumber/chat' element={<Chat/>}/>
      <Route path='/:tableNumber/payment' element={<Payment/>}/>
      <Route path='/:tableNumber/login' element={<Login/>}/>
      <Route path='/:tableNumber/orderList' element={<OrderList/>}/>
      <Route path='/:tableNumber/create-account' element={<CreateAccount/>}/>
      <Route path='/admin' element={<OrderStatus/>}/>
      <Route path='/edit' element={<EditMenu/>}/>
      <Route path='/book' element={<Book/>}/>
    </Routes>
  )
}
export default App