// import * as echarts from 'echarts';

import * as echarts from "echarts";
import '@/apis/china'
// import "@/apis/china"
// 每个图通用默认配置
let config = {
    textStyle: {
        color: "#fff",
    },
    grid: {
        top:"8%",
        left: '0%',
        right: '0%',
        bottom: '4%',
        containLabel: true,
        height : 'auto',
        width: 'auto',
        // containLabel: true
    },
}

// 左边线型图
export function line(select, line_data) {
    let {title, day_confirm, dayList_date} = line_data;
    let myChart = echarts.init(select);
    // 自定义配置
    // config.grid.top = "15%" // 设置上边框距离
    config.textStyle.fontSize = 14
    // 可视化配置
    let option = {
        // backgroundColor: '#080b30',
        
        title: {
            text: title, textStyle: config.textStyle,left: "center"
        },
        // tooltip: {
        //     show: true,
        //     trigger: 'axis',
        //     formatter: '{b0}: {c0}<br />{b1}: {c1}'
        // },
        axisPointer: {
            show: true,
            type: "line",
            axis: "auto",
        },
        link: [
            {
                xAxisName: "x"
            }
        ],
        grid: {
            top: "17%",
            // left: 0,
            width: "85%",
            height: "70%"
        },
        xAxis: [{
            name: "x",
            type: 'category',
            axisLine: {
                show: true
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                show: true
            },
            boundaryGap: true,
            data: dayList_date,
    
        }],
    
        yAxis: [{
            type: 'value',
            // min: 0,
            axisLine: {
                show: true,
            },
            axisLabel: {
                show: true,
                margin: 20,
                textStyle: {
                    color: '#d1e6eb',
                },
            },
            axisTick: {
                show: false,
            },
            scale: true // 以数据最小值开始
        }],
        series: [{
                // name: '注册总量',
                type: 'line',
                smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 25,
                lineStyle: {
                    normal: {
                        color: "#6c50f3",
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#6c50f3',
                    }
                },
                itemStyle: {
                    color: "#6c50f3",
                    borderColor: "#fff",
                    borderWidth: 3,
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 2,
                    shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(108,80,243,0.3)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(108,80,243,0)'
                            }
                        ], false),
                        shadowColor: 'rgba(108,80,243, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: day_confirm
            },
        ]
    };
    option && myChart.setOption(option);
    // 自适应窗口
    zsy(myChart)
}

// 左边柱状图
export function histogram(select, histogram_config) {
    let myChart = echarts.init(select);
    let option;
    config.grid.left = "1%"
    config.grid.top = "10%"
    config.grid.right = "5%"
    // let oblong_array = [] ; // 存放数据
    option = {
        title: {
            text: histogram_config.title,
            textStyle: {
                fontSize: 14,
                color: "#fff"
            },
            left:'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
                type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            },
            formatter: ""
        },
        // legend: {
        //     // data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine']
        // },
        grid: config.grid,
        xAxis: {
            type: 'value',
            axisLabel: {
                color: "#f6f6f6"
            }
        },
        yAxis: {
            type: 'category',
            data: histogram_config.city,
            axisLabel: {
                color: "#f6f6f6"
            },
            axisTick: true
        },
        series: [
            {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                center: ['50%', '50%'],
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: histogram_config.confirm
            }
        ]
    };

    option && myChart.setOption(option);
    zsy(myChart)
}

// 左边饼图
export function pie(select, pie_config) {
    let myChart = echarts.init(select);
    // 自定义配置
    //    config.grid.top = "15%" // 设置上边框距离
    // 可视化配置
    let option = {
        title: { text: pie_config.title,textStyle: config.textStyle},
        // 标签
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{b0}<br/>'
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [30, 100], // 控制大小
                center: ['45%', '55%'],  // 控制位置
                // roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: pie_config.data,
                label: {
                    color: "#f6f6f6"
                }
            }
        ]
    }
    option && myChart.setOption(option);
    // 自适应窗口
    zsy(myChart)
}

// 中间地图
export function map(select, data) {
    let myChart = echarts.init(select);
    let option = {
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{b0}: {c0}<br/>'
        },
        grid: {
            top:"20%",
            left: '0%',
            right: '0%',
            bottom: '2%',
            containLabel: true,
            height : 'auto',
            width: 'auto'
        },
        visualMap: {
            min: 0,
            max: 5000,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [{
            top: 40,
            type: 'map',
            map: 'china', // 自定义扩展图表类型
            zoom: 1.2,  
            roam: false,
            label: { // 地图单个板块设置
                show: true, // 显示
                fontSize: 10,
                color: '#f6f6f6'
            },
            selectedMode: false,
            itemStyle: {
              opacity: 0.8,
                areaColor: "#479de0"
            },
            emphasis: {
                label: {
                    fontSize: 10,
                    color: '#000000'
                }
            },
            data: data
        }],

    }
    option && myChart.setOption(option);
    // 自适应窗口
    zsy(myChart)
}

// pie_right 右边饼图
export function pie_right(select, pie_config) {

    let myChart = echarts.init(select);
    // 自定义配置
    config.grid.top = "15%" // 设置上边框距离
    config.textStyle.fontSize = 12
    // 可视化配置
    let option = {
        title: { text: pie_config.title,textStyle: config.textStyle,},
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{b0}<br/>'
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [10, 100], // 控制大小
                center: ['50%', '55%'],  // 控制位置
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: pie_config.data,
                label: {
                    color: "#f6f6f6"
                }
            }
        ]
    };

    option && myChart.setOption(option);
    // 自适应窗口
    zsy(myChart)
}

// 右边柱状图
export function histogram_r(select, his_rData) {
    let myChart = echarts.init(select);
    let option;

    option = {
        title: {text: his_rData.title, textStyle: {fontSize: 14,color: "#f6f6f6"},left:'center'},
        grid: {
            top:" 12%",
            left: '0%',
            right: '0%',
            bottom: '4%',
            containLabel: true,
            height : '90%',
            width: '90%',
        },
        xAxis: {
            type: 'category',
            data: his_rData.names,
            // nameGap: 1
            axisLabel: {
                show: true,
                interval: 0,
                rotate:40,
                color: "#f6f6f6"
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                interval: 1,
                color: "#f6f6f6"
            }
            // interval: 0
        },
        series: [{
            data: his_rData.values,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            },
            // center: ['10%', '55%']
        }]
    };

    option && myChart.setOption(option);
    zsy(myChart)
}

// 右边折线图
export function  line_r(select, config) {
    let myChart = echarts.init(select);

    let option = {
        title: {
            // rotate: -90,
            text: "",
            textStyle: {
                fontSize: 14,
                color: "#f6f6f6"
            },
            bottom: "center"
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontWeight: 200
            },
            borderWidth: 0,
            padding: 2
        },
        legend: {
            data: [config.data.data[0], config.data.data[1],config.data.data[2], config.data.data[3], '搜索引擎'],
            textStyle: {
                color:"#f6f6f6"
            }
        },
        grid: {
            top: "12%",
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: config.data.date
        },
        yAxis: {
            type: 'value',
            scale: true
        },
        series: config.data.data
    }

    option && myChart.setOption(option);
    zsy(myChart)
}
// echarts自适应组件
function zsy(myChart) {
    window.addEventListener('resize',()=>{
        myChart.resize()
    })
}
