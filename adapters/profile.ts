import axios from 'axios';

function returnAxiosInstance({ token }) {
  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}auth/`,
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:3000',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return axiosInstance;
}

export const getProfile = ({ token }) => {
  const axiosInstance = returnAxiosInstance({ token });
  return axiosInstance.get('profile');
};

export default { getProfile };
