import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
<<<<<<< HEAD:frontend/src/redux/store.js
import ordersReducer from "./ordersSlice";
=======
>>>>>>> b1146eb29a053387bd66764c879e87ddb19d5c3a:src/redux/store.js

const store = configureStore({
  reducer: {
    cart: cartReducer,
<<<<<<< HEAD:frontend/src/redux/store.js
        orders: ordersReducer,
=======
>>>>>>> b1146eb29a053387bd66764c879e87ddb19d5c3a:src/redux/store.js
  },
});

export default store;