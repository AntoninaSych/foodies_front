import mockData from './mock/users.json';
import axios, { useMockData } from './default';
import { getAuthorizationHeader } from './utils';

export const usersFetch = async token => {
  if (useMockData) {
    return mockData;
  }

  const response = await axios.get('/users', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};

export const userDetailFetch = async (token, id) => {
  if (useMockData) {
    return mockData['items'][0];
  }
  const response = await axios.get(`/users/${id}`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};

export const currentUserDetailFetch = async token => {
  if (useMockData) {
    return mockData['items'][0];
  }
  const response = await axios.get(`/users/current_details`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};
