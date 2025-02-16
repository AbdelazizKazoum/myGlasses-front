import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  status: statusCode.idle,
};

export const registerUser = createAsyncThunk("users/register", async (data) => {
  try {
    const res = await api.post("/auth/register", data);

    if (res.data) {
      toast.success("User registered successfully");
      return res.data;
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to register user!");
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }) => {
    try {
      const res = await api.patch(`/users/${id}`, data);
      if (res.data) {
        toast.success("User updated successfully");
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user!");
      throw error;
    }
  }
);

export const removeUser = createAsyncThunk("users/remove", async (id) => {
  try {
    await api.delete(`/users/${id}`);
    toast.success("User removed successfully");
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to remove user!");
    throw error;
  }
});

// fetching all users
export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
  try {
    const res = await api.get("/users");
    if (res.data) {
      return res.data; // Return the list of users
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch users!");
    throw error;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = statusCode.success;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(removeUser.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(removeUser.rejected, (state) => {
        state.status = statusCode.failure;
      })
      // Handle the fetchAllUsers action
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = statusCode.success;

        state.users = action.payload; // Replace the existing users with the fetched ones
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.status = statusCode.failure;
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
