import { postInternalLogin, postInternalLogout } from '../../adapters/auth';
import types from './authTypes';

export const authLogin = (data) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await postInternalLogin(data);
    dispatch(loginSuccess(response.data.data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const authLogout = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    await postInternalLogout();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(authLogoutFailure(error));
  }
};

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST,
});

export const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
});

export const authLogoutRequest = () => {};

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

export const authLogoutFailure = (error) => ({
  type: types.LOGOUT_REQUEST,
  payload: error,
});

export const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    },
  };
};

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};
