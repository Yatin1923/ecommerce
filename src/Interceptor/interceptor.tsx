import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7275/api/"
})

axiosInstance.interceptors.request.use((config:any)=>{
    const token = localStorage.getItem("JWTToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;