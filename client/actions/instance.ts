import axios, { AxiosInstance } from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;
export const instance: AxiosInstance = axios.create({
  baseURL: SERVER,
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/json",
  },
});
