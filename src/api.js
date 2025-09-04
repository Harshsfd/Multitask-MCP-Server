// src/api.js
import axios from "axios";

// Fallback: अगर env var set नहीं है तो localhost:8000 use होगा
export const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});