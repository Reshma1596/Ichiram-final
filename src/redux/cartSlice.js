import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;

      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { id, quantity: 1 };
      }
    },

    incrementItem: (state, action) => {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id].quantity += 1;
      }
    },

    decrementItem: (state, action) => {
      const id = action.payload;

      if (!state.items[id]) return;

      state.items[id].quantity -= 1;

      if (state.items[id].quantity <= 0) {
        delete state.items[id];
      }
    },

    removeItem: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },

    clearCart: (state) => {
      state.items = {};
    },
  },

  selectors: {
    selectCartItems: (state) => state.items,
    selectCartCount: (state) =>
      Object.values(state.items).reduce(
        (total, item) => total + item.quantity,
        0
      ),
  },
});

export const {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const { selectCartItems, selectCartCount } = cartSlice.selectors;

export const selectItemQuantity = (state, id) =>
  state.cart.items[id]?.quantity || 0;

export const selectSubtotal = (state, menuData) =>
  Object.values(state.cart.items).reduce((total, item) => {
    const product = menuData.find((p) => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  export const selectCartList = (state) => Object.values(state.cart.items);


export default cartSlice.reducer;