import { configureStore, createSlice } from '@reduxjs/toolkit'
// 6은 테이블 갯수임
const cart = createSlice({ // 장바구니
  name : 'cart',
  initialState : Array(6).fill([])
})
const orderList = createSlice({ // 주문목록
  name : 'orderList',
  initialState : Array(6).fill([])
})
const orderStatus = createSlice({ // 주문현황
  name : 'orderStatus',
  initialState : Array(6).fill([])
})
/*
손님이 주문하면 새주문내역이 만들어짐 
주문현황에 먼저 반영되고 이후에 주문목록에 추가되는데
겹치는거있으면 수량만 늘어나는 식으로
*/
export default configureStore({
  reducer: { 
    cart: cart.reducer,
    orderList: orderList.reducer,
    orderStatus: orderStatus.reducer,
  }
})