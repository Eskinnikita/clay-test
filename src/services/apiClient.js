import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8084/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000,
});

export default {
  get(route) {
    return apiClient.get(`${route}`);
  },
  getByParams(route, data) {
    return apiClient.get(`${route}`, { params: data });
  },
  getById(route, id) {
    return apiClient.get(`${route}/${id}`);
  },
  delete(route, id) {
    return apiClient.delete(`${route}/${id}`);
  },
  update(route, id, data) {
    return apiClient.put(`${route}/${id}`, data);
  },
  post(route, data) {
    return apiClient.post(`${route}`, data);
  },
};
