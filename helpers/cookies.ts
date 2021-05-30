import { AxiosRequestConfig } from 'axios';
import cookie from 'cookie';

export const getAccessTokenFromCookie = (req: AxiosRequestConfig): any => {
  const { accessToken } = cookie.parse(req ? req.headers.cookie || '' : '');
  return accessToken;
};

export default { getAccessTokenFromCookie };
