import authAPI from "modules/Auth/infrastructure/api";
import { RouteName } from "modules/Auth/infrastructure/routes/RouteName";
import { toast } from "react-toastify";
import { setAuth } from "store/slice/authSlice";
import ApiClient, { setAuthorizationHeader } from "./Client";

let store;

export const injectStoreForError = (_store) => {
  store = _store;
};

export default async function ErrorHandler(error) {
  if (error) {
    let message;
    if (error.response) {
      const originalRequest = error.config;
      if (!error.response.data) message = "Internal Server Error";
      if (error.response.status === 500)
        message = "Something went terribly wrong";
      else if (
        error.response.data.statusCode === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        originalRequest.sent = true;

        if (originalRequest.url === "/auth/refresh") {
          return ApiClient(originalRequest);
        }
        try {
          console.log("i was here then");
          const newTokens = await authAPI.refreshToken();
          console.log(newTokens);
          setAuthorizationHeader(newTokens.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${newTokens.accessToken}`;
          // dispatch new accessToken
          store.dispatch(setAuth({ accessToken: newTokens.accessToken }));
          return ApiClient(originalRequest);
        } catch (error) {
          console.log("i was here too");
          console.log(error);
          // await authAPI.logout();
          // window.location.href = RouteName.LOGOUT;
        }
      } else {
        message = error.response.data.message;
      }

      if (typeof message === "string") toast.error(message);

      return Promise.reject(error);
    }
  }
}
