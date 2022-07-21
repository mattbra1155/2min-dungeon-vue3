import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
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
    {
        path: '/player-dead',
        name: 'playerDead',
        component: () => import('../views/PlayerDead.vue'),
    },

]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

export default router
