import React, { useRef, useState } from 'react';
import useFetchData from '@/hooks/usefetchdata';
import useECharts from '@/hooks/useEchart';
import { darkModeState } from '@/hooks/darkmode';
import { useRecoilState } from 'recoil';

function Spendinggraph() {
    const chartRef = useRef(null);

    const [dark] = useRecoilState(darkModeState);
    const color = dark ? "#ffffff" : "#333";
    const today = new Date();
    const [startdate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [enddate, setEndDate] = useState(new Date(today.getFullYear(), today.getMonth() + 1, 1));
    const [type, setType] = useState('');

    const { loading, data, daysArray } = useFetchData(type, startdate, enddate);
    useECharts(chartRef, data, daysArray, color, dark);

    if (loading) {
        return (
            <div className='w-full h-[82%] rounded-3xl bg-white flex items-center justify-center'>
                <img src='/kUTME7ABmhYg5J3psM.gif' />
            </div>
        );
    }

    return (
        <div className='grid grid-cols-12 gap-10 '>
            <div className='relative col-span-8 py-4 h-[25rem] mt-10 bg-white dark:bg-[#353148] rounded-3xl '>
                <div ref={chartRef} className="w-full h-full" ></div>
                <div className='absolute top-3 right-6 group/main text-end font-medium text-slate-400 p-1 cursor-pointer'>
                    Year
                    <div className='text-slate-800 shadow-md shadow-black absolute bg-[#f3aa4e] dark:bg-[#353148] dark:text-white w-40 flex-col gap-3 p-3 items-center -left-10 text-center rounded-lg hidden group-hover/main:flex'>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36' onClick={() => setType('')}>Year</h1>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36' onClick={() => setType('month')}>Month</h1>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36 group/sub'>
                            Custom
                            <div className='text-slate-800 shadow-md shadow-black absolute bg-[#f3aa4e] dark:bg-[#353148] gap-3 p-3 items-center text-center rounded-lg hidden group-hover/sub:flex'>
                                <div className=''>
                                    <label htmlFor="startDate" className="block text-black dark:text-white text-xl text-left w-full font-medium">Start Date</label>
                                    <input type='date' className='w-full p-2 border border-black rounded-lg' placeholder='Start Date' onChange={(e) =>setStartDate(new Date(e.target.value))} />
                                </div>
                                <div className=''>
                                    <label htmlFor="endDate" className="block text-black dark:text-white text-xl text-left w-full font-medium">End Date</label>
                                    <input type='date' className='w-full p-2 border border-black rounded-lg' placeholder='End Date' onChange={(e) =>setEndDate(new Date(e.target.value))} />
                                </div>
                                <button onClick={() => setType('custom')} className='rounded-xl py-2 px-5 bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] dark:text-white'>Apply</button>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
            <div className='col-span-4 bg-white dark:bg-[#353148] rounded-3xl mt-10'></div>
        </div>
    );
}

export default Spendinggraph;
