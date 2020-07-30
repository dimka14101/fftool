import axios from "axios";

const axClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

axClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["api_key"] = "f75f4f95ed0d6fb14fc6359b87b20ddf";
  return config;
});

export default axClient;
