import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://zoudeyi-airpnb-6a582a97a733.herokuapp.com/api"
});
