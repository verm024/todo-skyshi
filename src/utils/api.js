import axios from "axios";

const baseURL = "https://todo.api.devcode.gethired.id";

const api = () => {
  let headers = {
    "Content-Type": "application/json",
  };

  const instance = axios.create({
    baseURL,
    headers,
  });

  return instance;
};

export default api;
