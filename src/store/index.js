import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../features/counter/CounterSlice";
import ShopReducer from "../features/shop/ShopSlice";
import { shopApi } from "../services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    shop: ShopReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(shopApi.middleware)
});

setupListeners(store.dispatch);

export default store;