import { createAsyncThunk } from "@reduxjs/toolkit";
import { ingredientsFetch } from "../../api/ingredientsApi.js";
import {handleError} from "../utils";


export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (options = {}, {rejectWithValue }) => {
    try {
      return await ingredientsFetch({
        ...options,
      });
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

