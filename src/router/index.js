import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( '@/views/flower/FlowerIndex.vue')
    },
    {
        path: '/login',
        component: () => import( '@/views/LoginView.vue')
    },
    {
        path: '/register',
        component: () => import('@/views/RegisterView.vue')
    },
    {
        path: '/plant/:id',
        component: () => import('@/views/flower/PlantView.vue')
    },
    {
        path: '/seedShop',
        component: () => import('@/views/flower/SeedShop.vue')
    },
    {
        path: '/addBasin',
        component: () => import('@/views/flower/AddBasin.vue')
    },
    {
        path: '/backpack',
        component: () => import('@/views/backpack/BackpackIndex.vue')
    },
    {
        path: '/backpack/plant/:id',
        component: () => import('@/views/backpack/PlantView.vue')
    },
    {
        path: '/rank',
        component: () => import('@/views/rank/RankView.vue')
    },
    {
        path: '/shop',
        component: () => import('@/views/shop/ShopIndex.vue')
    },
    {
        path: '/sign',
        component: () => import('@/views/sign/SignIndex.vue')
    },
    {
        path: '/magic',
        component: () => import('@/views/magic/MagicHouse.vue')
    },
    {
        path: '/magic/hc/:id',
        component: () => import('@/views/magic/FlowerCompound.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
