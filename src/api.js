import axios from "axios";

// Backend URL
export const BASE_URL = "https://mcp-server-qko7.onrender.com";

// Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
