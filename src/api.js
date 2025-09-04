import axios from "axios";

// export const BASE_URL = "http://127.0.0.1:8000"; // backend URL
export const BASE_URL = "https://mcp-server-qko7.onrender.com"
export const api = axios.create({
  baseURL: BASE_URL,
});
