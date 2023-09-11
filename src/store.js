import { configureStore, createSlice } from '@reduxjs/toolkit'
import AllMenu from './AllMenu'
// 6은 테이블 갯수임

const tableInfo = createSlice({
  name: 'tableInfo',
  initialState: {
    cart: Array(6).fill([]),
    orderList: Array(6).fill([]),
    orderStatus: Array(6).fill([]),
  },
  reducers: {
    addItemToCart(state, action) {
      alert('장바구니에 담겼습니다 .5초후에 팝업창 사라지는거로 개선예정')
      const { item, tableNumber } = action.payload
      let currentCart = state.cart[tableNumber]
      const exist = currentCart.find(el=>el.title === item.title)
      const existIndex = currentCart.findIndex(el=>el.title === item.title)
      if (exist) {
        currentCart[existIndex] = {
          ...exist,
          count: exist.count+1,
          totalPrice: exist.pricePerPiece * (exist.count+1)
        }          
      } else {
        currentCart.push(item)
      }
    },
    plusCount(state, action) {
      const { item, tableNumber } = action.payload
      const cart = state.cart[tableNumber]
      const exist = cart.find(el=>el.title === item.title)
      const existIndex = cart.findIndex(el=>el.title === item.title)
      cart[existIndex] = {
        ...exist,
        count: exist.count+1,
        totalPrice: exist.pricePerPiece * (exist.count+1)
      }      
    },
    minusCount(state, action) {
      const { item, tableNumber } = action.payload
      const cart = state.cart[tableNumber]
      const exist = cart.find(el=>el.title === item.title)
      if(exist.count <= 1) return
      const existIndex = cart.findIndex(el=>el.title === item.title)
      cart[existIndex] = {
        ...exist,
        count: exist.count-1,
        totalPrice: exist.pricePerPiece * (exist.count-1)
      }      
    },
    removeItem(state, action) {
      const { item, tableNumber } = action.payload
      const cart = state.cart[tableNumber]
      const removeIndex = cart.findIndex(el=>el.title === item.title)
      cart.splice(removeIndex, 1)
    }
  }
})
export const { addItemToCart, plusCount, minusCount, removeItem } = tableInfo.actions

/*
const cart = createSlice({ 
  name : 'cart',
  initialState : Array(6).fill([]),
  reducers: {
    addItemInCart(state, action) {
      alert('장바구니에 담겼습니다 .5초후에 팝업창 사라지는거로 개선예정')
      const { item, tableNumber } = action.payload
      const exist = state[tableNumber].find(el=>el.title === item.title)
      const existIndex = state[tableNumber].findIndex(el=>el.title === item.title)
      if (exist) {
        state[tableNumber][existIndex] = {
          ...exist,
          count: exist.count+1,
          totalPrice: exist.pricePerPiece * (exist.count+1)
        }          
      } else {
        state[tableNumber].push(item)
      }
    },
    plusCount(state, action) {
      const { item, tableNumber } = action.payload
      const exist = state[tableNumber].find(el=>el.title === item.title)
      const existIndex = state[tableNumber].findIndex(el=>el.title === item.title)
      state[tableNumber][existIndex] = {
        ...exist,
        count: exist.count+1,
        totalPrice: exist.pricePerPiece * (exist.count+1)
      }      
    },
    minusCount(state, action) {
      const { item, tableNumber } = action.payload
      const exist = state[tableNumber].find(el=>el.title === item.title)
      if(exist.count <= 1) return
      const existIndex = state[tableNumber].findIndex(el=>el.title === item.title)
      state[tableNumber][existIndex] = {
        ...exist,
        count: exist.count-1,
        totalPrice: exist.pricePerPiece * (exist.count-1)
      }      
    },
    removeItem(state, action) {
      const { item, tableNumber } = action.payload
      const removeIndex = state[tableNumber].findIndex(el=>el.title === item.title)
      state[tableNumber].splice(removeIndex, 1)
    }
  }
})

const orderList = createSlice({ // 주문목록
  name : 'orderList',
  initialState : Array(6).fill([]),
  reducers: {

  }
})

const orderStatus = createSlice({ // 주문현황
  name : 'orderStatus',
  initialState : Array(6).fill([])
})

손님이 주문하면 새주문내역이 만들어짐 
주문판에 먼저 반영되고 이후에 주문목록에 추가되는데
겹치는 품목은 개수만 늘어나는 식으로
*/

export default configureStore({
  reducer: { 
    // cart: cart.reducer,
    // orderList: orderList.reducer,
    // orderStatus: orderStatus.reducer,
    tableInfo: tableInfo.reducer
  }
})