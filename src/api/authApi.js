import axios from './default';
import { getAuthorizationHeader } from './utils';

export const usersSignup = async user => {
  const { data } = await axios.post('/auth/register', user);
  return data;
};

export const usersLogin = async user => {
  const { data } = await axios.post('/auth/login', user);
  return data;
};

export const usersLogout = async token => {
  await axios.post(
    '/auth/logout',
    {},
    {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
    }
  );
};

export const fetchCurrentUser = async token => {
  const { data } = await axios.get('/auth/current', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};
