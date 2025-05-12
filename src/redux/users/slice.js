import { createSlice } from '@reduxjs/toolkit';
import { fetchFollowers, fetchFollowing, unfollow, follow } from './operations';

const handleFollowersRejected = (state, action) => {
  state.error = action.payload;
  state.followers = [];
};
const handleFollowingRejected = (state, action) => {
  state.error = action.payload;
  state.following = [];
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    following: [],
    followers: [],
    error: null,
  },
  reducers: {
    clearFollowing(state) {
      state.following = [];
    },
    clearFollowers(state) {
      state.followers = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
        state.error = null;
      })
      .addCase(fetchFollowers.rejected, handleFollowersRejected)
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
        state.error = null;
      })
      .addCase(fetchFollowing.rejected, handleFollowingRejected)
      .addCase(unfollow.fulfilled, (state, action) => {
        state.following = state.following.filter(
          item => item.id !== action.payload
        );
      })
      .addCase(follow.fulfilled, (state, action) => {
        const userId = action.payload;
        const foundFollowUser = state.following.find(
          item => item.id === userId
        );

        if (!foundFollowUser) {
          state.following.push({ id: userId });
        }
      });
  },
});

export const { clearFollowers, clearFollowing } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
