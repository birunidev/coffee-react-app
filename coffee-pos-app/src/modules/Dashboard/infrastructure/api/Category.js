import ApiClient from "lib/Api/Client";
const categoryAPI = {
  get: () => ApiClient.get("/categories").then((res) => res),
};
export default categoryAPI;
