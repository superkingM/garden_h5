import request from "@/utils/request";

//首页聊天
export function world() {
    return request({
        url: '/api/chat/world',
        method: 'get'
    })
}

//世界发言
export function push(data) {
    return request({
        url: '/api/chat/push',
        method: 'post',
        data
    })
}