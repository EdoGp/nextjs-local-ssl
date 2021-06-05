import ApiClient from './api/ApiClient';
import InternalApiClient from './api/InternalApiClient';

export const postExternalLogin = (loginCredentials: {
  username: string;
  password: string;
}) => {
  return ApiClient.getInstance().postRequest('auth/signin', loginCredentials);
};

export const postInternalLogin = (loginCredentials: {
  username: string;
  password: string;
}) => {
  return InternalApiClient.getInstance().postRequest(
    'auth/login',
    loginCredentials,
  );
};

export const postInternalLogout = () => {
  return InternalApiClient.getInstance().postRequest('auth/logout');
};

export default {
  postExternalLogin,
  postInternalLogin,
};
