import axios from "axios";
import urls from "../app/shared/config";

const axiosInstance = axios.create({
	baseURL: urls.baseUrl,
});

// export the axios instance
export default axiosInstance;
