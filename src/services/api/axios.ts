import axios from "axios";
import { getEnv } from "@/utils/env";

const api = axios.create({
  // Mengambil URL dari .env melalui helper
  baseURL: getEnv("VITE_API_BASE_URL").trim().replace(/\/$/, ""),
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  // Validasi: Abaikan jika token null atau berisi error HTML
  if (token && token !== "null" && !token.includes("<!DOCTYPE")) {
    config.headers.Authorization = `Bearer ${token.trim()}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;