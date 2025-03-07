import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";

const initialState = {
  data: [],
  filteredProducts: [],
  status: statusCode.idle,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory(state, action) {
      state.filteredProducts = state.data.filter(
        (item) => item.category === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.data = action.payload;
      });
  },
});

export const getProducts = createAsyncThunk("products/get", async () => {
  const res = await api.get("/product");
  if (res.data) {
    return res.data;
  }
});

export const { filterByCategory } = productsSlice.actions;

export default productsSlice.reducer;
