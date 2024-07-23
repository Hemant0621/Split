import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loadingState } from './darkmode';
import { DATABASE_URL } from '@/config';

const useTrips = (type: String , Refresh : boolean) => {
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
                settrips(response.data.results)
                response.data.category[0]?setdata(response.data.category):'';
                setAvg(response.data.avg)
                setTotal(response.data.total)
                setCount(response.data.count)
                setExpensive(response.data.expensive)
            }
            else {
                settrips([])
                setAvg('0')
                setTotal('0')
                setCount('0')
                setExpensive('None')
            }
        }

        result()
    }, [type , Refresh])

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
