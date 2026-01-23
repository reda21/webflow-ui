<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Active section is now based on route
const activeSection = computed(() => {
    if (route.path.includes('getting-started')) return 'installation'
    if (route.path.includes('navbar')) return 'navbar'
    if (route.path.includes('button-group')) return 'button-group'
    if (route.path.includes('social-button')) return 'social-button'
    if (route.path.includes('button')) return 'button'
    if (route.path.includes('theming')) return 'theming'
    if (route.path.includes('dark-mode')) return 'dark-mode'
    if (route.path.includes('avatar')) return 'avatar'
    if (route.path.includes('icon')) return 'icon'
    if (route.path.includes('tooltip')) return 'tooltip'
    if (route.path.includes('modal')) return 'modal'
    return ''
})

const scrollToSection = (sectionId: string) => {
    // No longer scrolling in one page, but navigation is handled by router-link
}
</script>

<template>
    <div class="flex min-h-[calc(100vh-80px)]">
        <!-- Sidebar -->
        <aside
            class="hidden lg:block w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm">
            <nav class="sticky top-20 p-6 space-y-8 max-h-[calc(100vh-80px)] overflow-y-auto">
                <!-- Getting Started -->
                <div>
                    <h5 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                        Pour commencer
                    </h5>
                    <ul class="space-y-1">
                        <li>
                            <router-link to="/docs/getting-started"
                                :class="[activeSection === 'installation' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Installation
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/getting-started#usage"
                                :class="[route.hash === '#usage' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Utilisation
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Components -->
                <div>
                    <h5 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                        Composants
                    </h5>
                    <ul class="space-y-1">
                        <li>
                            <router-link to="/docs/components/navbar"
                                :class="[activeSection === 'navbar' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Navbar
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/components/button"
                                :class="[activeSection === 'button' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Button
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/components/button-group"
                                :class="[activeSection === 'button-group' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                ButtonGroup
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/components/social-button"
                                :class="[activeSection === 'social-button' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                SocialButton
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/components/avatar"
                                :class="[activeSection === 'avatar' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Avatar
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/components/icon"
                                :class="[activeSection === 'icon' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Icon
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/components/tooltip"
                                :class="[activeSection === 'tooltip' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Tooltip
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/components/modal"
                                :class="[activeSection === 'modal' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Modal
                            </router-link>
                        </li>
                        <li>
                            <span
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 dark:text-slate-600 cursor-not-allowed">
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                Card
                                <span
                                    class="ml-auto text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">Soon</span>
                            </span>
                        </li>
                        <li>
                            <span
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 dark:text-slate-600 cursor-not-allowed">
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                Input
                                <span
                                    class="ml-auto text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">Soon</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <!-- Customization -->
                <div>
                    <h5 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                        Personnalisation
                    </h5>
                    <ul class="space-y-1">
                        <li>
                            <router-link to="/docs/theming"
                                :class="[activeSection === 'theming' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Thèmes
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/docs/dark-mode"
                                :class="[activeSection === 'dark-mode' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Dark Mode
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>

        <!-- Main Content (Router View) -->
        <div class="flex-1 min-w-0">
            <div class="max-w-4xl mx-auto px-6 lg:px-12 py-12">
                <router-view />
            </div>
        </div>
    </div>
</template>
