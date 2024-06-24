import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    message: '',
    error: '',
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.message = 'Logging in...';
      state.error = '';
    },
    loginSuccess: (state, action) => {
      state.message = 'Login successful!';
      state.error = '';
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.message = '';
      state.error = action.payload;
      state.isLoggedIn = false;
      state.user = null;
    },
    registerRequest: (state) => {
      state.message = 'Registering...';
      state.error = '';
    },
    registerSuccess: (state, action) => {
      state.message = 'Registration successful!';
      state.error = '';
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.message = '';
      state.error = action.payload;
      state.isLoggedIn = false;
      state.user = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure, logout } = authSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:8080/api/auth/user/login', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    dispatch(loginSuccess(user));
  } catch (error) {
    if (error.response) {
      dispatch(loginFailure(`Error: ${error.response.data.message}`));
    } else if (error.request) {
      dispatch(loginFailure('Error: No response received from server.'));
    } else {
      dispatch(loginFailure('Error: Something went wrong while sending the request.'));
    }
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post('http://localhost:8080/api/auth/user/register', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    dispatch(registerSuccess(user));
  } catch (error) {
    if (error.response) {
      dispatch(registerFailure(`Error: ${error.response.data.message}`));
    } else if (error.request) {
      dispatch(registerFailure('Error: No response received from server.'));
    } else {
      dispatch(registerFailure('Error: Something went wrong while sending the request.'));
    }
  }
};

export default authSlice.reducer;
