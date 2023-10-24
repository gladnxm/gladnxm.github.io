import { configureStore, createSlice } from '@reduxjs/toolkit'
import { db } from './firebase'
import { doc, updateDoc } from 'firebase/firestore'
// 6은 테이블 갯수

function handleCartItem(state, action, quantity) {
  const { item, tableNumber } = action.payload
  const cart = state.cart[tableNumber]
  const itemIndex = cart.findIndex(el=>el.title === item.title)
  
  if (itemIndex === -1) { // 없는 품목 새로추가
    cart.push(item)
    return
  }
  if (quantity === null) { // 삭제     
    cart.splice(itemIndex, 1)
    return
  }
  const updateItem = {
    ...cart[itemIndex],
    count: cart[itemIndex].count + quantity,
    totalPrice: cart[itemIndex].pricePerPiece * (cart[itemIndex].count + quantity)
  }
  if (updateItem.count <= 0) return 
  // 남은 수량 1이면 -시 0되는데 0이면 갱신안하고 무시. 즉 1에서 더 줄어들지 않는 효과
  cart[itemIndex] = updateItem
}

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
      handleCartItem(state, action, 1);
    },
    plusCount(state, action) {
      handleCartItem(state, action, 1);
    },
    minusCount(state, action) {
      handleCartItem(state, action, -1);
    },
    removeItem(state, action) {
      handleCartItem(state, action, null);
    },
    addOrderList(state, action) {
      console.log("addorder 실행")
      const { cart, tableNumber } = action.payload
      let orderList = state.orderList[tableNumber]
      const tempOrderList = [...orderList, ...cart]
      const merged = {}

      tempOrderList.forEach(item => {
        const title = item.title;  
        if (merged[title]) {
          merged[title].count += item.count;
          merged[title].totalPrice += item.totalPrice;
        }
        else 
          merged[title] = item;        
      })

      //orderState바꾸기 : 이로직 잘되면 밑에 setorede에 넣고 주문하는 페이지에서 setorede추가호출하는 방식으로가자
      cart.forEach(item => state.orderStatus[tableNumber].push(`${item.title} -- ${item.count}개`)) 
      state.cart[tableNumber] = [] // 장바구니 비우기
      state.orderList[tableNumber] = Object.values(merged) //주문내역 갱신
      updateDoc(
        doc(db, "OrderState", `${tableNumber}`),
        { list: [...state.orderStatus[tableNumber]] }
      )
      alert("주문완료됨")
    }
  }
})

export const { 
  addItemToCart, 
  plusCount, 
  minusCount, 
  removeItem,
  addOrderList
} = tableInfo.actions

export default configureStore({
  reducer: { 
    tableInfo: tableInfo.reducer
  }
})