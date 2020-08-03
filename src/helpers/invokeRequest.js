import { Component } from 'react';
import axios from "../Helpers/axios.public";

class invokeRequest extends Component {

    static GET = (query, requestStart, onSuccess, onError, dispatch) => {
        console.log(`[InvokeRequest] started to: ${query}`);
        dispatch({ type: requestStart });
        axios.get(query)
            .then((res) => {
                console.log(`[InvokeRequest] onSuccess from: ${query} is: `);
                console.log(res);
                dispatch({ type: onSuccess, payload: res.data });
            })
            .catch((err) => {
                console.log(`[InvokeRequest] onError from:${query} errorInfo: ${err}`);
                console.log(err);
                dispatch({ type: onError, error: err });
            });
    };
}

export default invokeRequest;


