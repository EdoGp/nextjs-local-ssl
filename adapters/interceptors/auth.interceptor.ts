import { AxiosResponse } from 'axios';

export const authInterceptor = (response: AxiosResponse) => response;

export const authErrorInterceptor = (error: any) => {
  if (error.response.status >= 400 && error.response.status < 500) {
    return Promise.resolve(error.response);
  }
  return Promise.reject(error);
};

export default { authErrorInterceptor, authInterceptor };
