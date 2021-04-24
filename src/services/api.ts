import axios from "axios";

let url = "https://my-json-server.typicode.com/Daniel-Vinicius/PlantManager";

let urlDev = "http://localhost:3333";

const api = axios.create({
  baseURL: url,
});

export default api;
