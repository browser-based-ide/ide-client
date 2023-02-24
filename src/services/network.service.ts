import { AxiosRequestConfig } from "axios";
import axios from "./axios.service";

class NetworkService {
  private static _instance: NetworkService;

  public static getInstance(): NetworkService {
    if (!NetworkService._instance) {
      NetworkService._instance = new NetworkService();
    }

    return NetworkService._instance;
  }

  async get<T>(
    url: string,
    params: any = null,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "GET";
    if (params !== null) {
      axiosConfig.params = params;
    }
    return await this._getResponse<T>(axiosConfig);
  }

  async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "POST";
    axiosConfig.data = data;
    return await this._getResponse<T>(axiosConfig);
  }

  async put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "PUT";
    axiosConfig.data = data;
    return await this._getResponse<T>(axiosConfig);
  }

  async delete<T>(
    url: string,
    params: any = null,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "DELETE";
    if (params !== null) {
      axiosConfig.params = params;
    }
    return await this._getResponse<T>(axiosConfig);
  }

  private _prepareRequest(
    url: string,
    config: AxiosRequestConfig
  ): AxiosRequestConfig {
    const axiosConfig: AxiosRequestConfig = Object.assign(
      {
        url,
      } as Partial<AxiosRequestConfig>,
      config
    );

    return axiosConfig;
  }

  private async _getResponse<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await axios(config);
    return response.data;
  }
}

const networkService = NetworkService.getInstance();
export default networkService;
