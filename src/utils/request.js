import axios from 'axios'
import {Message} from "element-ui";
import router from '../router'
import Vue from 'vue'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = '/'
Vue.prototype.axios = axios
import storage from "@/utils/storage";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
axios.interceptors.request.use(config=>{
    config.headers['token']=storage.get('token')
    return config
},error => {
    return Promise.reject(error)
})
//相应拦截器
axios.interceptors.response.use(success => {
    //业务逻辑错误
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data.code == 401 ||
            success.data.code == 403) {
            Message.error({message: success.data.message});
            return;
        }
        if (success.data.message) {
            Message.success({message: success.data.message});
        }
    }
    return success.data;
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({message: '服务器被吃了o(╯□╰)o'});
    } else if (error.response.code == 403) {
        Message.error({message: '权限不足，请联系管理员！'});
    }else if (error.response.code==500){
        Message.error({message: '接口异常'});
    }
    else if (error.response.code == 401) {
        Message.error({message: '尚未登录，请登录'});
        router.replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message});
        } else {
            Message.error({message: '未知错误！'});
        }
    }
    return;
});