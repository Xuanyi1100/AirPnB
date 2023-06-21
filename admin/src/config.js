import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://airpnb.onrender.com/api"
});

export default  axiosInstance 