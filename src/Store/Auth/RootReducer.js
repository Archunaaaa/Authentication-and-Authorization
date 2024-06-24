// src/app/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Auth/AuthSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if any
});

export default rootReducer;
