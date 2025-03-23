import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";

const initialState = {
  data: [],
  filteredProducts: [],
  status: statusCode.idle,
  pagination: {
    total: null,
    totalPages: null,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory(state, action) {
      state.filteredProducts = state.data.filter(
        (item) => item.category === action.payload
      );
    },
  },
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

    builder
      .addCase(getFilterdProducts.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getFilterdProducts.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getFilterdProducts.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      });
  },
});

export const getProducts = createAsyncThunk("products/get", async () => {
  const res = await api.get("/product");
  if (res.data) {
    return res.data;
  }
});

export const searchDetailProductByName = createAsyncThunk(
  "products/searchDetail",
  async (searchInput, { rejectWithValue }) => {
    const res = await api.get(`/detail-product/search/${searchInput}`);
    return res.data;
  }
);

export const getFilterdProducts = createAsyncThunk(
  "products/filter",
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const {
        searchInput,
        brand,
        gender,
        priceRange,
        category,
        rating,
        priceSort,
      } = filters;

      const { page = 1, limit = 10 } = pagination;

      let cat = "category=&";

      if (category && category.length > 0) {
        category.forEach((item) => {
          cat = cat + `category=${item}&`;
        });
      } else {
        cat = "&";
      }

      const res = await api.get(
        `/product/filter?searchInput=${searchInput}&gender=${gender}&priceRange=${priceRange}&${cat}&brand=${brand}&rating=${rating}&page=${page}&limit=${limit}&priceSort=${priceSort}`
      );
      console.log("🚀 ~ filter products :", res);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load products !"
      );
    }
  }
);

export const { filterByCategory } = productsSlice.actions;

export default productsSlice.reducer;
