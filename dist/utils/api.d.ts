import { AxiosInstance, AxiosRequestConfig } from 'axios';
export declare let api: AxiosInstance;
export declare let baseUrl: string;
/** Axios configuration for make request to api via `react-query` */
export declare const initApi: (config: AxiosRequestConfig) => void;
