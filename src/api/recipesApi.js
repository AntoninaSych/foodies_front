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

  const response = await axios.get('/recipes', {
    params,
  });
  return response.data;
};

export const recipesDetailFetch = async id => {
  if (useMockData) {
    return mockData['items'][0];
  }
  const response = await axios.get(`/recipes/${id}`);
  return response.data;
};

export const addRecipeToFavorites = async recipeId => {
  const { data } = await axios.post(`/recipes/${recipeId}/favorite`);
  return data;
};

export const removeRecipeFromFavorites = async recipeId => {
  const { data } = await axios.delete(`/recipes/${recipeId}/favorite`);
  return data;
};

export const getFavoritesApi = async () => {
  const response = await axios.get('/favorites');
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
