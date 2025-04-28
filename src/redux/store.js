import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/slice";
import { recipesReducer } from "./recipes/slice";
import { categoriesReducer } from "./categories/slice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipesReducer,
    categories: categoriesReducer,
  },
});

