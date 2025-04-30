import { createSlice } from '@reduxjs/toolkit';
import { fetchTestimonials } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTestimonials.pending, handlePending)
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTestimonials.rejected, handleRejected);
  },
});

export const testimonialsReducer = testimonialsSlice.reducer;
