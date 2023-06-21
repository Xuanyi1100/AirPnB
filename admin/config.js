import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://airpnb.onrender.com/api"
});
