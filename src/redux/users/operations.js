import { createAsyncThunk } from '@reduxjs/toolkit';
// import { handleError } from '../utils';
import { currentUserDetailFetch, usersFetch } from '../../api/usersApi';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await usersFetch(token);
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'users/fetchCurrent',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await currentUserDetailFetch(token);
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);
