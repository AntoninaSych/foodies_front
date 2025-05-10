import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    modal: null,
    modalOptions: {},
  },
  reducers: {
    showModal(state, action) {
      if (typeof action.payload === 'object') {
        const { modal, ...options } = action.payload;
        state.modal = modal;
        state.modalOptions = options;
      } else {
        state.modal = action.payload;
      }
    },
    closeModal(state) {
      state.modal = null;
    },
  },
});

export const { showModal, closeModal } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
