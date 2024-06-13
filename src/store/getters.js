const getters = {
    token: state => state.user.token,
    username: state => state.user.username,
    gardenName: state => state.user.gardenName,
    gardenNotice: state => state.user.gardenNotice,
    level: state => state.user.level,
    exp: state => state.user.exp,
    gold: state => state.user.gold,
    levelExp: state => state.user.levelExp,
    levelName: state => state.user.levelName,
    levelColor: state => state.user.levelColor,
}
export default getters