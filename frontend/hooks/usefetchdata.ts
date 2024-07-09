import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loadingState } from './darkmode';

const useFetchData = (type : String, startdate : Date, enddate : Date ) => {
    const [loading, setLoading] = useRecoilState(loadingState);
    const [data, setData] = useState([]);
    const [daysArray, setDaysArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:3002/api/account/monthly', {
                    type,
                    startdate,
                    enddate
                }, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data)
                setData(response.data.data);
                setDaysArray(response.data.daysArray);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };

        fetchData();
    }, [type]);

    return { loading, data, daysArray };
};

export default useFetchData;
