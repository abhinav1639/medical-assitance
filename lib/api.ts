
"use client";

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // 🔥 very important
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔁 refresh करेगा → cookies auto update होंगी
        await axios.post("/api/refresh-Token", {}, { withCredentials: true });

        // 🔁 same request retry (cookies automatically attach होंगी)
        return api(originalRequest);
      } catch (e) {
        console.log("Refresh failed");
        window.location.href = "/SignIn";
      }
    }

    return Promise.reject(err);
  }
);

export default api;