import ApiClient from "lib/Api/Client";

const authAPI = {
  login: (data) =>
    ApiClient.request({
      url: "/auth/login",
      method: "POST",
      data: data,
    }),

  refreshToken: () =>
    ApiClient.request({
      url: "/auth/refresh",
      method: "POST",
    }),
  logout: () =>
    ApiClient.request({
      url: "/auth/logout",
      method: "POST",
    }),
};
export default authAPI;
