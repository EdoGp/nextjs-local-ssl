import { RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { postInternalLogin, postInternalLogout } from '../../adapters/auth';
import types from './authTypes';

export const authLogin =
  (data: {
    username: string;
    password: string;
  }): ThunkAction<void, RootStateOrAny, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await postInternalLogin(data);
      dispatch(loginSuccess(response.data.data));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

export const authLogout =
  (): ThunkAction<void, RootStateOrAny, unknown, AnyAction> =>
  async (dispatch) => {
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
      isLoggedIn: true,
      accessToken: data.accessToken,
    },
  };
};

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};
