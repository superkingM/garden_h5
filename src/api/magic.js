import request from "@/utils/request";

//可合成花种列表
export function flower(data) {
    return request({
        url: '/api/magic/flower',
        method: 'get',
        params: data
    })
}

//合成要求列表
export function show(data) {
    return request({
        url: '/api/magic/show',
        method: 'get',
        params: data
    })
}
//合成
export function compound(data){
    return request({
        url: '/api/magic/compound',
        method: 'post',
        data
    })
}