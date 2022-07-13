import axios from "axios";
import { API_URL } from "env";
import { store } from "store";

import ErrorHandler from "./ErrorHandler";

const ApiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

ApiClient.interceptors.request.use((config) => {
  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${
      store.getState().auth.accessToken
    }`;
  }
  return config;
});

ApiClient.interceptors.response.use((response) => response.data, ErrorHandler);

// POST LOGIN
// GET ACCESS TOKEN AND REFRESH TOKEN
// STORE ACCESS TOKEN AND REFRESH TOKEN IN REDUX
// VERIFY TOKEN EVERY REQUEST
// IF TOKEN EXPIRED, GET NEW TOKEN
// IF REFRESH TOKEN EXPIRED, LOGOUT
export default ApiClient;
