import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Components from './pages/Components.vue'
import Docs from './pages/Docs.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/components',
        name: 'components',
        component: Components,
    },
    {
        path: '/docs',
        name: 'docs',
        component: Docs,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        return { top: 0 }
    },
})

export default router
