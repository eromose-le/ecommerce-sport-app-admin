import axios from "axios";
import { type Store } from "@reduxjs/toolkit";
import { DYNAMIC_ENV } from "./config";
import { logoutAction } from "@/store/storeActions";

export const SportyGalaxyAdminHttp = axios.create({
  baseURL: DYNAMIC_ENV().AUTH_URL_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (store: Store) => {
  SportyGalaxyAdminHttp?.interceptors?.request?.use(async (config) => {
    const { authUser } = store.getState()?.global ?? {};
    const token = authUser?.token;

    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }

    return config;
  });

  SportyGalaxyAdminHttp?.interceptors?.response?.use(
    (response) => {
      return response;
    },
    async function (error) {
      if (error?.response?.status === 401) {
        store.dispatch(logoutAction());
      } else {
        //
      }

      return Promise.reject(error);
    }
  );
};

export default SportyGalaxyAdminHttp;
