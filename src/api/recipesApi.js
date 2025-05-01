import { CATALOG_LIMIT } from '../const';
import mockData from './mock/recipes.json';
import axios, { useMockData } from './default';

// recipes

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
