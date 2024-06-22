import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    message: '',
    error: '',
  },
  reducers: {
    loginRequest: (state, action) => {},
    loginSuccess: (state, action) => {
      state.message = action.payload;
      state.error = '';
    },
    loginFailure: (state, action) => {
      state.message = '';
      state.error = action.payload;
    },
    registerRequest: (state, action) => {},  // Add registerRequest here
    registerSuccess: (state, action) => {
      state.message = action.payload;
      state.error = '';
    },
    registerFailure: (state, action) => {
      state.message = '';
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure } = authSlice.actions;

export default authSlice.reducer;
