// src/api/axiosInstance.js
import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { store } from '../redux/store/store';

const axiosInstance = axios.create({
   baseURL: BASE_URL,
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json'
   }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
   (config) => {
      const state = store.getState();
      const token = state?.user?.userToken;

      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      throw error;
   }
);

export default axiosInstance;
