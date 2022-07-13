import ApiClient from "lib/Api/Client";
const mediaAPI = {
  get: () => ApiClient.get("/media").then((res) => res),
  store: (data) =>
    ApiClient.post("/media", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res),
  destroy: (id) => ApiClient.delete("/media/" + id).then((res) => res),
};
export default mediaAPI;
