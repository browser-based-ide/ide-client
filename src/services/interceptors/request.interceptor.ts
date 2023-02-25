import { AxiosRequestConfig } from "axios";


const requestInterceptor = (config: AxiosRequestConfig) => {
  // const authToken = useAuthStore.getState().token;
  const authToken = "912387120376123";
  if (authToken !== null) {
    Object.assign(config.headers, {
      Authorization: `Bearer ${authToken}`,
    });
  }
  return config;
};

export default requestInterceptor;
