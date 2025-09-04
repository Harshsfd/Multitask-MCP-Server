import axios from "axios";

// Backend URL (Render link)
export const BASE_URL = "https://mcp-server-qko7.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});
