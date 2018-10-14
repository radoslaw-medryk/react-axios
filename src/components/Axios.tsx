import * as React from "react";
import { AxiosRequest } from "../types/AxiosRequest";
import { AxiosContext, AxiosStatus } from "../types/AxiosContext";
import axios, { CancelTokenSource } from "axios";

type ResponseType = {
    //
};

type ErrorType = {
    //
};

export type AxiosProps = {
    request: AxiosRequest<ResponseType>;
    initCall?: boolean;
    onCallEnded?: () => void;
    children: (context: AxiosContext) => JSX.Element;
};

export type AxiosState = AxiosContext<ResponseType, ErrorType> & {
    requestId: number;
    cts: CancelTokenSource | null;
};

export class Axios extends React.Component<AxiosProps, AxiosState> {
    constructor(props: AxiosProps) {
        super(props);
        this.state = {
            requestId: 0,
            cts: null,

            status: AxiosStatus.NotCalled,
            data: null,
            error: null,
            call: this.requestCall,
            cancel: this.cancelCall,
        };
    }

    public componentDidMount() {
        if (!this.props.initCall) {
            return;
        }

        this.executeCall();
    }

    public componentDidUpdate(prevProps: AxiosProps, prevState: AxiosState) {
        if (prevState.requestId === this.state.requestId) {
            return;
        }

        this.executeCall();
    }

    public render() {
        return this.props.children(this.state);
    }

    private requestCall = () => {
        this.setState(state => ({ requestId: state.requestId + 1 }));
    }

    private executeCall = () => {
        this.cancelCall();
        const cts = axios.CancelToken.source();
        this.setState({
            status: AxiosStatus.Loading,
            data: null,
            error: null,
            cts: cts,
        });

        const axiosInstance = axios.create({
            cancelToken: cts.token,
        });

        this.props.request(axiosInstance).then(response => {
            this.setState({
                status: AxiosStatus.Success,
                data: response,
                error: null,
            }, this.props.onCallEnded);
        }).catch(error => {
            this.setState({
                status: AxiosStatus.Error,
                data: null,
                error: error,
            }, this.props.onCallEnded);
        });
    }

    private cancelCall = () => {
        if (this.state.cts) {
            this.state.cts.cancel();
        }
    }
}
