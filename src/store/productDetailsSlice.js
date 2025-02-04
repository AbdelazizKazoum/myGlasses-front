import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";

const initialState = {
  data: {},
  status: statusCode.idle,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.data = action.payload;
      });
  },
});

export const getProductDetails = createAsyncThunk(
  "productDetails/get",
  async (id) => {
    try {
      const response = await api.get("http://localhost:5000/product");

      return response.data.find((product) => product.id === id);
    } catch (error) {
      console.error(error);
    }
  }
);

export default productDetailsSlice.reducer;
