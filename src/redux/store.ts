import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import cartReducer from "./carts/cartSlice";
import productReducer from "./product/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
