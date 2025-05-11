import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from './recipes/slice';
import { categoriesReducer } from './categories/slice';
import { areasReducer } from './areas/slice';
import { ingredientsReducer } from './ingredients/slice';
import { testimonialsReducer } from './testimonials/slice';
import { commonReducer } from './common/slice';
import { authReducer } from './auth/slice';
import { usersReducer } from './users/slice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
    common: commonReducer,
    recipes: recipesReducer,
    users: usersReducer,
    categories: categoriesReducer,
    areas: areasReducer,
    ingredients: ingredientsReducer,
    testimonials: testimonialsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
