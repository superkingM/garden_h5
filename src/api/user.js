import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

export function register(data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/api/logout',
        method: 'get'
    })
}

export function getInfo() {
    return request({
        url: '/api/userInfo',
        method: 'get'
    })
}

export function changeName(data) {
    return request({
        url: '/api/changeName',
        method: 'post',
        data
    })
}

export function changeNotice(data) {
    return request({
        url: '/api/changeNotice',
        method: 'post',
        data
    })
}