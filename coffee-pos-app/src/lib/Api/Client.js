import axios from "axios";
import { API_URL } from "env";
import ErrorHandler from "./ErrorHandler";

let store;

export const injectStore = (_store) => {
  store = _store;
};

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

export function setAuthorizationHeader(token) {
  if (token) {
    ApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete ApiClient.defaults.headers.common["Authorization"];
  }
}
// POST LOGIN
// GET ACCESS TOKEN AND REFRESH TOKEN
// STORE ACCESS TOKEN AND REFRESH TOKEN IN REDUX
// VERIFY TOKEN EVERY REQUEST
// IF TOKEN EXPIRED, GET NEW TOKEN
// IF REFRESH TOKEN EXPIRED, LOGOUT
export default ApiClient;
