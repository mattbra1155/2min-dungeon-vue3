import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        props: { default: true }
    },
    {
        path: '/character-creation',
        name: 'characterCreation',
        component: () => import('../views/CharacterCreation.vue'),
        props: { default: false }
        
    },
    {
        path: '/Inventory',
        name: 'inventory',
        component: () => import('../views/CharacterCreation.vue'),
        props: { default: false }
    },
    {
        path: '/player-dead',
        name: 'playerDead',
        component: () => import('../views/PlayerDead.vue'),
        props: { default: false }
    },
    {
        path: '/level-finished',
        name: 'levelFinished',
        component: () => import('../views/LevelFinished.vue'),
        props: { default: true }
    },

]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

export default router
