import request from "@/utils/request";

export function list(data) {
    return request({
        url: '/api/backpack/list',
        method: 'get',
        params: data
    })
}

export function seed(data) {
    return request({
        url: '/api/backpack/seed',
        method: 'get',
        params: data
    })
}

export function emptyBasin() {
    return request({
        url: '/api/backpack/emptyBasin',
        method: 'get'
    })
}

//背包道具
export function prop(data) {
    return request({
        url: '/api/backpack/prop',
        method: 'get',
        params: data
    })
}