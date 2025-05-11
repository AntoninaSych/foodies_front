import axios from './default';
import { getAuthorizationHeader } from './utils.js';

export const fetchFollowersApi = async token => {
  const { data } = await axios.get('/users/followers', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const fetchFollowingApi = async token => {
  const { data } = await axios.get('/users/following', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const followUserApi = async (userId, token) => {
  const { data } = await axios.post(
    `/users/${userId}/follow`,
    {},
    {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
    }
  );
  return data;
};

export const unfollowUserApi = async (userId, token) => {
  const { data } = await axios.delete(`/users/${userId}/follow`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};
