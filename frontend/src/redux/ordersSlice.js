import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orderList.unshift(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orderList.find((item) => item.id === orderId);

      if (order) {
        order.status = status;
      }
    },
  },
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export const selectOrderList = (state) => state.orders.orderList;

export default ordersSlice.reducer;