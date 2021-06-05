import HttpClient from './HttpClient';

class ApiClient extends HttpClient {
  private static classInstance?: ApiClient;
  private constructor() {
    super(`${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}`);
  }

  public static getInstance(): ApiClient {
    if (!this.classInstance) {
      this.classInstance = new ApiClient();
    }
    return this.classInstance;
  }
}

export default ApiClient;
