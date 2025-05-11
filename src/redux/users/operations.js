import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCurrentUserFollowers,
  fetchCurrentUserFollowing,
  followUserApi,
  unfollowUserApi,
} from '../../api/authApi';
import { handleError } from '../utils';

export const fetchFollowers = createAsyncThunk(
  'users/fetchFollowers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await fetchCurrentUserFollowers(token);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  'users/fetchFollowing',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await fetchCurrentUserFollowing(token);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const unfollow = createAsyncThunk(
  'users/unfollow',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      await unfollowUserApi(token, userId);
      return userId;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const follow = createAsyncThunk(
  'users/follow',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      await followUserApi(token, userId);
      return userId;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
