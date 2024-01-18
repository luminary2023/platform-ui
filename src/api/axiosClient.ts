import axios from "axios";
import { getCookie } from "cookies-next";
// import { NEXT_PUBLIC_API_BASE_URL } from "../../";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// const isTokenExpired = () => {
//   const token = getCookie("token");

//   if (!token) {
//     return true;
//   }

//   try {
//     const decodedToken = JSON.parse(atob(token.split(".")[1]));
//     const expirationTime = decodedToken.exp * 1000; //

//     return Date.now() > expirationTime;
//   } catch (error) {
//     return true;
//   }
// };

// export default isTokenExpired;
