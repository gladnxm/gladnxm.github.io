import { configureStore, createSlice } from '@reduxjs/toolkit'
import AllMenu from './AllMenu'
// 6은 테이블 갯수임
const cart = createSlice({ // 장바구니
  name : 'cart',
  initialState : Array(6).fill([]),
  reducers: {
    addItemInCart(state, action) {
      const { item, tableNumber } = action.payload
      console.log(item)
      state[tableNumber].push(item)
    },
    // 이미담긴품목 담으면 개수만 늘어나야함 지금은 똑같은거 2 3개 됨
    plusCount(state, action) {

    },
    minusCount(state, action) {

    },
    removeItem(state, action) {

    }
  }
})
export const { addItemInCart, plusCount, minusCount, removeItem } = cart.actions

const orderList = createSlice({ // 주문목록
  name : 'orderList',
  initialState : Array(6).fill([]),
  
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

// const clickedItem = createSlice({ 
//   name : 'clickedItem',
//   initialState : {},
//   reducers: {
//     changeClickedItem(state, action) {
//       const category = action.payload.currentCategory
//       const title = action.payload.title
//       return AllMenu[category].find(el=>el.title === title)
//     }
//   }
// })
// export const { changeClickedItem } = clickedItem.actions

export default configureStore({
  reducer: { 
    cart: cart.reducer,
    orderList: orderList.reducer,
    orderStatus: orderStatus.reducer,
    // clickedItem: clickedItem.reducer
  }
})