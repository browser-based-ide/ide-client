import axios from "axios";
import appConstants from "../app/shared/config";
import { requestInterceptor, responseInterceptor } from "./interceptors";

const axiosInstance = axios.create({
	baseURL: appConstants.baseUrl,
});

// setup http progress bar


// setup request interceptor
axiosInstance.interceptors.request.use(requestInterceptor);

// setup response interceptor
axiosInstance.interceptors.response.use(undefined, responseInterceptor);

// export the axios instance
export default axiosInstance;
