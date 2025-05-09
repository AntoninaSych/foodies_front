import { createSlice } from '@reduxjs/toolkit';
import {
  fetchRecipes,
  addToFavorites,
  removeFromFavorites,
  getFavoriteRecipes,
} from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRecipesRejected = (state, action) => {
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
  reducers: {
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        const { items, total } = action.payload;
        state.items = items;
        state.total = total;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRecipes.rejected, handleRecipesRejected)

      .addCase(addToFavorites.fulfilled, (state, action) => {
        const recipeId = action.payload;
        const foundFavoriteRecipe = state.favorites.find(
          item => item.id === recipeId
        );

        if (!foundFavoriteRecipe) {
          state.favorites.push({ id: recipeId });
        }
      })
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })

      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        const recipeId = action.payload;
        state.favorites = state.favorites.filter(item => item.id !== recipeId);
      });
  },
});

export const { clearFavorites } = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
