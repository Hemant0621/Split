import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loadingState } from './darkmode';
import { DATABASE_URL } from '@/config';

const useFetchData = (type : String, startdate : Date, enddate : Date , Refresh : boolean) => {
    const [loading, setLoading] = useRecoilState(loadingState);
    const [data, setData] = useState([]);
    const [daysArray, setDaysArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`${DATABASE_URL}/account/monthly`, {
                    type,
                    startdate,
                    enddate
                }, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setData(response.data.data);
                setDaysArray(response.data.daysArray);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };

        fetchData();
    }, [type , Refresh]);

    return { loading, data, daysArray };
};

export default useFetchData;
