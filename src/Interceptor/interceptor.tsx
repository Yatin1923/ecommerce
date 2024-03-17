import axios, { AxiosError } from "axios";
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

axiosInstance.interceptors.response.use((response:any)=>{

    return response
},(error:AxiosError)=>{
    debugger;
    if(error.response?.status == 401){
        if (window.location.pathname !== '/signup') {
            window.location.href = '/signup';
        }
    }
    return Promise.reject(error);
})

export default axiosInstance;