import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";

const initialState = null;

const authSlice = createSlice({
  name: "cart",
  user: initialState,
  status: statusCode.idle,

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

export const createUser = createAsyncThunk("users/create", async (data) => {
  const res = await api.post("/users", data);
  if (res.data) {
    return res.data;
  }
});

export const {} = authSlice.actions;

export default authSlice.reducer;
