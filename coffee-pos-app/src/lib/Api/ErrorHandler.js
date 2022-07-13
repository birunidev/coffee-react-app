import authAPI from "modules/Auth/infrastructure/api";
import { RouteName } from "modules/Auth/infrastructure/routes/RouteName";
import { toast } from "react-toastify";
import ApiClient from "./Client";

export default async function ErrorHandler(error) {
  if (error) {
    let message;
    if (error.response) {
      const originalRequest = error.config;
      if (error.response.status === 500)
        message = "Something went terribly wrong";
      else if (
        error.response.data.statusCode === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        originalRequest.sent = true;

        if (originalRequest.url !== "/auth/refresh") {
          console.log("i was here");
          return ApiClient(originalRequest);
        }
        try {
          const newTokens = await authAPI.refreshToken();
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${newTokens.data.accessToken}`;

          return ApiClient(originalRequest);
        } catch (error) {
          await authAPI.logout();
          window.location.href = RouteName.LOGOUT;
        }
      } else {
        message = error.response.data.message;
      }

      if (typeof message === "string") toast.error(message);

      return Promise.reject(error);
    }
  }
}
