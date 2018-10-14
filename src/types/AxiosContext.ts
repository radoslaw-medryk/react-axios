import { AxiosResponse, AxiosRequestConfig } from "axios";

export type AxiosContext<TData = any, TError = any> =
    AxiosContextFunctions & (
        AxiosContextNotCalled |
        AxiosContextLoading |
        AxiosContextSuccess<TData> |
        AxiosContextError<TError>
    );

export enum AxiosStatus {
    NotCalled,
    Loading,
    Success,
    Error,
}

export interface AxiosContextFunctions {
    call: () => void;
    cancel: () => void;
}

export interface AxiosContextNotCalled {
    status: AxiosStatus.NotCalled;
    data: null;
    error: null;
}

export interface AxiosContextLoading {
    status: AxiosStatus.Loading;
    data: null;
    error: null;
}

export interface AxiosContextSuccess<TData> {
    status: AxiosStatus.Success;
    data: AxiosResponse<TData>;
    error: null;
}

export interface AxiosContextError<TError> {
    status: AxiosStatus.Error;
    data: null;
    error: AxiosTypedError<TError>;
}

export interface AxiosTypedError<TError = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<TError>;
}
