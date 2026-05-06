import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";
import menuReducer from "./menuSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    menu: menuReducer,
  },
});

export default store;