import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";

const initialState = {
  data: {},
  status: statusCode.idle,
  relatedProducts: [],
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

    builder
      .addCase(getProductsByCategory.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.relatedProducts = action?.payload?.filter(
          (item) => item.id !== state.data.id
        );
      });
  },
});

export const getProductDetails = createAsyncThunk(
  "productDetails/get",
  async (id) => {
    try {
      const response = await api.get("/product");

      return response.data.find((product) => product.id === id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "productByCategory/get",
  async (category) => {
    try {
      const response = await api.get("/product");

      return response.data.filter((product) => product.category === category);
    } catch (error) {
      console.error(error);
    }
  }
);

export default productDetailsSlice.reducer;
