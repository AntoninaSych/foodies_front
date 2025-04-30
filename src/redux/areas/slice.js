import { createSlice } from '@reduxjs/toolkit';
import { fetchAreas } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
};

const areasSlice = createSlice({
  name: 'areas',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAreas.pending, handlePending)
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAreas.rejected, handleRejected);
  },
});

export const areasReducer = areasSlice.reducer;
