import axios from "axios";

export const BASE_URL = "https://mcp-server-qko7.onrender.com"; // your Render backend
export const api = axios.create({
  baseURL: BASE_URL,
});
