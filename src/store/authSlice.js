import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  status: statusCode.idle,
};

export const signIn = createAsyncThunk("auth/signIn", async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    if (res.data) {
      // toast.success("Login successful");
      console.log("test res user :", res.data);
      return res.data;
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to sign in!");
    throw error;
  }
});

export const refreshToken = createAsyncThunk("auth/refresh", async () => {
  try {
    const res = await api.post("/auth/refresh-token");
    if (res.data) {
      toast.success("Token refreshed");
      return res.data;
    }
  } catch (error) {
    toast.error("Session expired. Please log in again.");
    throw error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await api.post("/auth/logout");
    if (res.data) {
      // toast.success("Logged out successfully");
      return res.data;
    }
  } catch (error) {
    toast.error("Failed to log out!");
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = statusCode.idle;
      });
  },
});

export default authSlice.reducer;
