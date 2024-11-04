import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(URL, params) {
    const response = await fetch(URL, params);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Failed to send request');
    }
    return resData;
}

export default function useHttp(URL, params, initialValue) {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)

    function clearData() {
        setData(initialValue)
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsLoading(true)
        try {
            const resData = await sendHttpRequest(URL, {...params, body: data });
            setData(resData);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false)
    }, [URL, params]);


    useEffect(() => {
        if (params && (params.method === 'GET' || !params.method) || !params) {
            sendRequest();
        }
    }, [sendRequest, params]);
    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}