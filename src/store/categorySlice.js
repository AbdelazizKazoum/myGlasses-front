import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";

const initialState = {
  data: [],
  status: statusCode.idle,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.data = action.payload;
      });
  },
});

export const getCategories = createAsyncThunk("categories/get", async () => {
  const res = await api.get("/category");
  if (res.data) {
    return res.data;
  }
});

export default categoriesSlice.reducer;
