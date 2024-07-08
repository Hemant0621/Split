import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loadingState } from './darkmode';

const useFetchData = (type : String, startdate : Date, enddate : Date) => {
    const [loading, setLoading] = useRecoilState(loadingState);
    const [data, setData] = useState([]);
    const [daysArray, setDaysArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.post('https://split-backend-five.vercel.app/api/account/monthly', {
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
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    return { loading, data, daysArray };
};

export default useFetchData;
