import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.ugcompass_token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data,
      };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('ugcompass_token', `Bearer ${action.payload}`);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('ugcompass_token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};