// import { getAccessToken, getRefreshToken } from '../../utils/auth';
import types from './authTypes';

const initialState = {
  loading: false,
  accessToken: 'getAccessToken()',
  refreshToken: 'getRefreshToken()',
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        isLoading: false,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case types.LOGIN_FAILURE:
    case types.LOGOUT_FAILURE:
      return {
        isLoading: false,
        isLoggedIn: false,
        token: undefined,
        refreshToken: undefined,
        error: action.payload,
      };
    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_REQUEST:
      return {
        isLoading: false,
        isLoggedIn: false,
        token: undefined,
        refreshToken: undefined,
        error: '',
      };

    default:
      return state;
  }
};

export default reducer;
