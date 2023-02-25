import { AxiosRequestConfig } from "axios";
import { useAuthStore } from "../../store";

const requestInterceptor = (config: AxiosRequestConfig) => {
	const authToken = useAuthStore.getState().token;

	if (authToken !== null) {
		Object.assign(config.headers, {
			Authorization: `Bearer ${authToken}`,
		});
	}
	return config;
};

export default requestInterceptor;
