import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loadingState } from './darkmode';
import { DATABASE_URL } from '@/config';

const useTrips = (type: String) => {
    const [Avg, setAvg] = useState('loading...')
    const [Total, setTotal] = useState('loading...')
    const [Count, setCount] = useState('loading...')
    const [Expensive, setExpensive] = useState('loading...')
    const [trips, settrips] = useState([])
    const [data, setdata] = useState<[{ name: string, value: number }]>([{ name: '', value: 0 }])


    useEffect(() => {

        async function result() {

            const response = await axios.get(`${DATABASE_URL}/party`, {
                params: {
                    type
                },
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.results) {
                console.log(response.data)
                settrips(response.data.results)
                setdata(response.data.category)
                setAvg(response.data.avg)
                setTotal(response.data.total)
                setCount(response.data.count)
                setExpensive(response.data.expensive)
            }
            else {
                setAvg('0')
                setTotal('0')
                setCount('0')
                setExpensive('0')
            }
        }

        result()
    }, [type])

    return {
        Avg,
        Total,
        Count,
        Expensive,
        trips, 
        data
    };
};

export default useTrips;
