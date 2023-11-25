import { configureStore, createSlice } from '@reduxjs/toolkit'
import { db } from './firebase'
import { doc, setDoc, updateDoc } from 'firebase/firestore'

const tableInfo = createSlice({
  name: 'tableInfo',
  initialState: {
    cart: [],
    orderList: [],
    orderStatus: [],
    totalAmount: 0,
    tableNumber: null
  },
  reducers: {
    controlQuantity(state, action) {
      const cart = state.cart
      const { item, quantity } = action.payload
      const itemIndex = cart.findIndex(el => el.title === item.title)
      
      if (itemIndex === -1) { // 없는 품목 새로추가
        cart.push(item)
        return
      }
      if (quantity === null) { // 삭제     
        cart.splice(itemIndex, 1)
        return
      }
      const updateItem = {
        ...item,
        count: item.count + quantity,
        totalPrice: item.pricePerPiece * (item.count + quantity)
      }
      if (updateItem.count <= 0) return 
      // 남은 수량 1이면 -시 0되는데 0이면 갱신안하고 무시. 즉 1에서 더 줄어들지 않는 효과
      cart[itemIndex] = updateItem
    },    
    addOrderList(state) {
      const tempOrderList = [...state.orderList, ...state.cart]
      const merged = {}

      //주문하면 orderList 갱신하기
      tempOrderList.forEach(item => {
        const title = item.title;  
        if (merged[title]) {
          merged[title].count += item.count;
          merged[title].totalPrice += item.totalPrice;
        }
        else 
          merged[title] = item;        
      })
      state.orderList = Object.values(merged)

      //orderStatus 갱신하기
      state.cart.forEach(item => state.orderStatus.push(`${item.title} : ${item.count}개`)) 
      updateDoc(
        doc(db, "OrderState", `${state.tableNumber}`),
        { 'list': state.orderStatus }
      );      

      state.cart = [] 
      alert("주문 완료")
    },
    updateTableOrderList(state) {
      const list = state.orderList.map(item => `${item.title}:${item.count}:${item.totalPrice}`)        
      const totalAmount = state.orderList.reduce((acc, cur) => acc + cur.totalPrice, 0)        
      updateDoc(
        doc(db, "TableOrderList", `${state.tableNumber}`),
        { 'list': list, 'totalAmount': totalAmount }
      )
    },    
    setTotalAmount(state, action) { state.totalAmount += action.payload },
    setTableNumber(state, action) { state.tableNumber = action.payload  },
  }
})

export const { 
  controlQuantity,
  addOrderList,
  updateTableOrderList,
  setTotalAmount,
  setTableNumber  
} = tableInfo.actions

const adminInfo = createSlice({
  name: 'adminInfo',
  initialState: {
    daySales: 0,
    month: 0,
    day: 0
  },
  reducers: {
    clearTable(state, action) {
      const { tableNumber } = action.payload
      updateDoc( doc(db, "Check",          `${tableNumber}`), { "on": true } )
      updateDoc( doc(db, "Chatting",       `${tableNumber}`), { "list": [] } )
      updateDoc( doc(db, "OrderState",     `${tableNumber}`), { "list": [] } )
      updateDoc( doc(db, "TableOrderList", `${tableNumber}`), { "list": [], "totalAmount": 0 } )
      alert("테이블 초기화")
    },
    updateSales(state, action) {
      state.daySales += action.payload
      setDoc(
        doc(db, "Sales", `${state.month}`),
        { [`${state.day}`]: state.daySales }
      )
    },
    setMonth(state, action) { state.month = action.payload },
    setDay(state, action)   { state.day = action.payload }
  }
})

export const { 
  updateSales,
  setMonth,
  setDay,
  clearTable
} = adminInfo.actions

export default configureStore({
  reducer: { 
    tableInfo: tableInfo.reducer,
    adminInfo: adminInfo.reducer
  }
})