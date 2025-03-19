import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

const initialState = {
  data: {},
  status: statusCode.idle,
  accessoires: [],
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
        state.relatedProducts = action?.payload;
      });

    builder
      .addCase(getAccessoires.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getAccessoires.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getAccessoires.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.accessoires = action?.payload;
      });
  },
});

export const getProductDetails = createAsyncThunk(
  "productDetails/get",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/product/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch products !"
      );
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "productByCategory/get",
  async (category, { rejectWithValue }) => {
    console.log("🚀 ~ category:", category);

    try {
      const response = await api.get(`/product/category/${category}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("failed to fetch products with this caregory");
    }
  }
);

export const getAccessoires = createAsyncThunk(
  "productByCategory/accessoires",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/detail-product/category/Accessoires`);

      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);

      return rejectWithValue("failed to fetch products with this category");
    }
  }
);

export const getQuantityInStock = createAsyncThunk(
  "stock/getQty",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/detail-product/stock/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue("failed to fetch qty");
    }
  }
);

// Write a review on the product
export const writeReview = createAsyncThunk(
  "review/write",
  async (review, { rejectWithValue }) => {
    try {
      const res = await api.post("/review", review);
      toast.success("Review submitted successfully!");

      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to write a review !"
      );
      return rejectWithValue("Failed to write a review ");
    }
  }
);

export default productDetailsSlice.reducer;
