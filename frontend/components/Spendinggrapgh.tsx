import React, { useEffect, useRef, useState } from 'react';
import useFetchData from '@/hooks/usefetchdata';
import useECharts from '@/hooks/useEchart';
import { darkModeState } from '@/hooks/darkmode';
import { useRecoilState } from 'recoil';
import axios from 'axios';

function Spendinggraph() {
    const chartRef = useRef(null);

    const [dark] = useRecoilState(darkModeState);
    const color = dark ? "#ffffff" : "#333";
    const today = new Date();
    const [startdate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [enddate, setEndDate] = useState(new Date(today.getFullYear(), today.getMonth() + 1, 1));
    const [type, setType] = useState('');
    const [past, setpast] = useState([])

    const { loading, data, daysArray } = useFetchData(type, startdate, enddate);
    useECharts(chartRef, data, daysArray, color, dark);

    useEffect(() => {
        async function result() {
            const response = await axios.get('https://split-backend-five.vercel.app/api/account/past', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setpast(response.data)
        }

        result()

    }, [])

    if (loading) {
        return (
            <div className='w-full h-full rounded-3xl bg-white flex items-center justify-center'>
                <img src='/kUTME7ABmhYg5J3psM.gif' />
            </div>
        );
    }

    return (
        <div className='w-full flex flex-col md:flex-row gap-5 md:gap-10 mt-8 md:px-5 h-full'>
            <div className='relative w-full flex justify-center pt-3 md:w-7/12 h-[40rem] md:h-full bg-white dark:bg-[#353148] rounded-xl md:rounded-2xl border border-black'>
                <div ref={chartRef} className="w-full h-full pl-2 " ></div>
                <button className='absolute top-3 right-2 md:right-6 group/main text-end text-sm md:text-base lg:text-lg font-medium text-red-700 md:text-slate-400 p-1 cursor-pointer'>
                    Year
                    <div className='text-slate-800 shadow-md shadow-black absolute bg-[#f3aa4e] dark:bg-[#353148] dark:text-white w-40 flex-col gap-3 p-3 items-center -left-28 md:-left-10 text-center rounded-lg hidden group-focus-within/main:flex z-20'>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-2 md:px-4 py-2 md:py-2 w-full' onClick={() => setType('')}>Year</h1>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-2 md:px-4 py-2 md:py-2 w-full' onClick={() => { setStartDate(new Date(today.getFullYear(), today.getMonth(), 1)); setEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 1)); setType('month') }}>Month</h1>
                        <button className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-2 md:px-4 py-2 md:py-2 w-full group/sub'>
                            Custom
                            <div className=' text-slate-800 shadow-md shadow-black absolute -left-48 md:-left-20 lg:left-5 bg-[#f3aa4e] dark:bg-[#353148] gap-3 p-3 items-center text-center rounded-lg hidden group-focus-within/sub:flex z-20'>
                                <div>
                                    <label htmlFor="startDate" className="block text-black dark:text-white text-base md:lg lg:text-xl text-left w-full font-medium">Start Date</label>
                                    <input type='date' className='w-full md:p-2 border border-black rounded-lg' placeholder='Start Date' onChange={(e) => setStartDate(new Date(e.target.value))} />
                                </div>
                                <div>
                                    <label htmlFor="endDate" className="block text-black dark:text-white text-base md:lg lg:text-xl text-left w-full font-medium">End Date</label>
                                    <input type='date' className='w-full md:p-2 border border-black rounded-lg' placeholder='End Date' onChange={(e) => setEndDate(new Date(e.target.value))} />
                                </div>
                                <button onClick={() => setType('custom')} className='rounded-xl py-1 px-3 md:py-2 md:px-5 bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] dark:text-white'>Apply</button>
                            </div>
                        </button>
                    </div>
                </button>
            </div>
            <div className=' w-full md:w-5/12 bg-white dark:bg-[#353148] rounded-xl md:rounded-2xl h-full border border-black'>
                <h1 className='w-full text-center font-bold text-base md:text-lg lg:text-2xl pt-2'>Last 10 Purchases</h1>
                <div className='w-full h-full flex flex-col gap-3 px-1 md:px-5  scrollbar scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-track-[#f3aa4e] dark:scrollbar-track-[#111820] '>
                    <div className=' px-2 md:px-8 py-2 flex w-full justify-between border-4 border-white dark:border-[#353148] border-b-[#f3aa4e] dark:border-b-[#111820] '>
                        <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-left '>Item</h1>
                        <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-center '>Category</h1>
                        <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-center '>price</h1>
                        <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-right '>Date</h1>
                    </div>


                    <div className=' px-2 md:px-5 scrollbar-thin h-[75%] py-1 overflow-y-auto flex flex-col gap-2 '>

                        {past.length>0?past.map((item:{
                            heading : string,
                            type : string,
                            price : {
                                $numberDecimal : Number
                            },
                            date : string,
                            _id : string
                        }) => (
                            <div key={item._id} className='flex justify-between w-full bg-[#f3aa4e] dark:bg-[#111820] rounded-lg p-2 md:p-3 transition-transform transform hover:scale-105 duration-300 border border-black'>
                                <h1 className='w-1/4 text-left text-xs md:text-sm break-words px-1'>{item.heading}</h1>
                                <h1 className='w-1/4 text-center text-xs md:text-sm break-words px-1'>{item.type}</h1>
                                <h1 className='w-1/4 text-center text-xs md:text-sm break-words px-1'>{item.price.$numberDecimal.toString()}</h1>
                                <h1 className='w-1/4 text-right text-xs md:text-sm break-words px-1'>{item.date.split('T')[0]}</h1>
                            </div>
                        )):<div className='text-center font-medium text-base md:text-xl'>No Purchases yet</div>}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Spendinggraph;
