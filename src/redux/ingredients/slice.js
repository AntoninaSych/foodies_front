import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, handlePending)
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, handleRejected)
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
