import  axios from 'axios'

export function request (config) {
    const instance = axios.create({
        baseURL: 'api',
        timeout: 5000,
        crossDomain: true,//设置cross跨域
        withCredentials: true//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
    })
    //2.axios的拦截器
    //2.1 请求拦截
    instance.interceptors.request.use(config =>{
        // console.log(config);
        console.log("我是拦截器")
        //做一些操作
        // config.headers = ""
        //1、比如config的信息不符合服务器的要求，要对config做一些处理

        //2、比如每次发送网络请求时，都希望在界面中显示一个请求的图标
        
        //3、某些网络请求必须携带一些特殊的信息

        return config;
    },err => {
        console.log(err);
    })


    return instance(config)
}

//2.1 请求拦截
