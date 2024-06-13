import request from "@/utils/request";

//获取图谱排行榜
export function atlas(data) {
    return request({
        url: '/api/rank/atlas',
        method: 'get',
        params: data
    })
}

//获取金币排行榜
export function gold(data) {
    return request({
        url: '/api/rank/gold',
        method: 'get',
        params: data
    })
}

//获取等级排行榜
export function level(data) {
    return request({
        url: '/api/rank/level',
        method: 'get',
        params: data
    })
}

//查询用户排行
export function queryRank(data) {
    return request({
        url: '/api/rank/queryRank',
        method: 'get',
        params: data
    })
}