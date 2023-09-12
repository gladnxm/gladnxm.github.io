// 학습 자료로 남겨둠


const tableInfo = createSlice({
  name: 'tableInfo',
  initialState: {
    cart: Array(6).fill([]),
    orderList: Array(6).fill([]),
    orderStatus: Array(6).fill([]),
  },
  reducers: {
    addItemToCart(state, action) {
      alert('장바구니에 담겼습니다. 5초 후에 팝업창이 사라집니다. 개선 예정입니다.');
      // this.plusCount(state, action)
      const { item, tableNumber } = action.payload;
      state.cart[tableNumber] = updateCartItem(state.cart[tableNumber], item, 1);
    },
    plusCount(state, action) {
      const { item, tableNumber } = action.payload;
      state.cart[tableNumber] = updateCartItem(state.cart[tableNumber], item, 1);
    },
    minusCount(state, action) {
      const { item, tableNumber } = action.payload;
      state.cart[tableNumber] = updateCartItem(state.cart[tableNumber], item, -1);
    },
    removeItem(state, action) {
      const { item, tableNumber } = action.payload;
      const cart = state.cart[tableNumber];
      const updatedCart = cart.filter((cartItem) => cartItem.title !== item.title);
      state.cart[tableNumber] = updatedCart;
    },
  },
});

// 공통 함수로 아이템 업데이트 로직을 분리
function updateCartItem(cart, item, quantityChange) {
  const existIndex = cart.findIndex((el) => el.title === item.title);

  if (existIndex !== -1) { // 없으면-1이니까 있는경우 이미 존재하는 경우를 의미
    const updatedItem = {
      ...cart[existIndex],
      count: cart[existIndex].count + quantityChange,
    };

    if (updatedItem.count <= 0) {
      // 수량이 0 이하인 경우, 제거
      cart.splice(existIndex, 1);
    } else {
      // 수량이 1 이상인 경우, 업데이트
      updatedItem.totalPrice = updatedItem.pricePerPiece * updatedItem.count;
      cart[existIndex] = updatedItem;
    }
  } else if (quantityChange === 1) { //없는품목인데, 퀀티티 1 들어온 경우 고대로추가
    // 새로운 아이템 추가
    cart.push({
      ...item,
      count: 1,
      totalPrice: item.pricePerPiece,
    });
  }

  return [...cart]; // 새로운 배열을 반환하여 불변성 유지
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
      alert('장바구니에 담겼습니다. 5초 후에 팝업창이 사라집니다. 개선 예정입니다.');
      const { item, tableNumber } = action.payload;
      const cart = state.cart[tableNumber];
      const updatedCart = updateCartItem(cart, item, 1);
      state.cart[tableNumber] = updatedCart;
    },
    plusCount(state, action) {
      const { item, tableNumber } = action.payload;
      const cart = state.cart[tableNumber];
      const updatedCart = updateCartItem(cart, item, 1);
      state.cart[tableNumber] = updatedCart;
    },
    minusCount(state, action) {
      const { item, tableNumber } = action.payload;
      const cart = state.cart[tableNumber];
      const updatedCart = updateCartItem(cart, item, -1);
      state.cart[tableNumber] = updatedCart;
    },
    removeItem(state, action) {
      const { item, tableNumber } = action.payload;
      const cart = state.cart[tableNumber];
      const updatedCart = cart.filter((cartItem) => cartItem.title !== item.title);
      state.cart[tableNumber] = updatedCart;
    },
  },
});

// 업데이트 함수를 더 간단하게 만들기
function updateCartItem(cart, item, quantityChange) {
  const cartIndex = cart.findIndex((el) => el.title === item.title);

  if (cartIndex !== -1) {
    const updatedItem = { ...cart[cartIndex], count: cart[cartIndex].count + quantityChange };

    if (updatedItem.count <= 0) {
      // 수량이 0 이하이면 제거
      return cart.filter((cartItem) => cartItem.title !== item.title);
    }

    updatedItem.totalPrice = updatedItem.pricePerPiece * updatedItem.count;
    cart[cartIndex] = updatedItem;
  } else if (quantityChange === 1) {
    // 새로운 아이템 추가
    cart.push({ ...item, count: 1, totalPrice: item.pricePerPiece });
  }

  return [...cart]; // 새로운 배열을 반환하여 불변성 유지
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
      handleCartItem(state, action, 1);
    },
    plusCount(state, action) {
      handleCartItem(state, action, 1);
    },
    minusCount(state, action) {
      handleCartItem(state, action, -1);
    },
    removeItem(state, action) {
      const { item, tableNumber } = action.payload;
      state.cart[tableNumber] = state.cart[tableNumber].filter(
        (cartItem) => cartItem.title !== item.title
      );
    },
  },
});

function handleCartItem(state, action, quantityChange) {
  const { item, tableNumber } = action.payload;
  const cart = state.cart[tableNumber];

  const cartIndex = cart.findIndex((el) => el.title === item.title);

  if (cartIndex !== -1) {
    const updatedItem = { ...cart[cartIndex], count: cart[cartIndex].count + quantityChange };

    if (updatedItem.count <= 0) {
      // 수량이 0 이하이면 제거
      state.cart[tableNumber] = cart.filter((cartItem) => cartItem.title !== item.title);
    } else {
      updatedItem.totalPrice = updatedItem.pricePerPiece * updatedItem.count;
      cart[cartIndex] = updatedItem;
    }
  } else if (quantityChange === 1) {
    // 새로운 아이템 추가
    cart.push({ ...item, count: 1, totalPrice: item.pricePerPiece });
  }
}
