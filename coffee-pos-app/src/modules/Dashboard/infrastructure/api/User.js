import ApiClient from "lib/Api/Client";

const userAPI = {
  get: () => ApiClient.get("/users").then((res) => res),
  getSingle: (id) => ApiClient.get("/users/" + id).then((res) => res),
  store: (data) =>
    ApiClient.post("/users", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res),
  update: (id, data) => ApiClient.put("/users/" + id, data).then((res) => res),
  destroy: (id) => ApiClient.delete("/users/" + id).then((res) => res),
};
export default userAPI;
