import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/character-creation',
        name: 'characterCreation',
        component: () => import('../views/CharacterCreation.vue'),
    },
    {
        path: '/Inventory',
        name: 'inventory',
        component: () => import('../views/CharacterCreation.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
