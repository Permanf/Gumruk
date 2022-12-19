import axios from "axios";
import store from "../index";
import { userLoaded } from "../actions/auth";
import { Logout } from "../middlewares/auth";

// const API_BASE_URL = process.env.REACT_APP_IS_PRODUCTION === 'production' ? process.env.REACT_APP_API_BASE_PRODUCTION_URL : process.env.REACT_APP_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: "http://95.85.127.198",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: null,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      error?.response?.data === "Unauthorized"
    ) {
      const config = {
        withCredentials: true,
        //crossDomain: true
      };
      return axiosInstance
        .get("api/auth/token/refresh/", config)
        .then((response) => {
          axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.token}`;
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          store.dispatch(userLoaded(response.data));
          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          axiosInstance.defaults.headers.Authorization = null;
          originalRequest.headers.Authorization = null;
          store.dispatch(Logout());
          //window.location.href = process.env.REACT_APP_API_ADMIN_RELOGIN_URL;
          return Promise.reject(error);
        });
    } else {
      axiosInstance.defaults.headers.Authorization = null;
      originalRequest.headers.Authorization = null;
      //store.dispatch(Logout());
      return Promise.reject(error);
    }
  }
);

const api = {
  getApi: async ({ url, token, withCredentials, contentType, lang }) => {
    // console.log(contentType);
    console.log(lang, "get lang");
    const config = {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language":
          lang == "English" ? "en" : lang == "Turkmen" ? "tm" : "ru",
      },
      timeout: contentType ? 100000 : 20000,
      withCredentials: withCredentials,
    };
    const response = await axiosInstance.get(`/api/${url}`, config);
    return response;
  },

  updateApi: async ({ url, token, withCredentials, params }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: withCredentials,
    };
    const response = await axiosInstance.put(`/api/${url}`, params, config);
    return response;
  },
  postApi: async ({ url, token, withCredentials, params }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": "ru",
      },
      timeout: 200000,

      withCredentials: withCredentials,
    };
    const response = await axiosInstance.post(`/api/${url}`, params, config);
    return response;
  },
  deleteApi: async ({ url, token, data, withCredentials }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: withCredentials,
      data: data,
    };
    const response = await axiosInstance.delete(`/api/${url}`, config);
    return response;
  },
  uploadPhoto: async ({ url, token, withCredentials, formData }) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      timeout: 50000,
      withCredentials: withCredentials,
    };
    const response = await axiosInstance.post(`/api/${url}`, formData, config);
    return response;
  },
};

export default api;
