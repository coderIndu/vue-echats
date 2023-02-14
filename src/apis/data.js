import {request} from '@/network/request'
const currentYear = new Date().getFullYear()
const re = new RegExp(`(?<=${currentYear}-).*`)

// 获取数据
export function getData() {
    let rs = null;
    return request("/ug/api/wuhan/app/data/list-total").then(function ({data}) {
        // return res
        return data
    }).catch(err=>{
        // console.log(err);
        throw err;
    })
    // console.log(rs/
    // return rs
}
// 左边折线图数据
export  function lineData(data) {
    let chinaDayList = data.chinaDayList
    let dayList_date = []  // 保存最近五天的数据
    let day_confirm = []  // 保存最近五天的确诊数
    // 提取最近五天的数据
    for (let i = chinaDayList.length - 1; i > chinaDayList.length - 6; i--) {

        let formatDate = chinaDayList[i].date.replace("-","\/")
        // console.log(formatDate)
        day_confirm.push(chinaDayList[i].today.confirm)
        dayList_date.push(formatDate)
    }
    return [day_confirm.reverse(), dayList_date.reverse()]
}

// 左边柱状图数据: 查找全国新增人数最多的地区
export function  histogramData(data) {
    let { areaTree } = data
    let map = new Map()  // 存放数据

    // console.log(areaTree)
    for (let i = 0; i < areaTree.length; i++) {
        if (areaTree[i].name == "中国"){
            // console.log(areaTree[i])
            let children = areaTree[i].children
            for (let j = 0; j < children.length; j++) {
                let city = children[j].name
                let confirm = children[j].today.confirm
                map.set(city, confirm)
                // console.log(children[i].name)
            }
            break;
        }
    }
    // console.log(map)
    // 对map对象value进行排序
    let arrayObj=Array.from(map)
    // 对象排序后保存为数组
    let sortData = arrayObj.sort(function(a,b){return b[1]-a[1]})
    // 取出七天排行数据
    let city = [] // 存放城市
    let confirm = [] // 存放每日感染人数
    for (let i = 0; i < 7; i++) {
        city.push(sortData[i][0])
        confirm.push(sortData[i][1])
    }
    return [city, confirm]
}

// 左边饼图数据
export function pieData(data) {
    let input = data.chinaTotal.total.input // 境外输入
    let noSymptom = data.chinaTotal.extData.noSymptom  // 无症状感染者
    let total_confirm = data.chinaTotal.total.confirm  // 累计确诊
    let dead = data.chinaTotal.total.dead // 累计死亡
    let heal = data.chinaTotal.total.heal // 累计治愈
    let now_confirm = total_confirm - dead - heal // 现有确诊
    // pie_array.push({
    //     value: input,
    //     name:
    // })
    let pie_data = [
        {value: input,name: "境外输入"+input},
        {name: "无症状感染者"+noSymptom, value: noSymptom},
        {name: "现有确诊"+now_confirm, value: now_confirm},
       // {name: "累计确诊", value: total_confirm},
        {name: "累计死亡"+dead, value: dead},
        {name: "已治愈"+heal, value: heal}
        ]
    return pie_data
}

// 中间框显示数据
export function centerData(data) {
    let total_confirm = data.chinaTotal.total.confirm  // 累计确诊
    let heal = data.chinaTotal.total.heal // 累计治愈
    return {
        confirm: total_confirm,
        heal: heal
    }
}

// 中间部分地图数据处理
export function mapData(data) {
    let { areaTree } = data
    let array = []
    // 找到中国
    for (let i = 0; i < areaTree.length; i++) {
        if (areaTree[i].name == "中国") {
            let citys = areaTree[i].children // 获取中国全部省份数组
            for (let j = 0; j <citys.length; j++) {
                let city = citys[j].name // 获取所有的城市名称
                let { confirm } = citys[j].total
                array.push({
                    name: city,
                    value: confirm
                })
            }
        }
    }
    return array
}


// 右边饼图数据
export function pie_rightData(data) {
    let {areaTree} = data // 选择全球区域部分
    let array = [] // 存放地区和确诊数
    for (let i = 0; i < areaTree.length; i++) {
        let area = areaTree[i].name // 地区名
        let confirm = areaTree[i].total.confirm // 地区的累计确诊数
        array.push({
            value: confirm,
            name: area+":\n"+confirm
        })
    }
    // 对数组进行排序
    array = array.sort(function (a, b){
        return b.value - a.value
    })

    let newData = []
    // 选出排名前十的国家或地区
    for (let i = 0; i < 10; i++) {
        newData.push(array[i])
    }

    return newData
}

// 右边柱状图数据
export function histogram_rData(data) {
    let { areaTree } = data // 选择全球区域部分
    let array = [] // 存放地区和确诊数
    for (let i = 0; i < areaTree.length; i++) {
        let {name} = areaTree[i] // 地区名
        let {confirm} = areaTree[i].today // 地区的累计确诊数
        array.push({
            value: confirm,
            name: name
        })
    }
    // 对数组进行排序
    array = array.sort(function (a, b){
        return b.value - a.value
    })

    let newData = []
    // 选出排名前十的国家或地区
    let info = {
        names: [],
        values: []
    }
    // 对象存放两个数组
    for (let i = 0; i < 10; i++) {
        info.names.push(array[i].name)
        info.values.push(array[i].value)
    }

    return info
}

// 右边折线图数据
export function line_rData(data) {
    let { chinaDayList } = data
    // 最近七天新增数据数据
    let array = {
        date: [],
        data: [
            {
                name: "治愈",
                data: [],
                type: 'line',
                stack: '总量',
            },
            {
                name: "死亡",
                data: [],
                type: 'line',
                stack: '总量',
            },
            {
                name: "确诊",
                data: [],
                type: 'line',
                stack: '总量',
            },
            {
                name: "境外输入",
                data: [],
                type: 'line',
                stack: '总量',
            }, {
                name: "疑似病例",
                data: [],
                type: 'line',
                stack: '总量',
            },
        ]
    } // 存放数据
    // console.log(chinaDayList)

    for (let i = chinaDayList.length-8; i < chinaDayList.length-1; i++) {
        
        let date = chinaDayList[i+1].date.replace("-","\/")
        // console.log(date)
        // console.log(chinaDayList[i].date)
        let {heal, dead, storeConfirm, input} = chinaDayList[i].total // 治愈，死亡，确诊，境外输入
        let {suspect} = chinaDayList[i].today

        let after_heal = chinaDayList[i+1].total.heal
        let after_dead = chinaDayList[i+1].total.dead
        let after_storeConfirm = chinaDayList[i+1].total.storeConfirm
        let after_input= chinaDayList[i+1].total.input

        heal  = after_heal - heal
        dead  = after_dead - dead
        storeConfirm  = after_storeConfirm - storeConfirm
        input  = after_input - input

        // 添加数据
        // if(chinaDayList[i].extData != null) {incrNoSymptom = chinaDayList[i].extData.incrNoSymptom}
        array.date.push(date)
        array.data[0].data.push(heal)
        array.data[1].data.push(dead)
        array.data[2].data.push(storeConfirm)
        array.data[3].data.push(input)
        array.data[4].data.push(suspect)

    }
    // array.data = array
    return array
}