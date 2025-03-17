import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

const initialState = {
  stockHistory: [],
  stock: [],
  pagination: {
    total: null,
    totalPages: null,
  },
  status: statusCode.idle,
};

export const filterHistory = createAsyncThunk(
  "stock/history",
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const {
        searchInput = "",
        type = "",
        reason = "",
        supplierId = "",
        productDetailId = "",
        sortByDate = "",
      } = filters;

      const { page = 1, limit = 10 } = pagination;

      const res = await api.get(
        `/stock-movement/filter?searchInput=${searchInput}&type=${type}&reason=${reason}&supplierId=${supplierId}&productDetailId=${productDetailId}&page=${page}&limit=${limit}&sortByDate=${sortByDate}`
      );

      return res.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load stock history!"
      );
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterHistory.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(filterHistory.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.stockHistory = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(filterHistory.rejected, (state) => {
        state.status = statusCode.failure;
      });
  },
});

export default stockSlice.reducer;
