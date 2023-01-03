import axios from 'axios';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER,
});
axiosClient.interceptors.request.use( async (request) => {
 const token = localStorage.getItem('token');
  const accessToken = `Bearer ${token}`;
  request.headers.Authorization = accessToken;
  return request;
}, async error => {
  return await Promise.reject(error);
});
axiosClient.interceptors.response.use(async res => {
  return await Promise.resolve(res);
}, async err => {
  if (err.response.status === 404) {
    window.location.pathname = '/error-data';
    toast.error(err.response.data.msg);
  }
  return await Promise.reject(err);
});
export default axiosClient;