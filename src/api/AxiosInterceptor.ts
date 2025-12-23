import axios from "axios";
import { safeJSONParse, unsetLocalStorage } from "@/utils/helper";
import { SESSION, HEADER } from "@/utils/constant";

const API_BASE_URL = "http://localhost:3001/api/v1/admin";
const AxiosInterceptor = axios.create({
  baseURL: API_BASE_URL,
  // mode: 'cors',
  headers: {
    "Content-Type": HEADER.CONTENT_TYPE,
    "Cache-control": HEADER.CACHE_CONTROL,
    "Access-Control-Allow-Origin": "*"
  },

  timeout: HEADER.TIMEOUT,
});

AxiosInterceptor.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const tokenData = localStorage.getItem(SESSION.ADMIN_TOKEN);
      const parsedData = safeJSONParse(tokenData);
      if (parsedData?.token) {
        config.headers.Authorization = `Bearer ${parsedData.token}`;
      }
    }
    return config;
  },
  (error) => {
    // error goes here
    return Promise.reject(error);
  }
);

AxiosInterceptor.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 400) {
      const response = { status: "error", msg: error.response.data.message };
      return Promise.reject(response);
    }
    if (error.response.status === 401) {
      window.location.href = "/login";
      unsetLocalStorage(SESSION.ADMIN_TOKEN);
      error.response.data.message =
        "Session closed ....you have been logged out!";
      const response = { status: "error", msg: error.response.data.message };
      return Promise.reject(response);
    }
    if (error.response.status === 403) {
      error.response.data.message = "Authentication Fail";
      const response = { status: "error", msg: error.response.data.message };
      return Promise.reject(response);
    }
    if (error.response.status === 404) {
      error.response.data.message = "Not Found";
      const response = { status: "error", msg: error.response.data.message };
      return Promise.reject(response);
    }
    if (error.response.status === 500) {
      error.response.data.message = "Internal Server Error";
      const response = { status: "error", msg: error.response.data.message };
      return Promise.reject(response);
    }
    if (error.response.status === 508) {
      error.response.data.message = "Time Out";
      const response = { status: "error", msg: error.response.data.message };
      return Promise.reject(response);
    }
    // return Promise.reject(error)
  }
);
export default AxiosInterceptor;