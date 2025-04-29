import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.user = null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, handleRejected)
  },
});


export const userReducer = userSlice.reducer;
