import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

const initialState = {
  commands: [],
  status: statusCode.idle,
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

// Fetch all commandes
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

// Fetch a single commande by ID
export const getCommande = createAsyncThunk("commandes/getOne", async (id) => {
  try {
    const res = await api.get(`/commande/${id}`);
    return res.data;
  } catch (error) {
    toast.error("Failed to fetch commande");
    throw error;
  }
});

// Create a new commande
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

// Delete a commande by ID
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

// Delete a commande by ID
export const updateCommande = createAsyncThunk(
  "commandes/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/commande/${id}`, data);
      toast.success("Commande updated successfully");
      return res.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);

      toast.error(
        error.response?.data?.message ?? "Failed to updated commande"
      );
      return rejectWithValue(
        error.response?.data || "Failed to updated commande"
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
      });
  },
});

export default commandeSlice.reducer;
