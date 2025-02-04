import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gender: "All",
  priceRange: 4999,
  category: [],
  rating: "",
  priceSort: "",
  searchInput: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateGender(state, action) {
      state.gender = action.payload;
    },

    updatePriceRange(state, action) {
      state.priceRange = action.payload;
    },

    initializeCategory(state, action) {
      state.category = [];
    },

    addCategory(state, action) {
      if (!state.category?.includes(action.payload)) {
        state.category.push(action.payload);
      }
    },

    removeCategory(state, action) {
      state.category = state.category.filter((item) => item !== action.payload);
    },

    updateRating(state, action) {
      state.rating = action.payload;
    },

    updatePriceSort(state, action) {
      state.priceSort = action.payload;
    },

    clearFilters(state, action) {
      return initialState;
    },

    updateSearchInput(state, action) {
      state.searchInput = action.payload;
    },
  },
});

export const {
  updateGender,
  updatePriceRange,
  addCategory,
  initializeCategory,
  removeCategory,
  updateRating,
  updatePriceSort,
  clearFilters,
  updateSearchInput,
} = filtersSlice.actions;

export default filtersSlice.reducer;
