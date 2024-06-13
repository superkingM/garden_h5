import request from "@/utils/request";

//签到
export function doSign() {
    return request({
        url: '/api/sign/do',
        method: 'get'
    })
}

//签到日志
export function signLog() {
    return request({
        url: '/api/sign/signLog',
        method: 'get',
    })
}