import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchCurrentUser } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
  state.user = 'error';
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    user: 'initial state user',
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
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(action.payload, 'slice case');
      });
  },
});

export const usersReducer = usersSlice.reducer;
