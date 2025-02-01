import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import { productsList } from "../eyesomeData";
import api from "../lib/api";

const initialState = {
  data: [],
  status: statusCode.idle,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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

//
// Create new product
export const createProduct = createAsyncThunk(
  "products/get",
  async (formData) => {
    const res = await api.post("/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("🚀 ~ res:", res);

    if (res.data) {
      return res.data;
    }
  }
);

export default productsSlice.reducer;
