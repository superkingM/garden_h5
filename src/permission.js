import router from "@/router";
import {getToken} from "@/utils/auth";
import store from "@/store";

const whiteList = ['/login','/register']

router.beforeEach(async (to, from, next) => {
    const token = getToken();
    if (token) {
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            const hasGetUserInfo = store.getters.username
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    await store.dispatch('user/getInfo')
                    next()
                } catch (error) {
                    console.log(error)
                }
            }

        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }

    }
})