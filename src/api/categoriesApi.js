import mockData from './mock/categories.json';
import axios, { useMockData } from './default';

export const categoriesFetch = async (options = {}) => {
  const params = {
    ...options,
  };
  if (useMockData) {
    return mockData;
  }

  const response = await axios.get('/categories', {
    params,
  });
  return response.data;
};
