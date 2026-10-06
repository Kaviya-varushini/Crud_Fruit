import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getFruits = () => api.get("/fruits");
export const addFruit = (fruit) => api.post("/fruits", fruit);
export const deleteFruit = (id) => api.delete(`/fruits/${id}`);