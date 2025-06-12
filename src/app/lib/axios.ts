// lib/axios.ts

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://devthroughts.vercel.app/api/v1',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
