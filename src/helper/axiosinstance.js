import axios from "axios";
import { baseUrl } from "../cosntants";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = baseUrl;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
