import Axios from 'axios';

import { BASE_URL } from '@/config';
console.log("🚀 ~ file: axios.ts:4 ~ BASE_URL:", BASE_URL)

export const axios = Axios.create({
  baseURL: BASE_URL,
});

// TODO: Config authozie token through axios interceptors request

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
