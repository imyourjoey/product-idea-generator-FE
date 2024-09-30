// src/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Laravel backend URL
  headers: {
    "Content-Type": "application/json",
    // Add more headers if necessary (e.g., Authorization for tokens)
  },
});

export default axiosInstance;
