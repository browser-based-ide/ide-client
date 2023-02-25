import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import NProgress, { NProgressOptions } from "nprogress";

const calculatePercentage = (loaded: number, total: number) =>
	Math.floor(loaded * 1.0) / total;

function setupProgressBar(
	axiosInstance: AxiosInstance,
	config: null | NProgressOptions = null
) {
	let requestsCounter = 0;

	const setupStartProgress = () => {
		axiosInstance.interceptors.request.use((config) => {
			requestsCounter++;
			NProgress.start();
			return config;
		});
	};

	const setupUpdateProgress = () => {
		const update = (e: any) =>
			NProgress.inc(calculatePercentage(e.loaded, e.total));
		axiosInstance.defaults.onDownloadProgress = update;
		axiosInstance.defaults.onUploadProgress = update;
	};

	const setupStopProgress = () => {
		const responseFunc = (response: AxiosResponse) => {
			if (--requestsCounter === 0) {
				NProgress.done();
			}
			return response;
		};

		const errorFunc = async (error: AxiosError) => {
			if (--requestsCounter === 0) {
				NProgress.done();
			}
			return await Promise.reject(error);
		};

		axiosInstance.interceptors.response.use(responseFunc, errorFunc);
	};

	NProgress.configure(config as NProgressOptions);
	setupStartProgress();
	setupUpdateProgress();
	setupStopProgress();
}

export default setupProgressBar;
