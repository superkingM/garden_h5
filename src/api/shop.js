import request from "@/utils/request";

//花种商店
export function flower(data) {
    return request({
        url: '/api/shop/flower',
        method: 'get',
        params: data
    })
}

//道具商店
export function prop(data) {
    return request({
        url: '/api/shop/prop',
        method: 'get',
        params: data
    })
}

//购买道具
export function buyProp(data) {
    return request({
        url: '/api/shop/buyProp',
        method: 'post',
        data
    })
}