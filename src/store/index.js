import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../features/counter/CounterSlice";
import ShopReducer from "../features/shop/ShopSlice";

export default configureStore({
  reducer: {
    counter: CounterReducer,
    shop: ShopReducer,
  },
});