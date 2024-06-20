import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL:"https://harmonized-crop-calendar1.onrender.com"
});

export default api