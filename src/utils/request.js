import axios from "axios";
import {Notify} from "vant"
import store from "@/store";

const service = axios.create({
    baseURL: '/apis',
    timeout: 90000,
    withCredentials: true
})
//请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers.Authorization = 'Bearer ' + store.getters.token;
        }
        return config
    }, error => {
        console.log(error)
        return Promise.reject(error)
    })
//响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            Notify({type: 'danger', message: res.msg || '系统错误', duration: 1000});
            if (res.code === 201) {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            }
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    }, error => {
        // console.log('err' + error)
        Notify({type: 'danger', message: error.message, duration: 1000});
        return Promise.reject(error)
    })
export default service