import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const { items } = action.payload;
        state.items = items;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, handleRejected)
  },
});

export const categoriesReducer = categoriesSlice.reducer;
