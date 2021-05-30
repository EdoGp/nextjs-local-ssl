import axios from 'axios';

function returnAxiosExternalInstance() {
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}auth/`,
    headers: {
      Accept: 'application/json',
    },
  });
}

function returnAxiosInternalInstance() {
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL}auth/`,
    headers: {
      Accept: 'application/json',
    },
  });
}

export const postExternalLogin = (loginCredentials: {
  username: string;
  password: string;
}) => {
  const axiosInstance = returnAxiosExternalInstance();
  return axiosInstance.post('signin', loginCredentials);
};

export const postExternalRegister = (registerCredentials: {
  email: string;
  password: string;
}) => {
  const axiosInstance = returnAxiosExternalInstance();
  return axiosInstance.post('singup', registerCredentials);
};

export const postInternalLogin = (loginCredentials: {
  username: string;
  password: string;
}) => {
  const axiosInstance = returnAxiosInternalInstance();
  return axiosInstance.post('login', loginCredentials);
};

export const postInternalRegister = (registerCredentials: {
  email: string;
  password: string;
}) => {
  const axiosInstance = returnAxiosInternalInstance();
  return axiosInstance.post('singup', registerCredentials);
};

export const postInternalLogout = (registerCredentials: {
  email: string;
  password: string;
}) => {
  const axiosInstance = returnAxiosInternalInstance();
  return axiosInstance.post('logout', registerCredentials);
};

export default {
  postExternalLogin,
  postExternalRegister,
  postInternalLogin,
  postInternalRegister,
};
