import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { darkModeState, loadingState } from '@/hooks/darkmode';
import { useRecoilState } from 'recoil';

function Spendinggraph() {
    const chartRef = useRef(null);

    const [dark, setDark] = useRecoilState(darkModeState);
    const color = dark ? "#ffffff" : "#333";
    const [loading, setLoading] = useRecoilState(loadingState);
    const [data, setData] = useState([]);
    const [type , settype ] = useState('');
    const today = new Date();
    const [startdate , setStartDate] = useState(new Date(today.getFullYear(), today.getMonth()-1, 1))
    const [enddate , setEndDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartRef.current && data.length > 0) {
            // Create the echarts instance
            var myChart = echarts.init(chartRef.current);

            // Draw the chart
            myChart.setOption({
                title: {
                    text: 'Monthly Expenses',
                    left: 'center',
                    textStyle: {
                        color: color,  // Title text color
                        fontSize: 20,   // Title font size
                        fontWeight: 'bold', // Title font weight
                        fontFamily: 'clash' // Title font family
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    backgroundColor: dark ? 'rgb(53, 49, 72,1)' : 'rgb(243, 170, 78)',  // Tooltip background color
                    textStyle: {
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'light',
                        fontFamily: 'clash'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    axisLine: {
                        lineStyle: {
                            color: color  // X-axis line color
                        }
                    },
                    axisLabel: {
                        color: color,  // X-axis label color
                        fontSize: 12,   // X-axis label font size
                        fontFamily: 'clash' // X-axis label font family
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: color  // Y-axis line color
                        }
                    },
                    axisLabel: {
                        color: color,  // Y-axis label color
                        fontSize: 12,   // Y-axis label font size
                        fontFamily: 'clash' // Y-axis label font family
                    }
                },
                series: [
                    {
                        name: 'Expenses',
                        type: 'line',
                        smooth: true,
                        data: data, // Use fetched data here
                        lineStyle: {
                            color: '#73C0DE',  // Line color
                            width: 3           // Line width
                        },
                        itemStyle: {
                            color: '#73C0DE'  // Point color
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: color,  // Label text color
                            fontSize: 12,   // Label font size
                            fontFamily: 'clash' // Label font family
                        }
                    }
                ]
            });
        }
    }, [color, data]);

    if (loading) {
        return (
            <div className='w-full h-[82%] rounded-3xl bg-white  flex items-center justify-center'>
                <img src='/kUTME7ABmhYg5J3psM.gif' />
            </div>
        );
    }

    return (
        <div className='grid grid-cols-12 gap-10 '>
            <div className='relative col-span-8 py-4 h-[25rem] mt-10 bg-white  dark:bg-[#353148]  rounded-3xl '>
                <div ref={chartRef} className="w-full h-full" ></div>
                <div className='absolute top-3 right-6  group/main text-end font-medium text-slate-400 p-1 cursor-pointer'>
                    Lifetime
                    <div className=' text-slate-800 shadow-md shadow-black absolute border bg-[#f3aa4e] border-red-600 w-40 flex-col gap-3 p-3 items-center -left-10 text-center rounded-lg  hidden group-hover/main:flex'>
                        <h1 className='bg-white hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36'>Year</h1>
                        <h1 className='bg-white hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36'>Month</h1>
                        <h1 className='bg-white hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36 group/sub'>
                            Custom
                            <div className=' text-slate-800 shadow-md shadow-black absolute border bg-[#f3aa4e] border-red-600 gap-3 p-3 items-center  text-center rounded-lg  hidden group-hover/sub:flex'>
                                <div className=''>
                                    <label htmlFor="Price" className="block text-black dark:text-white text-xl text-left w-full font-medium">Price</label>
                                    <input type='date' className=' w-full p-2 border border-black rounded-lg'  placeholder='Price' onChange={(e) => console.log(e.target.value)} />
                                </div>
                                <div className=''>
                                    <label htmlFor="Price" className="block text-black dark:text-white text-xl text-left w-full font-medium">Price</label>
                                    <input type='date' className=' w-full p-2 border border-black rounded-lg'  placeholder='Price' onChange={(e) => console.log(e.target.value)} />
                                </div>
                                <button>Apply</button>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
            <div className=' col-span-4 bg-white dark:bg-[#353148]   rounded-3xl mt-10'>
            </div>
        </div>
    );
}

export default Spendinggraph;
