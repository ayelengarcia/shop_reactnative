import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      user: "userIdLogged",
      updateAt: new Date().toLocaleString(),
      total: null,
      items: [],
    },
  },
  reducers: {
    //payload es la informacion que llega
    addCartItem: (state, { payload }) => {
      const productRepeated = state.value.items.find(
        (item) => item.id === payload.id
      );
      if (productRepeated) {
        const itemsUpdated = state.value.items.map((item) => {
          if (item.id === payload.id) {
            item.quantity += payload.quantity;
            return item;
          }
          return item;
        });
        const total = itemsUpdated.reduce(
          (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
          0
        );
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          updateAt: new Date().toLocaleString(),
        };
      } else {
        state.value.items.push(payload);
        const total = state.value.items.reduce(
          (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
          0
        );
        state.value = {
          ...state.value,
          total,
          updateAt: new Date().toLocaleString(),
        };
      }
    },
    removeOneCartItem: (state, { payload }) => {
      const itemsUpdated = state.value.items
        .map((item) => {
          if (item.id === payload.id) {
            if (item.quantity > 1) {
              item.quantity -= 1;
            } else {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null);

      const total = itemsUpdated.reduce(
        (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
        0
      );

      state.value = {
        ...state.value,
        items: itemsUpdated,
        total,
        updateAt: new Date().toLocaleString(),
      };
    },
    //sin usar - agregas - 1 + para sumar y restar en CartItem
    //Borra todo el item
    removeCartItem: (state, { payload }) => {
      const itemsUpdated = state.value.items.filter(
        (item) => item.id !== payload.id
      );
      const total = itemsUpdated.reduce(
        (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
        0
      );
      state.value = {
        ...state.value,
        items: itemsUpdated,
        total,
        updateAt: new Date().toLocaleString(),
      };
    },
  },
});

export const { addCartItem, removeCartItem, removeOneCartItem } = cartSlice.actions;

export default cartSlice.reducer;
