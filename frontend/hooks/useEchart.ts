import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { useRecoilState } from 'recoil';
import { loadingState } from './darkmode';

const useECharts = (chartRef : any, data : Array<Float32Array>, daysArray : Array<String>, color : String, dark : boolean) => {

    const [font , setfont ] = useState(15)
    
    useEffect(() => {
        if (chartRef.current && data.length > 0) {
            if(window.screen.width<500){
                setfont(7)
            }
            const myChart = echarts.init(chartRef.current);

            myChart.setOption({
                title: {
                    text: 'Monthly Expenses',
                    left: 'center',
                    textStyle: {
                        color: color,
                        fontSize: font+8,
                        fontWeight: 'bold',
                        fontFamily: 'clash'
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    backgroundColor: dark ? 'rgb(53, 49, 72,1)' : 'rgb(243, 170, 78)',
                    textStyle: {
                        color: 'white',
                        fontSize: font+5,
                        fontWeight: 'light',
                        fontFamily: 'clash'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: daysArray,
                    axisLine: {
                        lineStyle: {
                            color: color
                        }
                    },
                    axisLabel: {
                        color: color,
                        fontSize: font,
                        fontFamily: 'clash'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: color
                        }
                    },
                    axisLabel: {
                        color: color,
                        fontSize: font,
                        fontFamily: 'clash'
                    }
                },
                series: [
                    {
                        name: 'Expenses',
                        type: 'line',
                        smooth: true,
                        data: data,
                        lineStyle: {
                            color: '#73C0DE',
                            width: 3
                        },
                        itemStyle: {
                            color: '#73C0DE'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: color,
                            fontSize: font,
                            fontFamily: 'clash'
                        }
                    }
                ]
            });

            return () => {
                myChart.dispose();
            };
        }
    }, [chartRef, data, daysArray, color, dark]);
};

export default useECharts;
