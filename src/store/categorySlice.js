import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

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

export const createCategory = createAsyncThunk(
  "categories/add",
  async (data) => {
    try {
      const res = await api.post("/category", data);
      toast.success("Category created successfully");

      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category !");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ formData, id }) => {
    try {
      const res = await api.patch(`/category/${id}`, formData);
      toast.success("Category updated successfully");

      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to updated category !");
    }
  }
);

export default categoriesSlice.reducer;
