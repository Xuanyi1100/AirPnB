import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://zoudeyi-airpnb.onrender.com/api"
    
});

export default  axiosInstance 