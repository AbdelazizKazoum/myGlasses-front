import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

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

//
// Create new product
export const createProduct = createAsyncThunk(
  "products/new",
  async (formData) => {
    try {
      const res = await api.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("🚀 ~ res:", res);

      if (res.data) {
        toast.success("Product created successfully");
        return res.data;
      }
    } catch (error) {
      toast.error(" Faild to create this product !  ");
    }
  }
);

// Create new product
export const updadeProduct = createAsyncThunk(
  "products/edit",
  async ({ formData, id }) => {
    try {
      const res = await api.patch(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("🚀 ~ res:", res);

      if (res.data) {
        toast.success("Product updated successfully");
        return res.data;
      }
    } catch (error) {
      toast.error(" Faild to update this product !  ");
    }
  }
);

export const { filterByCategory } = productsSlice.actions;

export default productsSlice.reducer;
