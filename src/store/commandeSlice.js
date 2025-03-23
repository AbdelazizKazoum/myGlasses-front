import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

const initialState = {
  commands: [],
  status: statusCode.idle,
  pagination: {
    total: null,
    totalPages: null,
  },
};

// Fetch all commandes
export const getCommandes = createAsyncThunk("commandes/getAll", async () => {
  try {
    const res = await api.get("/commande");
    return res.data;
  } catch (error) {
    toast.error("Failed to fetch commandes");
    throw error;
  }
});

// Get filtered commands
export const getFilterdCommands = createAsyncThunk(
  "commandes/filter",
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const {
        searchInput = "",
        status = "",
        paymentStatus = "",
        userId = "",
        sortByDate = "DESC",
        startDate = "",
        endDate = "",
        totalMin = "",
        totalMax = "",
      } = filters;

      const { page = 1, limit = 10 } = pagination;

      const queryParams = new URLSearchParams({
        searchInput,
        status,
        paymentStatus,
        userId,
        sortByDate,
        startDate,
        endDate,
        totalMin,
        totalMax,
        page,
        limit,
      });

      const res = await api.get(`/commande/filter?${queryParams.toString()}`);
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load filtered commandes"
      );
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load filtered commandes"
      );
    }
  }
);

export const getLatestCommands = createAsyncThunk(
  "commandes/latest",
  async () => {
    try {
      const res = await api.get("/commande/latest");
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch commandes");
      return null;
    }
  }
);

export const getCommande = createAsyncThunk("commandes/getOne", async (id) => {
  try {
    const res = await api.get(`/commande/${id}`);
    return res.data;
  } catch (error) {
    toast.error("Failed to fetch commande");
    throw error;
  }
});

export const createCommande = createAsyncThunk(
  "commandes/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/commande", formData);
      toast.success("Commande created successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data.message ?? "Failed to create commande");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteCommande = createAsyncThunk(
  "commandes/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/commande/${id}`);
      toast.success("Commande deleted successfully");
      return id;
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to delete commande");
      return rejectWithValue(
        error.response?.data || "Failed to delete commande"
      );
    }
  }
);

export const updateCommande = createAsyncThunk(
  "commandes/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/commande/${id}`, data);
      toast.success("Commande updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to update commande");
      return rejectWithValue(
        error.response?.data || "Failed to update commande"
      );
    }
  }
);

const commandeSlice = createSlice({
  name: "commande",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommandes.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(getCommandes.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.commands = action.payload;
      })
      .addCase(getCommandes.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(getCommande.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(getCommande.fulfilled, (state, action) => {
        state.status = statusCode.success;
      })
      .addCase(getCommande.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(createCommande.fulfilled, (state, action) => {
        state.commands.push(action.payload);
      })
      .addCase(deleteCommande.fulfilled, (state, action) => {
        state.commands = state.commands.filter(
          (cmd) => cmd.id !== action.payload
        );
      })
      .addCase(getFilterdCommands.pending, (state) => {
        state.status = statusCode.pending;
      })
      .addCase(getFilterdCommands.rejected, (state) => {
        state.status = statusCode.failure;
      })
      .addCase(getFilterdCommands.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.commands = action.payload.data;
        state.pagination = action.payload.pagination;
      });
  },
});

export default commandeSlice.reducer;
