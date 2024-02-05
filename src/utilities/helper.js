import axios from 'axios';

// replace with your localhost port
export const BASE_URL = "http://localhost:8080";

export const axiosRequest = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  // Add any other configurations like headers, interceptors, etc.
});