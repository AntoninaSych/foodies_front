import mockData from './mock/ingredients.json';
import axios, { useMockData } from './default';

export const ingredientsFetch = async (options = {}) => {
  const params = {
    ...options,
  };
  if (useMockData) {
    return mockData;
  }

  const response = await axios.get('/ingredients', {
    params,
  });
  return response.data;
};
