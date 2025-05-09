import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    modal: null,
  },
  reducers: {
    showModal(state, action) {
      state.modal = action.payload;
    },
    closeModal(state) {
      state.modal = null;
    },
  },
});

export const { showModal, closeModal } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
