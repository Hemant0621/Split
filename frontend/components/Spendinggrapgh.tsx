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
        <div className='w-full flex gap-10 mt-10 h-[53vh]'>
            <div className='relative w-7/12 py-4 h-full bg-white dark:bg-[#353148] rounded-3xl '>
                <div ref={chartRef} className="w-full h-full" ></div>
                <button className='absolute top-3 right-6 group/main text-end font-medium text-slate-400 p-1 cursor-pointer'>
                    Year
                    <div className='text-slate-800 shadow-md shadow-black absolute bg-[#f3aa4e] dark:bg-[#353148] dark:text-white w-40 flex-col gap-3 p-3 items-center -left-10 text-center rounded-lg hidden group-focus-within/main:flex'>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36' onClick={() => setType('')}>Year</h1>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36' onClick={() => { setStartDate(new Date(today.getFullYear(), today.getMonth(), 1)); setEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 1)); setType('month') }}>Month</h1>
                        <button className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36 group/sub'>
                            Custom
                            <div className='text-slate-800 shadow-md shadow-black absolute bg-[#f3aa4e] dark:bg-[#353148] gap-3 p-3 items-center text-center rounded-lg hidden group-focus-within/sub:flex'>
                                <div className=''>
                                    <label htmlFor="startDate" className="block text-black dark:text-white text-xl text-left w-full font-medium">Start Date</label>
                                    <input type='date' className='w-full p-2 border border-black rounded-lg' placeholder='Start Date' onChange={(e) => setStartDate(new Date(e.target.value))} />
                                </div>
                                <div className=''>
                                    <label htmlFor="endDate" className="block text-black dark:text-white text-xl text-left w-full font-medium">End Date</label>
                                    <input type='date' className='w-full p-2 border border-black rounded-lg' placeholder='End Date' onChange={(e) => setEndDate(new Date(e.target.value))} />
                                </div>
                                <button onClick={() => setType('custom')} className='rounded-xl py-2 px-5 bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] dark:text-white'>Apply</button>
                            </div>
                        </button>
                    </div>
                </button>
            </div>
            <div className='w-5/12 bg-white dark:bg-[#353148] rounded-3xl h-full'>
                <div className='w-full h-full flex flex-col gap-4 px-5 py-5 '>
                    <div className=' px-5 flex w-full justify-between '>
                        <h1 className=' w-1/4 font-bold font-Clash text-xl text-left '>Item</h1>
                        <h1 className=' w-1/4 font-bold font-Clash text-xl text-center '>Category</h1>
                        <h1 className=' w-1/4 font-bold font-Clash text-xl text-center '>price</h1>
                        <h1 className=' w-1/4 font-bold font-Clash text-xl text-right '>Date</h1>
                    </div>


                    <div className='px-5 scrollbar-thin h-[90%] overflow-y-auto flex flex-col gap-2 '>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        <div className='flex justify-between w-full bg-[#f3aa4e] rounded-lg p-3 transition-transform transform hover:scale-105 duration-300'>
                            <h1 className='w-1/4 text-left'>Item</h1>
                            <h1 className='w-1/4 text-center'>Category</h1>
                            <h1 className='w-1/4 text-center'>price</h1>
                            <h1 className='w-1/4 text-right'>2024-07-05</h1>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Spendinggraph;
