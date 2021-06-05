import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized:
          process.env.NODE_ENV !== 'production' &&
          process.env.NODE_ENV !== 'development'
            ? true
            : false,
      }),
      withCredentials: true,
    });

    this._initialResponseInterceptor();
  }

  private _initialResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = ({
    data,
    status,
  }: AxiosResponse): Partial<AxiosResponse> => {
    return { data, status };
  };

  private _handleError = (error: any) => {
    return Promise.reject(error);
  };

  public getRequest = (url: string, config?: AxiosRequestConfig) => {
    return this.instance.get(url);
  };

  public postRequest = (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => {
    return this.instance.post(url, data, config);
  };

  public putRequest = (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => {
    return this.instance.put(url, data, config);
  };

  public deleteRequest = (url: string, config?: AxiosRequestConfig) => {
    return this.instance.delete(url, config);
  };
}

export default HttpClient;
