import axios from 'axios';

function returnAxiosExternalInstance() {
  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}auth/`,
    headers: {
      Accept: 'application/json',
    },
    // validateStatus: (status) => status >= 200 && status < 500,
  });

  // axiosInstance.interceptors.response.use(
  //   authInterceptor,
  //   authErrorInterceptor,
  // );

  return axiosInstance;
}

function returnAxiosInternalInstance() {
  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL}auth/`,
    headers: {
      Accept: 'application/json',
    },
  });

  return axiosInstance;
}

export const postExternalLogin = (loginCredentials: {
  username: string;
  password: string;
}) => {
  const axiosInstance = returnAxiosExternalInstance();
  return axiosInstance.post('signin', loginCredentials);
};

export const postInternalLogin = (loginCredentials: {
  username: string;
  password: string;
}) => {
  const axiosInstance = returnAxiosInternalInstance();
  return axiosInstance.post('login', loginCredentials);
};

export const postInternalLogout = () => {
  const axiosInstance = returnAxiosInternalInstance();
  return axiosInstance.post('logout');
};

export default {
  postExternalLogin,
  postInternalLogin,
};
