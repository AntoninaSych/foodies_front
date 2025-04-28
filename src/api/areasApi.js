
import mockData from "./mock/areas.json";
import axios, {useMockData} from './default'

export const areasFetch = async (options = {}) => {
  const params = {
    ...options,
  };
  if (useMockData) {
    return mockData;
  }

  const response = await axios.get("/areas", {
    params,
  });
  return response.data;
};
