import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        props: { default: true },
    },
    {
        path: '/character-creation',
        name: 'characterCreation',
        component: () => import('../views/CharacterCreation.vue'),
        props: { default: false },
    },
    {
        path: '/Inventory',
        name: 'inventory',
        component: () => import('../views/CharacterCreation.vue'),
        props: { default: false },
    },
    {
        path: '/town',
        name: 'town',
        component: () => import('../views/Town.vue'),
        props: { default: true },
    },
]

const router = createRouter({
    history: createWebHistory('/2min-dungeon-vue3/'),
    routes,
})

export default router
