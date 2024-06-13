import request from "@/utils/request";

export function flowerpotList() {
    return request({
        url: '/api/flowerpot/list',
        method: 'get'
    })
}

export function harvest(data) {
    return request({
        url: '/api/flowerpot/harvest',
        method: 'post',
        data
    })
}

export function plantBasin(id) {
    return request({
        url: '/api/flowerpot/plantBasin',
        method: 'get',
        params: {id: id}
    })
}

export function plantBag(data) {
    return request({
        url: '/api/flowerpot/plantBag',
        method: 'get',
        params: data
    })
}

export function plant(data) {
    return request({
        url: '/api/flowerpot/plant',
        method: 'post',
        data
    })
}

export function water(data) {
    return request({
        url: '/api/flowerpot/water',
        method: 'post',
        data
    })
}

export function bug(data) {
    return request({
        url: '/api/flowerpot/bug',
        method: 'post',
        data
    })
}

export function grass(data) {
    return request({
        url: '/api/flowerpot/grass',
        method: 'post',
        data
    })
}

export function dye(data) {
    return request({
        url: '/api/flowerpot/dye',
        method: 'post',
        data
    })
}

export function dyeList(data) {
    return request({
        url: '/api/flowerpot/dyeList',
        method: 'get',
        params: data
    })
}

export function seedShop(data) {
    return request({
        url: '/api/flowerpot/seedShop',
        method: 'get',
        params: data
    })
}

export function buySeed(data) {
    return request({
        url: '/api/flowerpot/buySeed',
        method: 'post',
        data
    })
}

export function atlas() {
    return request({
        url: '/api/flowerpot/atlas',
        method: 'get'
    })
}

export function nextBasin() {
    return request({
        url: '/api/flowerpot/nextBasin',
        method: 'get'
    })
}

export function addBasin() {
    return request({
        url: '/api/flowerpot/addBasin',
        method: 'post',
    })
}