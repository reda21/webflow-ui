import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Docs from './pages/Docs.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/components',
        redirect: '/docs/components/button',
    },
    {
        path: '/getting-started',
        redirect: '/docs/getting-started',
    },
    {
        path: '/docs',
        component: Docs,
        children: [
            {
                path: '',
                redirect: '/docs/getting-started',
            },
            {
                path: 'getting-started',
                name: 'docs-getting-started',
                component: () => import('./pages/docs/GettingStarted.vue'),
            },
            {
                path: 'components/navbar',
                name: 'docs-navbar',
                component: () => import('./pages/docs/components/Navbar.vue'),
            },
            {
                path: 'components/button',
                name: 'docs-button',
                component: () => import('./pages/docs/components/Button.vue'),
            },
            {
                path: 'components/button-group',
                name: 'docs-button-group',
                component: () => import('./pages/docs/components/ButtonGroup.vue'),
            },
            {
                path: 'components/social-button',
                name: 'docs-social-button',
                component: () => import('./pages/docs/components/SocialButton.vue'),
            },
            {
                path: 'theming',
                name: 'docs-theming',
                component: () => import('./pages/docs/Theming.vue'),
            },
            {
                path: 'dark-mode',
                name: 'docs-dark-mode',
                component: () => import('./pages/docs/DarkMode.vue'),
            },
            {
                path: 'components/avatar',
                name: 'docs-avatar',
                component: () => import('./pages/docs/components/Avatar.vue'),
            },
            {
                path: 'components/icon',
                name: 'docs-icon',
                component: () => import('./pages/docs/components/Icon.vue'),
            },
        ],

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
