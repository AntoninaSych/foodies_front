import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
} from './operations';

const initialState = {
  followers: [],
  following: [],
  loading: false,
  error: null,
};

const followsSlice = createSlice({
  name: 'follows',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFollowers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.followers = payload;
      })
      .addCase(fetchFollowers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(fetchFollowing.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.following = payload;
      })
      .addCase(fetchFollowing.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(followUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.following.push(payload);
      })
      .addCase(followUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(unfollowUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state, { payload: userId }) => {
        state.loading = false;
        state.following = state.following.filter(u => u.id !== userId);
      })
      .addCase(unfollowUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const followsReducer = followsSlice.reducer;
