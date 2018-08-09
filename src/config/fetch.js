import axios from "axios";
import  qs from "qs";
axios.defaults.baseURL="http://47.92.137.197:8090"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.response.use(function (response) {//响应拦截
    return response.data;//处理返回的数据
}, function (error) {
    return Promise.reject(err);//里面的值会被catch捕捉
});

export const axiosPost=function(url,params){
    return new Promise((suc,err)=>{
        axios({
            method: 'POST',
            url: url,
            data: qs.stringify(params),
        }).then(res=>{
            suc(res)
        });
    })
}

export const axiosGet=function(url,params){
    return new Promise((suc,err)=>{
        axios.get(url,{params:params})
            .then((res)=>{
                suc(res)
            })
            .catch((res)=>{
                err(res)
            })
    })
}
