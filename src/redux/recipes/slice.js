import { createSlice } from '@reduxjs/toolkit';
import {
  fetchRecipes,
  addToFavorites,
  removeFromFavorites,
} from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
  state.total = 0;
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    total: 0,
    favorites: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        const { recipes, totalItems } = action.payload;
        state.items = recipes;
        state.total = totalItems;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRecipes.rejected, handleRejected)

      .addCase(addToFavorites.fulfilled, (state, action) => {
        const updatedRecipe = action.payload;
        const index = state.items.findIndex(
          item => item.id === updatedRecipe.id
        );
        if (index !== -1) {
          state.items[index].isFavorite = true;
        }
      })

      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        const updatedRecipe = action.payload;
        const index = state.items.findIndex(
          item => item.id === updatedRecipe.id
        );
        if (index !== -1) {
          state.items[index].isFavorite = false;
        }
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
