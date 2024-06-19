import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state.items[existingProductIndex].amount += 1;
      } else {
        state.items.push({ ...action.payload, amount: 1 });
      }
    },
    decreaseAmount: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (existingProductIndex !== -1) {
        if (state.items[existingProductIndex].amount > 1) {
          state.items[existingProductIndex].amount -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
    increaseAmount: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (existingProductIndex !== -1) {
        state.items[existingProductIndex].amount += 1;
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addProduct, decreaseAmount, increaseAmount, removeProduct } = productSlice.actions;
export default productSlice.reducer;
