import axios from "axios";
import { store } from "@/state/store.ts";
import { logout } from "@/state/auth-slice.ts";

let isRefreshing = false;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            await api.post("/token/refresh");
            isRefreshing = false;
            return api(error.config);
          } catch {
            isRefreshing = false;
            store.dispatch(logout());
          }
        }
      }

      return Promise.reject(error);
    }
);
