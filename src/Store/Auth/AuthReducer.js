const initialState = {
  user: null,
  message: '',
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        message: action.payload,
        error: null,
      };
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        message: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
