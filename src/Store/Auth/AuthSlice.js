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

const formatErrorMessage = (message) => {
  const errorMessages = {
    "Usernot found.!": "User not found!",
  };
  return errorMessages[message] || message;
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:8080/api/auth/user/login', {
      email: userData.email,
      password: userData.password,
    });
    const { data } = response;
    if (data.status === 0) {
      const formattedMessage = formatErrorMessage(data.error.message);
      dispatch(loginFailure({ error: { message: formattedMessage, code: data.error.code } }));
    } else {
      const { token, role } = data.data.body;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      dispatch(loginSuccess({ user: data.data.body }));
      if (role === "USER") {
        userData.navigate("/usertable");
      } else if (role === "ADMIN") {
        userData.navigate("/admintable");
      } else {
        dispatch(loginFailure({ error: { message: "Unexpected user role", code: 500 } }));
        console.error("Unexpected user role", role);
      }
    }
  } catch (error) {
    if (error.response) {
      const formattedMessage = formatErrorMessage(error.response.data.message);
      dispatch(loginFailure({ error: { message: formattedMessage, code: error.response.status } }));
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
      const formattedMessage = formatErrorMessage(data.error.message);
      dispatch(registerFailure({ error: { message: formattedMessage, code: data.error.code } }));
    } else {
      const { token, role } = data.data.body;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      dispatch(registerSuccess({ user: data.data.body }));
      if (role === "USER") {
        userData.navigate("/usertable");
      } else if (role === "ADMIN") {
        userData.navigate("/admintable");
      } else {
        dispatch(registerFailure({ error: { message: "Unexpected user role", code: 500 } }));
        console.error("Unexpected user role", role);
      }
    }
  } catch (error) {
    if (error.response) {
      const formattedMessage = formatErrorMessage(error.response.data.message);
      dispatch(registerFailure({ error: { message: formattedMessage, code: error.response.status } }));
    } else if (error.request) {
      dispatch(registerFailure({ error: { message: 'No response received from server.', code: 500 } }));
    } else {
      dispatch(registerFailure({ error: { message: 'Something went wrong while sending the request.', code: 500 } }));
    }
  }
};

export default authSlice.reducer;
