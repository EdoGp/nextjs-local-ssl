import HttpClient from './HttpClient';

class InternalApiClient extends HttpClient {
  private static classInstance?: InternalApiClient;
  private constructor() {
    super(`${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL}`);
  }

  public static getInstance(): InternalApiClient {
    if (!this.classInstance) {
      this.classInstance = new InternalApiClient();
    }
    return this.classInstance;
  }
}

export default InternalApiClient;
