import { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const useCategoryECharts = (chartRef : any , data : [{name : string , value : number}]) => {

    const [font , setfont ] = useState(15)
    
    useEffect(() => {
        if (chartRef.current && data[0].value>0) {
            if(window.screen.width<500){
                setfont(7)
            }
            const len = data.length-1
            const myChart = echarts.init(chartRef.current);
            console.log(data)
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
                  min: data.sort()[0].value*0.9,
                  max: data.sort()[len].value*1.1,
                  inRange: {
                    colorLightness: [0.2, 0.8]
                  }
                },
                series: [
                  {
                    name: 'Access From',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: data.sort(function (a, b) {
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
    }, [chartRef , data]);
};

export default useCategoryECharts;
