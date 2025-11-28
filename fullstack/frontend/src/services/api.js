import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'ApiKey': '12345678',
  },
});

//GET request
export const getItems = (resource) => api.get(resource);

//GET by id request
export const getItemById = (resource, id) => api.get(`${resource}/${id}`);

//POST request
export const createItem = (resource, data) => api.post(resource, data);
export const createItemForUser = (resource, id, data) => api.post(`${resource}/${id}`, data);

//PUT request
export const editItem = (resource, id, data) => api.put(`${resource}/${id}`, data);

export const deleteItem = (resource, id) => api.delete(`${resource}/${id}`);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization']; 
  }
};

export default api;