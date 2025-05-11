import axios from './default';
import { getAuthorizationHeader } from './utils';

export const usersSignup = async user => {
  const { data } = await axios.post('/users/register', user);
  return data;
};

export const usersLogin = async user => {
  const { data } = await axios.post('/users/login', user);
  return data;
};

export const usersLogout = async token => {
  await axios.post(
    '/users/logout',
    {},
    {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
    }
  );
};

export const fetchCurrentUser = async token => {
  const { data } = await axios.get('/users/current', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const followUserApi = async (token, userId) => {
  const { data } = await axios.post(
    `/users/${userId}/follow`,
    {},
    {
      headers: { Authorization: getAuthorizationHeader(token) },
    }
  );

  return data;
};

export const unfollowUserApi = async (token, userId) => {
  const { data } = await axios.delete(`/users/${userId}/follow`, {
    headers: { Authorization: getAuthorizationHeader(token) },
  });

  return data;
};

export const fetchCurrentUserFollowers = async (token, options = {}) => {
  const params = {
    ...options,
  };
  const { data } = await axios.get('/users/followers', {
    params,
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const fetchCurrentUserFollowing = async (token, options = {}) => {
  const params = {
    ...options,
  };
  const { data } = await axios.get('/users/following', {
    params,
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const fetchUserFollowers = async (token, userId) => {
  const { data } = await axios.get(`/users/${userId}/followers`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};
