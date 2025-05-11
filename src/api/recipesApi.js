import { CATALOG_LIMIT } from '../const';
import mockData from './mock/recipes.json';
import axios, { useMockData } from './default';
import { getAuthorizationHeader } from './utils';

export const recipesFetch = async (options = {}) => {
  const params = {
    limit: CATALOG_LIMIT,
    page: 1,
    ...options,
  };
  if (useMockData) {
    return mockData;
  }

  const response = await axios.get('/recipes', { params });
  return response.data;
};

export const recipesDetailFetch = async id => {
  if (useMockData) {
    return mockData.items.find(r => r.id === id || r._id === id) || null;
  }
  const response = await axios.get(`/recipes/${id}`);
  return response.data;
};

export const addRecipeToFavorites = async (token, recipeId) => {
  const { data } = await axios.post(
    `/recipes/${recipeId}/favorite`,
    {},
    {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
    }
  );
  return data;
};

export const getFavoritesApi = async token => {
  const response = await axios.get('/recipes/favorites', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};

export const recipeAdd = async (token, data = {}) => {
  const response = await axios.post('/recipes', data, {
    headers: {
      Authorization: getAuthorizationHeader(token),
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const popularRecipesFetch = async () => {
  if (useMockData) {
    return mockData.items.slice(0, 4); // Наприклад, топ-4 рецепти
  }
  const response = await axios.get('/recipes/popular');
  return response.data;
};

export const deleteRecipeFromApi = async ({ token, recipeId }) => {
  if (useMockData) {
    console.log(`Mock delete recipe ${recipeId}`);
    return { id: recipeId };
  }

  await axios.delete(`/recipes/${recipeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { id: recipeId };
};

export const removeRecipeFromFavorites = async ({ token, recipeId }) => {
  if (useMockData) {
    console.log(`Mock remove from favorites: ${recipeId}`);
    return { id: recipeId };
  }

  await axios.delete(`/recipes/${recipeId}/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { id: recipeId };
};
