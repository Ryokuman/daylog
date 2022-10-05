import axios from "axios";

const DOMAIN = "localhost";
const API_BASE_URL = `http://${DOMAIN}:8080/api`;

const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 10000,
  params: {},
});

export default api;
