import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/slice";
import { recipesReducer } from "./recipes/slice";
import { categoriesReducer } from "./categories/slice";
import { areasReducer } from "./areas/slice";
import { ingredientsReducer } from "./ingredients/slice";
import { testimonialsReducer } from "./testimonials/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // recipesReducer is probably not needed, we should call endpoint directly from recipesApi on a particular page
    recipes: recipesReducer,
    categories: categoriesReducer,
    areas: areasReducer,
    ingredients: ingredientsReducer,
    testimonials: testimonialsReducer,
  },
});
