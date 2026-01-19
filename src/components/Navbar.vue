<template>
    <nav class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md dark:shadow-lg dark:shadow-slate-900/50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 md:h-20">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <a :href="logoHref" class="flex items-center gap-3 group" @click="$emit('logo-click', $event)">
                        <div
                            class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <slot name="logo-icon">
                                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </slot>
                        </div>
                        <span
                            class="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                            {{ brandName }}
                        </span>
                    </a>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-2">
                    <a v-for="item in navItems" :key="item.label" :href="item.href"
                        class="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                        :class="{ 'text-indigo-600 dark:text-indigo-400': item.active }"
                        @click="$emit('nav-click', item, $event)">
                        {{ item.label }}
                        <span v-if="item.active"
                            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
                    </a>
                </div>

                <!-- Right Section -->
                <div class="flex items-center gap-4">
                    <!-- Search Button -->
                    <button v-if="showSearch"
                        class="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
                        @click="$emit('search-click', $event)">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Search...</span>
                        <kbd
                            class="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded">
                            <span class="text-xs">⌘</span>K
                        </kbd>
                    </button>

                    <!-- Theme Toggle -->
                    <button v-if="showThemeToggle"
                        class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-200 hover:scale-105"
                        aria-label="Toggle theme" @click="$emit('theme-toggle', $event)">
                        <slot name="theme-icon">
                            <svg v-if="isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </slot>
                    </button>

                    <!-- CTA Button -->
                    <button v-if="ctaText"
                        class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
                        @click="$emit('cta-click', $event)">
                        {{ ctaText }}
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                    <!-- Mobile Menu Button -->
                    <button
                        class="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle menu" @click="isMobileMenuOpen = !isMobileMenuOpen">
                        <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="isMobileMenuOpen"
                class="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-xl">
                <div class="px-4 py-4 space-y-1">
                    <a v-for="item in navItems" :key="item.label" :href="item.href"
                        class="block px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        :class="{ 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20': item.active }"
                        @click="isMobileMenuOpen = false; $emit('nav-click', item, $event)">
                        {{ item.label }}
                    </a>

                    <div v-if="ctaText" class="pt-3 border-t border-slate-200 dark:border-slate-800">
                        <button
                            class="w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg"
                            @click="isMobileMenuOpen = false; $emit('cta-click', $event)">
                            {{ ctaText }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface NavItem {
    label: string
    href: string
    active?: boolean
}

const props = withDefaults(defineProps<{
    brandName?: string
    logoHref?: string
    navItems?: NavItem[]
    showSearch?: boolean
    showThemeToggle?: boolean
    isDark?: boolean
    ctaText?: string
}>(), {
    brandName: 'WebFlow',
    logoHref: '/',
    navItems: () => [],
    showSearch: true,
    showThemeToggle: true,
    isDark: false,
    ctaText: ''
})

defineEmits<{
    'logo-click': [event: MouseEvent]
    'nav-click': [item: NavItem, event: MouseEvent]
    'search-click': [event: MouseEvent]
    'theme-toggle': [event: MouseEvent]
    'cta-click': [event: MouseEvent]
}>()

const isMobileMenuOpen = ref(false)

onMounted(() => {
    // Component mounted
})

onUnmounted(() => {
    // Component unmounted
})
</script>
