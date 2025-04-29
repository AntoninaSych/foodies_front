import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRecipes.rejected, handleRejected)
  },
});


export const recipesReducer = recipesSlice.reducer;
