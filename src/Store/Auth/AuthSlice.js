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
      state.user = action.payload.user;
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
      state.user = action.payload.user;
      state.message = 'User registered successfully!';
    },
    registerFailure: (state, action) => {
      state.error = action.payload.error;
      state.message = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:8080/api/auth/user/login', userData);
    const { data } = response;
    if (data.status === 0) {
      dispatch(loginFailure({ error: { message: data.error.message, code: data.error.code } }));
    } else {
      const { body } = data.data;
      localStorage.setItem('token', body.jwt);
      localStorage.setItem('userRole', body.role);
      dispatch(loginSuccess({ user: body }));
      userData.navigate(body.role === 'user' ? '/usertable' : '/admintable');
    }
  } catch (error) {
    if (error.response) {
      dispatch(loginFailure({ error: { message: error.response.data.message, code: error.response.status } }));
    } else if (error.request) {
      dispatch(loginFailure({ error: { message: 'No response received from server.', code: 500 } }));
    } else {
      dispatch(loginFailure({ error: { message: 'Something went wrong while sending the request.', code: 500 } }));
    }
  }
};


export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post('http://localhost:8080/api/auth/user/register', userData);
    const { data } = response;
    if (data.status === 0) {
      dispatch(registerFailure({ error: { message: data.error.message, code: data.error.code } }));
    } else {
      const { token, user } = data;
      localStorage.setItem('token', token);
      dispatch(registerSuccess({ user }));
    }
  } catch (error) {
    if (error.response) {
      dispatch(registerFailure({ error: { message: error.response.data.message, code: error.response.status } }));
    } else if (error.request) {
      dispatch(registerFailure({ error: { message: 'No response received from server.', code: 500 } }));
    } else {
      dispatch(registerFailure({ error: { message: 'Something went wrong while sending the request.', code: 500 } }));
    }
  }
};

export default authSlice.reducer;
