import mockData from './mock/users.json';
import axios, { useMockData } from './default';
import { getAuthorizationHeader } from './utils';

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

export const updateAvatar = async (token, data) => {
  const response = await axios.patch(`/users/avatars`, data, {
    headers: {
      Authorization: getAuthorizationHeader(token),
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
