import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000"; // backend URL
export const api = axios.create({
  baseURL: BASE_URL,
});
