import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchFollowersApi,
  fetchFollowingApi,
  followUserApi,
  unfollowUserApi,
} from '../../api/followsApi.js';

export const fetchFollowers = createAsyncThunk(
  'follows/fetchFollowers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await fetchFollowersApi(token);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      return rejectWithValue(msg);
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  'follows/fetchFollowing',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await fetchFollowingApi(token);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      return rejectWithValue(msg);
    }
  }
);

export const followUser = createAsyncThunk(
  'follows/followUser',
  async (userId, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      await followUserApi(userId, token);
      dispatch(fetchFollowing());
      return userId;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      return rejectWithValue(msg);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'follows/unfollowUser',
  async (userId, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      await unfollowUserApi(userId, token);
      dispatch(fetchFollowing());
      return userId;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      return rejectWithValue(msg);
    }
  }
);
