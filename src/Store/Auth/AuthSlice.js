import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FETCH_USER_FAILURE,
  DELETE_USER_FAILURE,
  UPDATE_USER_FAILURE,
} from "../Auth/AuthAction";

const initialState = {
  isAdminExists: false,
  message: "",
  errors: {},
  user: {},
  loading: false,
  error: null,
  users: [],
  userData: [], // Initialize userData as null
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, message: "User registered successfully!", errors: {} };
    case SIGNUP_FAILURE:
      return { ...state, message: "", errors: action.payload };
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: { ...action.payload.Details } };
    case UPDATE_USER_SUCCESS:
      return { ...state, userData: action.payload, error: null };
    case DELETE_USER_SUCCESS:
      return { ...state, userData: null, error: null };
    case FETCH_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        userData: null,
        error: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return { ...state };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default signupReducer;