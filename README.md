# react-axios
Axios React component for declarative API calls.

### Example usage
```typescript
import * as React from "react";
import { Axios, AxiosStatus } from "@radoslaw-medryk/react-axios";

export const DataDisplay: React.SFC<{}> = () => (
    <Axios
        request={axios => axios.get("https://jsonplaceholder.typicode.com/todos/1")}
        initCall={true}
    >
        {context => {
            let result: React.ReactNode;

            if (context.status === AxiosStatus.Loading) {
                result = <div>Loading...</div>;
            } else if (context.status === AxiosStatus.Error) {
                result = <div>Error! {JSON.stringify(context.error)}</div>;
            } else {
                result = <div>API returned: {JSON.stringify(context.data)}</div>;
            }

            return (
                <div>
                    {result}
                    <button type="button" onClick={context.call}>Reload</button>
                </div>
            );
        }}
    </Axios>
);
```
