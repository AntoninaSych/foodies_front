
import mockData from "./mock/testimonials.json";
import axios, {useMockData} from './default'

export const testimonialsFetch = async (options = {}) => {
  const params = {
    ...options,
  };
  if (useMockData) {
    return mockData;
  }

  const response = await axios.get("/testimonials", {
    params,
  });
  return response.data;
};

