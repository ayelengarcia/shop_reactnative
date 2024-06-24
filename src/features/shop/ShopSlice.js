import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categorySelected: "",
    itemSelected: "",
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
    },
    setItemSelected: (state, {payload}) => {
      state.itemSelected = payload
    },
  },
});

export const {setCategorySelected, setItemSelected} = shopSlice.actions;

export default shopSlice.reducer;
