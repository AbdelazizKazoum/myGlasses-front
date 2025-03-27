import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  supplierOrders: [],
  selectedSupplierOrder: null,
  status: statusCode.idle,
  pagination: {
    total: null,
    totalPages: null,
  },
};

// Fetch all supplier orders
export const getSupplierOrders = createAsyncThunk(
  "supplierOrders/getAll",
  async () => {
    try {
      const res = await api.get("/supplier-order");
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch supplier orders");
      throw error;
    }
  }
);

// Get filtered supplier orders
export const getFilteredSupplierOrders = createAsyncThunk(
  "supplierOrders/filter",
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const {
        status = "",
        supplier = "",
        startDate = "",
        endDate = "",
        totalMin = "",
        totalMax = "",
        sortBy = "createdAt",
        sortOrder = "DESC",
      } = filters;

      const { page = 1, limit = 10 } = pagination;

      const queryParams = new URLSearchParams({
        status,
        supplier,
        sortBy,
        sortOrder,
        startDate,
        endDate,
        page,
        limit,
        totalMin,
        totalMax,
      });

      const res = await api.get(
        `/supplier-order/filter?${queryParams.toString()}`
      );
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load filtered supplier orders"
      );
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to load filtered supplier orders"
      );
    }
  }
);

// Get a single supplier order
export const getSupplierOrder = createAsyncThunk(
  "supplierOrders/getOne",
  async (id) => {
    try {
      const res = await api.get(`/supplier-order/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch supplier order");
      throw error;
    }
  }
);

// Create a new supplier order
export const createSupplierOrder = createAsyncThunk(
  "supplierOrders/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/supplier-order", formData);
      toast.success("Supplier Order created successfully");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data.message ?? "Failed to create supplier order"
      );
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete a supplier order
export const deleteSupplierOrder = createAsyncThunk(
  "supplierOrders/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/supplier-order/${id}`);
      toast.success("Supplier Order deleted successfully");
      return id;
    } catch (error) {
      toast.error(
        error.response?.data.message || "Failed to delete supplier order"
      );
      return rejectWithValue(
        error.response?.data || "Failed to delete supplier order"
      );
    }
  }
);

// Update a supplier order
export const updateSupplierOrder = createAsyncThunk(
  "supplierOrders/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/supplier-order/${id}`, data);
      toast.success("Supplier Order updated successfully");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to update supplier order"
      );
      return rejectWithValue(
        error.response?.data || "Failed to update supplier order"
      );
    }
  }
);

// Supplier Orders Slice
const supplierOrderSlice = createSlice({
  name: "supplierOrder",
  initialState,
  reducers: {
    setSeletedSupplierOrder(state, action) {
      state.selectedSupplierOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupplierOrders.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(getSupplierOrders.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.supplierOrders = action.payload;
      })
      .addCase(getSupplierOrders.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(getSupplierOrder.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(getSupplierOrder.fulfilled, (state, action) => {
        state.status = statusCode.success;
      })
      .addCase(getSupplierOrder.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(createSupplierOrder.fulfilled, (state, action) => {
        state.supplierOrders.push(action.payload);
      })
      .addCase(deleteSupplierOrder.fulfilled, (state, action) => {
        state.supplierOrders = state.supplierOrders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(getFilteredSupplierOrders.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(getFilteredSupplierOrders.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(getFilteredSupplierOrders.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.supplierOrders = action.payload.data;
        state.pagination = action.payload.pagination;
      });
  },
});

export const { setSeletedSupplierOrder } = supplierOrderSlice.actions;

export default supplierOrderSlice.reducer;
