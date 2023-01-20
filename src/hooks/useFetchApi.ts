import { useState, useEffect } from 'react';

export interface TApiResponse {
    status: number;
    data: any;
    loading: boolean;
    error: any;
};

export const useFetchApi = (fetchUrl: string): TApiResponse => {
    const [status, setStatus] = useState<number>(0);
    const [data, setData] = useState<any>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    const getApiData = async () => {
        setLoading(true);
        try{
            const apiResponse = await fetch(fetchUrl);
            const json = await apiResponse.json();
            setStatus(apiResponse.status);
            setData(json);
        }
        catch(err) {
            console.log(err);
            setError(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getApiData();
    }, []);

    return { status, data, loading, error };
}