import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: null,
};

const globalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modal = action.payload; // 'signIn'
    },
    closeModal: state => {
      state.modal = null;
    },
  },
});

export const { openModal, closeModal } = globalSlice.actions;
export default globalSlice.reducer;
