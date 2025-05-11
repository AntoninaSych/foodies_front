import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';
import { fetchUserDetails } from './operations';
import axiosAPI from '../../api/default';

const initialState = {
  user: null,
  userDetails: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authorizationCase = (state, action) => {
  const { token, user } = action.payload;
  if (token) {
    state.user = user;
    state.token = token;
    state.isLoggedIn = true;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, authorizationCase)
      .addCase(register.fulfilled, authorizationCase)
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(fetchUserDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        if (state.userDetails?.following) {
          state.userDetails.following.push(userId);
        }
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        if (state.userDetails?.following) {
          state.userDetails.following = state.userDetails.following.filter(
            id => id !== userId
          );
        }
      });
  },
});

export const fetchFollowers = createAsyncThunk(
  'user/fetchFollowers',
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue('User ID is required to fetch followers');
      }

      const res = await axiosAPI.get(`/users/${userId}/followers`);

      if (res.data && res.data.followers) {
        return res.data.followers;
      } else if (Array.isArray(res.data)) {
        return res.data;
      } else {
        return [];
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch followers'
      );
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  'user/fetchFollowing',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.get('/users/following');

      if (res.data && res.data.response) {
        return res.data.response;
      } else if (Array.isArray(res.data)) {
        return res.data;
      } else {
        return [];
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch following list'
      );
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.post(`/users/${userId}/follow`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to follow user'
      );
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      console.log(`Sending unfollow request for user ${userId}`);
      const res = await axiosAPI.post(`/users/${userId}/unfollow`);
      console.log('Unfollow response:', res.data);
      return {
        userId,
        response: res.data,
      };
    } catch (err) {
      console.error('Error in unfollowUser action:', err.response || err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to unfollow user'
      );
    }
  }
);

export default authSlice.reducer;
