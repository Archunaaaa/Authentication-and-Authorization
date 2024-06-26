import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user; // Assuming action.payload contains user data
      state.message = 'Login successful!';
    },
    loginFailure: (state, action) => {
      state.error = action.payload.error;
      state.message = null;
    },
    registerRequest: (state) => {
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user; // Assuming action.payload contains user data
      state.message = 'User registered successfully!';
    },
    registerFailure: (state, action) => {
      state.error = action.payload.error;
      state.message = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure } = authSlice.actions;

// Async action creators

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:8080/api/auth/user/login', userData);
    const { data } = response;
    if (data.status === 0) {
      dispatch(loginFailure({ error: data.error.message }));
    } else {
      const { token, user } = data;
      localStorage.setItem('token', token);
      dispatch(loginSuccess({ user }));
    }
  } catch (error) {
    if (error.response) {
      dispatch(loginFailure({ error: `Error: ${error.response.data.message}` }));
    } else if (error.request) {
      dispatch(loginFailure({ error: 'Error: No response received from server.' }));
    } else {
      dispatch(loginFailure({ error: 'Error: Something went wrong while sending the request.' }));
    }
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post('http://localhost:8080/api/auth/user/register', userData);
    const { data } = response;
    if (data.status === 0) {
      dispatch(registerFailure({ error: data.error.message }));
    } else {
      const { token, user } = data;
      localStorage.setItem('token', token);
      dispatch(registerSuccess({ user }));
    }
  } catch (error) {
    if (error.response) {
      dispatch(registerFailure({ error: `Error: ${error.response.data.message}` }));
    } else if (error.request) {
      dispatch(registerFailure({ error: 'Error: No response received from server.' }));
    } else {
      dispatch(registerFailure({ error: 'Error: Something went wrong while sending the request.' }));
    }
  }
};

export default authSlice.reducer;
