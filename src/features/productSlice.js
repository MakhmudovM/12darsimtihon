import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        state.items.push({ ...action.payload, amount: 1 });
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseAmount: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.amount += 1;
      }
    },
    decreaseAmount: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product && product.amount > 1) {
        product.amount -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const { addProduct, removeProduct, increaseAmount, decreaseAmount } = productSlice.actions;
export default productSlice.reducer;
