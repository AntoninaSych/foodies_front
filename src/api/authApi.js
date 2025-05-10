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
  const res = await fetch(`/api/users/follow/${userId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Failed to follow user');
  return await res.json();
};

export const unfollowUserApi = async (token, userId) => {
  const res = await fetch(`/api/users/unfollow/${userId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Failed to unfollow user');
  return await res.json();
};

export const getUserDetailsApi = async (token, userId) => {
  const response = await axios.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
