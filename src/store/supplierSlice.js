import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

// Initial state for the supplier slice
const initialState = {
  suppliers: [],
  supplier: null,
  status: statusCode.idle,
};

// Async thunk to fetch all suppliers
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/supplier`);

      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load suppliers!"
      );
      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load suppliers!"
      );
    }
  }
);

// Async thunk to fetch a single supplier by ID
export const fetchSupplierById = createAsyncThunk(
  "suppliers/fetchSupplierById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/suppliers/${id}`);
      return res.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load supplier!"
      );
    }
  }
);

// Async thunk to create a new supplier
export const createSupplier = createAsyncThunk(
  "suppliers/createSupplier",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/supplier", formData);
      toast.success("Supplier added successfully");
      return res.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      toast.error("Erreur lors de l'ajout du fournisseur.");

      return rejectWithValue(
        error?.response?.data?.message || "Failed to add supplier!"
      );
    }
  }
);

// Async thunk to update an existing supplier
export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/supplier/${id}`, formData);
      toast.success("Supplier updated successfully");
      return res.data;
    } catch (error) {
      toast.error("Failed to update supplier!");

      console.log("🚀 ~ error:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update supplier!"
      );
    }
  }
);

// Async thunk to delete a supplier
export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/supplier/${id}`);
      toast.success("Supplier removed successfully");
      return id;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      toast.success(
        error?.response?.data?.message || "Failed to remove supplier!"
      );

      return rejectWithValue(
        error?.response?.data?.message || "Failed to remove supplier!"
      );
    }
  }
);

// Supplier slice
const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.suppliers = action.payload;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSuppliers.rejected, (state) => {
        state.status = statusCode.failure;
      })

      .addCase(fetchSupplierById.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(fetchSupplierById.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.supplier = action.payload;
      })
      .addCase(fetchSupplierById.rejected, (state) => {
        state.status = statusCode.failure;
      })

      .addCase(createSupplier.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.suppliers.push(action.payload); // Add newly created supplier
      })
      .addCase(createSupplier.rejected, (state) => {
        state.status = statusCode.failure;
      })

      .addCase(updateSupplier.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.status = statusCode.success;
        const index = state.suppliers.findIndex(
          (supplier) => supplier.id === action.payload.id
        );
        if (index !== -1) {
          state.suppliers[index] = action.payload; // Update the supplier in the list
        }
      })
      .addCase(updateSupplier.rejected, (state) => {
        state.status = statusCode.failure;
      })

      .addCase(deleteSupplier.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier.id !== action.payload
        ); // Remove the deleted supplier from the list
      })
      .addCase(deleteSupplier.rejected, (state) => {
        state.status = statusCode.failure;
      });
  },
});

export default supplierSlice.reducer;
