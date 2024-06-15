// Измененный пользовательский хук useCollection
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

function useCollection(currentCollection, userParams) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let q;
    if (userParams[2]) {
      q = query(collection(db, currentCollection), where(...userParams));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        setData(tasks)
      })
      return unsubscribe; // Отписываемся от слушателя при размонтировании компонента
    }
  }, [currentCollection, userParams[2]])

  return { data };
}

export { useCollection }

// Измененный срез Redux productSlice
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
