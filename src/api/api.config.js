import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/',
 
});
axiosClient.interceptors.request.use((request) => {
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
  if (err.response.status === 401) {
    window.location.pathname = '/';
  }
  if(err.response.status === 404) {
    window.location.pathname = '/error-data'
  }
  return await Promise.reject(err);
});
export default axiosClient;