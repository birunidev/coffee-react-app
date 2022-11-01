import ApiClient from "lib/Api/Client";

const transactionAPI = {
  get: (params) => ApiClient.get("/transactions", params).then((res) => res),
  show: (tx_number) =>
    ApiClient.get("/transactions/" + tx_number).then((res) => res),
  store: (data) => ApiClient.post("/transactions", data).then((res) => res),
};
export default transactionAPI;
