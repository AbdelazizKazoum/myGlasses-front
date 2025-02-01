/* eslint-disable import/no-unresolved */
"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKENND_URL,
});

// api.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token')

//     config.headers = {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     } as AxiosRequestHeaders

//     return config
//   },
//   error => Promise.reject(error)
// )

export default api;
