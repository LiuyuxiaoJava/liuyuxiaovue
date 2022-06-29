import axios from "axios";
import request from "@/utils/request";
//自定义路径
let base = '';


//传送json格式的post请求
export function login(params) {
    return axios({
        method: 'post',
        url: `${base}/admin/login/status`,
        data: params
    })
}
export function getCodeImg(){
    return axios({
        method:'get',
        url: `${base}/captacha`,
        timeout:20000
    })
}
//传递json的put请求
export const putRequest = (params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
//传递json的get请求
export const getRequest = (params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
//传递json的delete请求
export const deleteRequest = (params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}