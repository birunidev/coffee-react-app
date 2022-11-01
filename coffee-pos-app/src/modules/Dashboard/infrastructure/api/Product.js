import ApiClient from "lib/Api/Client";

const productAPI = {
  get: (params) =>
    ApiClient.get("/products", {
      params,
    }).then((res) => res),
  getSingle: (id) => ApiClient.get("/products/" + id).then((res) => res),
  store: (data) =>
    ApiClient.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res),
  update: (id, data) =>
    ApiClient.put("/products/" + id, data).then((res) => res),
  destroy: (id) => ApiClient.delete("/products/" + id).then((res) => res),
};
export default productAPI;
