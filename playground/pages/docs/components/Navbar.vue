<script setup lang="ts">
import { ref } from 'vue'
import { Navbar, type NavItem } from '../../../../src/index'

const demoNavItems = ref<NavItem[]>([
    { label: 'Home', href: '#', active: true },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
])
</script>

<template>
    <section id="navbar" class="scroll-mt-24 mb-20">
        <div class="flex items-center gap-3 mb-2">
            <span
                class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Navbar
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Barre de navigation responsive avec support dark mode, bouton de recherche et menu mobile.
        </p>

        <!-- Preview -->
        <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-8 shadow-sm">
            <div
                class="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span class="w-3 h-3 rounded-full bg-green-500"></span>
                <span class="ml-4 text-xs text-slate-500">Prévisualisation</span>
            </div>
            <div class="bg-white dark:bg-slate-900">
                <Navbar brand-name="WebFlow UI" logo-href="#" :nav-items="demoNavItems" :show-search="true"
                    :show-theme-toggle="true" :is-dark="false" cta-text="Get Started" />
            </div>
        </div>

        <!-- Props Table -->
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Props</h3>
        <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table class="w-full text-sm">
                <thead class="bg-slate-50 dark:bg-slate-800">
                    <tr>
                        <th class="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Prop</th>
                        <th class="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Type</th>
                        <th class="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Défaut</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs">brandName</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'WebFlow'</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
