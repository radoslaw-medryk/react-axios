import { AxiosInstance, AxiosPromise } from "axios";

export type AxiosRequest<TData = any> = (axios: AxiosInstance) => AxiosPromise<TData>;
