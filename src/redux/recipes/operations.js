import { createAsyncThunk } from '@reduxjs/toolkit';
import { recipesFetch } from '../../api/recipesApi';
import { handleError } from '../utils';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchAll',
  async (options = {}, { rejectWithValue }) => {
    try {
      return await recipesFetch({
        ...options,
      });
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
