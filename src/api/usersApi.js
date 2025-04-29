
import mockUserData from "./mock/users.json";
import axios, {useMockData} from './default'
import {getAuthorizationHeader} from "./utils";

export const fetchCurrentUser = async (id, options = {}) => {
  const params = {
    ...options,
  };
  if (useMockData) {
    return mockUserData[0];
  }

  const response = await axios.get(`/users/${id}`, {
    params,
    headers: {
      Authorization: getAuthorizationHeader(),
    }
  });
  return response.data;
};

