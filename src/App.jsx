import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import OrderList from './pages/OrderList.jsx';
import OrderStatus from './admin-pages/OrderStatus.jsx';
import Cart from './pages/Cart.jsx'
import EditMenu from './admin-pages/EditMenu.jsx';
import Book from './member-pages/Book';
import CreateAccount from './pages/create-account';
import Chat from './pages/Chat';
import Payment from './admin-pages/Payment.jsx';
import Login from './pages/login';
import Admin from './admin-pages/Admin.jsx';

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
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/edit' element={<EditMenu/>}/>
      <Route path='/book' element={<Book/>}/>
    </Routes>
  )
}
export default App