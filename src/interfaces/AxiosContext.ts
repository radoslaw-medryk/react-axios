import { AxiosResponse, AxiosError } from "axios";
import { AxiosTypedError } from "./AxiosTypedError";

export enum AxiosStatus {
    NotCalled,
    Loading,
    Success,
    Error,
}

export interface AxiosContext<TData = any, TError = any> {
    status: AxiosStatus;
    data: AxiosResponse<TData> | null;
    error: AxiosTypedError<TError> | null;

    call: () => void;
    cancel: () => void;
}
