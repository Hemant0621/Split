import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { darkModeState, loadingState } from '@/hooks/darkmode';
import { useRecoilState } from 'recoil';

function Spendinggraph() {
    const chartRef = useRef(null);

    const [dark, setDark] = useRecoilState(darkModeState);
    const color = dark?"#ffffff":"#333"
    const [loading, setloading] = useRecoilState(loadingState)

    useEffect(() => {
        if (chartRef.current) {
            // Create the echarts instance
            var myChart = echarts.init(chartRef.current);

            // Draw the chart
            myChart.setOption({
                title: {
                    text: 'Monthly Expensise ',
                    left: 'center',
                    textStyle: {
                        color: color,  // Title text color
                        fontSize: 20,   // Title font size
                        fontWeight: 'bold', // Title font weight
                        fontFamily: 'clash' // Title font family
                    }
                },
                tooltip: {
                    show:true,
                    trigger: 'axis',
                    backgroundColor: dark?'rgb(53, 49, 72,1)':'rgb(243, 170, 78)',  // Tooltip background color
                    textStyle: {
                        color: 'white',  // Tooltip text color
                        fontSize: 12,   // Tooltip font size
                        fontFamily: 'clash' // Tooltip font family
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',""],
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
                        data: [5, 20, 36, 10, 10, 20 , 0 ,0 ,12,23,34,15,20],
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

    }, [loading,color]);

    if(loading){
        return (
            <div className='w-full h-[82%] rounded-3xl bg-white  flex items-center justify-center'>
                <img src='/kUTME7ABmhYg5J3psM.gif' />
            </div>
        )
    }

    return (
        <div className='grid grid-cols-12 gap-10 '>
            <div className=' col-span-8 py-4 h-[25rem] mt-10 bg-white  dark:bg-[#353148]  rounded-3xl '>
                <div ref={chartRef} className="w-full h-full" ></div>
            </div>
            <div className=' col-span-4 bg-white dark:bg-[#353148]   rounded-3xl mt-10'>
            </div>
        </div>
    );
}

export default Spendinggraph;
