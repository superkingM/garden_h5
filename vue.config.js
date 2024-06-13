const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: './',
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        client: {
            overlay:false
        },
        port: 8066,//它是用来修改你打开后的端口号的
        open: false,//值为 true的话，项目启动时自动打开到浏览器里边， false不会打开
        proxy: {
            '/apis': {
                target: 'http://127.0.0.1:8788',//换成你自己项目的开发或者生产地址
                ws: false, //也可以忽略不写，不写不会影响跨域
                changeOrigin: true, //是否开启跨域，值为 true 就是开启， false 不开启
                pathRewrite: {
                    '^/apis': ''//注册全局路径， 但是在你请求的时候前面需要加上 /apis
                }
            }
        }
    }
})
