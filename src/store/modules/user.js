import {getToken, removeToken, setToken} from "@/utils/auth";
import {changeName, changeNotice, getInfo, login, logout} from "@/api/user";

const getDefaultState = () => {
    return {
        token: getToken(),
        username: '',
        gardenName: '花神',
        gardenNotice: '璀璨星空',
        level: 99,
        exp: 99999,
        gold: 99999999,
        levelName: '五星魔法帝',
        levelExp: 99999999,
        levelColor: '#7232dd',
        id: 0
    }
}

const state = getDefaultState();

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_USERNAME(state, username) {
        state.username = username;
    },
    SET_GARDEN_NAME(state, gardenName) {
        state.gardenName = gardenName;
    },
    SET_GARDEN_NOTICE(state, gardenNotice) {
        state.gardenNotice = gardenNotice;
    },
    SET_LEVEL(state, level) {
        state.level = level;
    },
    SET_EXP(state, exp) {
        state.exp = exp;
    },
    SET_GOLD(state, gold) {
        state.gold = gold;
    },
    SET_LEVEL_NAME(state, levelName) {
        state.levelName = levelName;
    },
    SET_LEVEL_EXP(state, levelExp) {
        state.levelExp = levelExp;
    },
    SET_LEVEL_COLOR(state, levelColor) {
        state.levelColor = levelColor;
    },
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_ID: (state, id) => {
        state.id = id
    },
}
const actions = {
    //用户登录
    login({commit}, userInfo) {
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            login({username: username, password: password}).then(response => {
                const {data} = response;
                commit('SET_TOKEN', data.token);
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //获取用户信息
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const {data} = response;
                if (!data) {
                    return reject('请登录')
                }
                commit('SET_USERNAME', data.username)
                commit('SET_GARDEN_NAME', data.gardenName)
                commit('SET_GARDEN_NOTICE', data.gardenNotice)
                commit('SET_LEVEL', data.level)
                commit('SET_EXP', data.exp)
                commit('SET_GOLD', data.gold)
                commit('SET_LEVEL_NAME', data.levelName)
                commit('SET_LEVEL_EXP', data.levelExp)
                commit('SET_LEVEL_COLOR', data.levelColor)
                commit('SET_ID',data.id)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //退出
    logout({commit}) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                removeToken()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //重置token
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken()
            commit('RESET_STATE')
            resolve()
        })
    },
    //修改昵称
    changeName({commit}, data) {
        return new Promise((resolve, reject) => {
            changeName(data).then(() => {
                commit('SET_GARDEN_NAME', data.name)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //修改公告
    changeNotice({commit}, data) {
        return new Promise((resolve, reject) => {
            changeNotice(data).then(() => {
                commit('SET_GARDEN_NOTICE', data.name)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}