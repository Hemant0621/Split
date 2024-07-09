import { useEffect } from 'react';
import * as echarts from 'echarts';
import { useRecoilState } from 'recoil';
import { loadingState } from './darkmode';

const useECharts = (chartRef : any, data : Array<Float32Array>, daysArray : Array<String>, color : String, dark : boolean) => {



    useEffect(() => {
        if (chartRef.current && data.length > 0) {
            const myChart = echarts.init(chartRef.current);

            myChart.setOption({
                title: {
                    text: 'Monthly Expenses',
                    left: 'center',
                    textStyle: {
                        color: color,
                        fontSize: 20,
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
                        fontSize: 12,
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
                        fontSize: 12,
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
                        fontSize: 12,
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
                            fontSize: 12,
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
