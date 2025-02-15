import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  status: statusCode.idle,
  loading: false,
  error: null,
};

export const addAddress = createAsyncThunk(
  "user/addAddress",
  async ({ userId, addressData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/${userId}/address`, addressData);
      return response.data; // return the new address data
    } catch (error) {
      return rejectWithValue(error.response.data); // return the error message
    }
  }
);

export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ addressId, updatedAddressData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/users/address/${addressId}`,
        updatedAddressData
      );
      return response.data; // return the updated address data
    } catch (error) {
      return rejectWithValue(error.response.data); // return the error message
    }
  }
);

export const removeAddress = createAsyncThunk(
  "user/removeAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/address/${addressId}/remove`);
      return response.data; // return the removed address data
    } catch (error) {
      toast.error("Failed to remove Address");
      return rejectWithValue(error.response.data); // return the error message
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    addAddressItem(state, action) {
      if (state.user) {
        state.user.addressList.unshift(action.payload);
      }
    },

    removeAddressItem(state, action) {
      if (state.user) {
        state.user.addressList = state.user.addressList.filter(
          (item) => item.id !== action.payload
        );

        if (action.payload === state.user.primaryAddress.id) {
          state.user.primaryAddress = state.user.addressList[0] || {}; // set a new primary address
        }
      }
    },

    editAddressItem(state, action) {
      if (state.user) {
        state.user.addressList = state.user.addressList.map((item) => {
          if (action.payload.id === item.id) {
            return { ...item, ...action.payload };
          }
          return item;
        });
      }
    },

    setPrimaryAddress(state, action) {
      if (state.user) {
        state.user.primaryAddress = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Add address async actions
    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.addressList.unshift(action.payload);
          state.user.primaryAddress = action.payload; // set the new address as primary
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // error handling
      });

    // Update address async actions
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          const updatedAddress = action.payload;
          state.user.addressList = state.user.addressList.map((item) =>
            item.id === updatedAddress.id ? updatedAddress : item
          );
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // error handling
      });

    // Remove address async actions
    builder
      .addCase(removeAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          const removedAddressId = action.payload.id;
          state.user.addressList = state.user.addressList.filter(
            (item) => item.id !== removedAddressId
          );
          // If the removed address was the primary address, set a new primary address
          if (removedAddressId === state.user.primaryAddress.id) {
            state.user.primaryAddress = state.user.addressList[0] || {}; // or null if no address left
          }
        }
      })
      .addCase(removeAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // error handling
      });
  },
});

export const {
  setUser,
  addAddressItem,
  removeAddressItem,
  editAddressItem,
  setPrimaryAddress,
} = userSlice.actions;

export default userSlice.reducer;
