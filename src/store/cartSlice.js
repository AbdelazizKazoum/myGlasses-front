import { createSlice } from "@reduxjs/toolkit";

// Retrieve cart from localStorage or initialize an empty array
const cartData = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = cartData;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action) {
      const newState = [...state, action.payload];
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },

    removeCartItem(state, action) {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },

    emptyCart() {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    },

    increaseCartItemCount(state, action) {
      const newState = state.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },

    decreaseCartItemCount(state, action) {
      const newState = state.map((item) =>
        item.id === action.payload && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  emptyCart,
  decreaseCartItemCount,
  increaseCartItemCount,
} = cartSlice.actions;

export default cartSlice.reducer;
