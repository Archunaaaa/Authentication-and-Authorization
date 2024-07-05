import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminExists: false,
  message: "",
  errors: {},
  user: {},
  loading: false,
  error: null,
  users: [],
  userData: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = "User registered successfully!";
      state.errors = {};
    },
    registerFailure(state, action) {
      state.loading = false;
      state.message = "";
      state.errors = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUsersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload;
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.userData = null;
      state.error = action.payload;
    },
    updateUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state) {
      state.loading = false;
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
