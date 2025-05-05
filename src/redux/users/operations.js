import { createAsyncThunk } from '@reduxjs/toolkit';
// import { handleError } from '../utils';
import {
  currentUserDetailFetch,
  userDetailFetch,
  usersFetch,
} from '../../api/usersApi';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: { token },
    } = getState();

    try {
      return await usersFetch(token);
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'users/fetchCurrent',
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: { token },
    } = getState();

    try {
      return await currentUserDetailFetch(token);
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id, { rejectWithValue, getState }) => {
    const {
      auth: { token },
    } = getState();
    try {
      return await userDetailFetch(token, id);
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);
