import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoriesFetch } from "../../api/categoriesApi";
import {handleError} from "../utils";


export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (options = {}, {rejectWithValue }) => {
    try {
      return await categoriesFetch({
        ...options,
      });
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

