import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AxiosTypedError<TError = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<TError>;
}
