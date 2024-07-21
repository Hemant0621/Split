import { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const useCategoryECharts = (chartRef : any) => {

    const [font , setfont ] = useState(15)
    
    useEffect(() => {
        if (chartRef.current) {
            if(window.screen.width<500){
                setfont(7)
            }
            const myChart = echarts.init(chartRef.current);

            myChart.setOption({
                backgroundColor: 'white',
                title: {
                  text: 'Category Purchases',
                  left: 'center',
                  top: 20,
                  textStyle: {
                    color: '#ccc'
                  }
                },
                tooltip: {
                  trigger: 'item'
                },
                visualMap: {
                  show: false,
                  min: 10,
                  max: 1000,
                  inRange: {
                    colorLightness: [0, 1]
                  }
                },
                series: [
                  {
                    name: 'Access From',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                      { value: 335, name: 'Direct' },
                      { value: 310, name: 'Email' },
                      { value: 274, name: 'Union Ads' },
                      { value: 235, name: 'Video Ads' },
                      { value: 400, name: 'Search Engine' }
                    ].sort(function (a, b) {
                      return a.value - b.value;
                    }),
                    roseType: 'radius',
                    label: {
                      color: 'rgba(0, 0, 0, 1)'
                    },
                    labelLine: {
                      lineStyle: {
                        color: 'rgba(0, 0, 0, .3)'
                      },
                      smooth: 0.2,
                      length: 10,
                      length2: 20
                    },
                    itemStyle: {
                      color: '#111820',
                      shadowBlur: 200,
                      shadowColor: 'rgba(0, 0, 0, 0)'
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function () {
                      return Math.random() * 600;
                    }
                  }
                ]
              });

            return () => {
                myChart.dispose();
            };
        }
    }, [chartRef]);
};

export default useCategoryECharts;
