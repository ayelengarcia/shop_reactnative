import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../features/counter/CounterSlice";

export default configureStore({
  reducer: {
    counter: CounterReducer,
  },
});