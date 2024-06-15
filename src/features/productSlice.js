import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // массив продуктов
  price: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increaseAmount: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.amount += 1;
        productsSlice.caseReducers.calculateTotal(state);
      }
    },
    decreaseAmount: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product && product.amount > 0) {
        product.amount -= 1;
        productsSlice.caseReducers.calculateTotal(state);
      }
    },
    calculateTotal: (state) => {
      let totalPrice = 0;
      state.products.forEach((product) => {
        totalPrice += product.price * product.amount;
      });
      state.price = totalPrice;
    },
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        state.products.push({ ...action.payload, amount: 1 });
      }
      productsSlice.caseReducers.calculateTotal(state);
    },
    // Другие экшены...
  },
});

export const {
  increaseAmount,
  decreaseAmount,
  calculateTotal,
  addProduct,
  // Другие экшены...
} = productsSlice.actions;

export default productsSlice.reducer;
