<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Navbar, type NavItem } from '../src/index'

const route = useRoute()
const isDark = ref(false)
const brandName = ref('WebFlow UI')
const ctaText = ref('Get Started')
const showSearch = ref(true)
const showThemeToggle = ref(true)

const navItems = computed<NavItem[]>(() => [
    { label: 'Accueil', href: '/', active: route.path === '/' },
    { label: 'Documentation', href: '/docs', active: route.path.startsWith('/docs') },
])

const toggleDarkMode = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const handleNavClick = (item: NavItem, event: MouseEvent) => {
    // Navigation is handled by router-link, but we can log it
}

const handleSearchClick = () => {
    console.log('Search clicked')
}

const handleCtaClick = () => {
    console.log('CTA clicked')
}

watch(isDark, (dark) => {
    const html = document.documentElement
    if (dark) {
        html.classList.add('dark')
    } else {
        html.classList.remove('dark')
    }
})

onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
        isDark.value = savedTheme === 'dark'
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark.value = true
    }

    // Immediate application to avoid flicker
    document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
    <div class="min-h-screen">
        <!-- Background Effects -->
        <div class="bg-mesh"></div>
        <div class="bg-grid"></div>

        <!-- Navbar -->
        <Navbar :brand-name="brandName" logo-href="/" :nav-items="navItems" :show-search="showSearch"
            :show-theme-toggle="showThemeToggle" :is-dark="isDark" :cta-text="ctaText" @theme-toggle="toggleDarkMode"
            @nav-click="handleNavClick" @search-click="handleSearchClick" @cta-click="handleCtaClick">
            <template #nav-links>
                <router-link v-for="item in navItems" :key="item.label" :to="item.href"
                    class="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                    :class="{ 'text-indigo-600 dark:text-indigo-400': item.active }">
                    {{ item.label }}
                    <span v-if="item.active"
                        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
                </router-link>
            </template>
        </Navbar>

        <!-- Main Content -->
        <main class="relative z-10">
            <router-view />
        </main>

        <!-- Footer -->
        <footer class="footer">
            <p class="footer-text">
                WebFlow UI v0.0.3 • Fait avec
                <span class="footer-heart">❤️</span>
                par Reda21
            </p>
        </footer>
    </div>
</template>
