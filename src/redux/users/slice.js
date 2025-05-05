import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchCurrentUser } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, handleRejected)
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, handleRejected);
  },
});

export const usersReducer = usersSlice.reducer;
