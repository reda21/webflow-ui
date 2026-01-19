<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Navbar, Button, SocialButton, ButtonGroup, type NavItem } from '../../src/index'

const isDark = ref(false)
const brandName = ref('WebFlow UI')
const ctaText = ref('Get Started')
const showSearch = ref(true)
const showThemeToggle = ref(true)

// Sidebar active section tracking
const activeSection = ref('installation')

// Demo nav items for Navbar preview
const demoNavItems = ref<NavItem[]>([
    { label: 'Home', href: '#', active: true },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
])

// Button Configurator State
type ButtonVariant = 'soft' | 'outlined' | 'subtle' | 'ghost' | 'link'
type ButtonRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
type ButtonShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'
type ButtonRing = 'none' | '1' | '2' | '4'

const selectedSeverity = ref<ButtonSeverity>('primary')
const selectedVariant = ref<ButtonVariant>('soft')
const selectedSize = ref<ButtonSize>('md')
const selectedRounded = ref<ButtonRounded>('md')
const selectedShadow = ref<ButtonShadow>('none')
const selectedRing = ref<ButtonRing>('none')

const severityOptions: ButtonSeverity[] = ['primary', 'secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast']
const variantOptions: ButtonVariant[] = ['soft', 'outlined', 'subtle', 'ghost', 'link']
const sizeOptions: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const roundedOptions: ButtonRounded[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full']
const shadowOptions: ButtonShadow[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner']
const ringOptions: ButtonRing[] = ['none', '1', '2', '4']

const buttonCodeExample = computed(() => {
    let props = ''
    if (selectedSeverity.value !== 'primary') {
        props += ` severity="${selectedSeverity.value}"`
    }
    if (selectedVariant.value !== 'soft') {
        props += ` variant="${selectedVariant.value}"`
    }
    if (selectedSize.value !== 'md') {
        props += ` size="${selectedSize.value}"`
    }
    if (selectedRounded.value !== 'md') {
        props += ` rounded="${selectedRounded.value}"`
    }
    if (selectedShadow.value !== 'none') {
        props += ` shadow="${selectedShadow.value}"`
    }
    if (selectedRing.value !== 'none') {
        props += ` ring="${selectedRing.value}"`
    }
    return `<Button${props}>Button</Button>`
})

// Scroll to section and update active section
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        activeSection.value = sectionId
    }
}

// Intersection observer for active section
let observer: IntersectionObserver | null = null

const setupIntersectionObserver = () => {
    const sections = document.querySelectorAll('section[id]')
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id
                }
            })
        },
        { rootMargin: '-20% 0px -80% 0px' }
    )
    sections.forEach((section) => observer?.observe(section))
}

onMounted(() => {
    setTimeout(setupIntersectionObserver, 100)
})

onUnmounted(() => {
    observer?.disconnect()
})
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
                            <a href="#installation" @click.prevent="scrollToSection('installation')"
                                :class="[activeSection === 'installation' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Installation
                            </a>
                        </li>
                        <li>
                            <a href="#usage" @click.prevent="scrollToSection('usage')"
                                :class="[activeSection === 'usage' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Utilisation
                            </a>
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
                            <a href="#navbar" @click.prevent="scrollToSection('navbar')"
                                :class="[activeSection === 'navbar' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Navbar
                            </a>
                        </li>
                        <li>
                            <a href="#button" @click.prevent="scrollToSection('button')"
                                :class="[activeSection === 'button' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Button
                            </a>
                        </li>
                        <li>
                            <a href="#button-group" @click.prevent="scrollToSection('button-group')"
                                :class="[activeSection === 'button-group' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                ButtonGroup
                            </a>
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
                        <li>
                            <span
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 dark:text-slate-600 cursor-not-allowed">
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                Modal
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
                            <a href="#theming" @click.prevent="scrollToSection('theming')"
                                :class="[activeSection === 'theming' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Thèmes
                            </a>
                        </li>
                        <li>
                            <a href="#dark-mode" @click.prevent="scrollToSection('dark-mode')"
                                :class="[activeSection === 'dark-mode' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800']"
                                class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Dark Mode
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">
            <div class="max-w-4xl mx-auto px-6 lg:px-12 py-12">
                <!-- Installation Section -->
                <section id="installation" class="scroll-mt-24 mb-20">
                    <div class="flex items-center gap-3 mb-6">
                        <span
                            class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Pour
                            commencer</span>
                    </div>
                    <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Installation
                    </h1>
                    <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
                        Installez WebFlow UI en quelques secondes avec npm ou yarn.
                    </p>

                    <div class="space-y-6">
                        <div
                            class="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                                <span class="text-xs font-medium text-slate-400">Terminal</span>
                            </div>
                            <pre
                                class="p-4 text-sm overflow-x-auto"><code class="text-emerald-400">npm install webflow-ui</code></pre>
                        </div>

                        <div
                            class="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                                <span class="text-xs font-medium text-slate-400">main.ts</span>
                            </div>
                            <pre
                                class="p-4 text-sm overflow-x-auto"><code><span class="text-purple-400">import</span> <span class="text-sky-400">'webflow-ui/style.css'</span></code></pre>
                        </div>
                    </div>
                </section>

                <!-- Usage Section -->
                <section id="usage" class="scroll-mt-24 mb-20">
                    <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Utilisation
                    </h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-8">
                        Importez les composants dont vous avez besoin et utilisez-les directement dans vos templates
                        Vue.
                    </p>

                    <div
                        class="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                            <span class="text-xs font-medium text-slate-400">MyComponent.vue</span>
                        </div>
                        <pre class="p-4 text-sm overflow-x-auto"><code><span class="text-slate-500">&lt;script setup&gt;</span>
<span class="text-purple-400">import</span> { <span class="text-yellow-400">Button</span>, <span class="text-yellow-400">Navbar</span> } <span class="text-purple-400">from</span> <span class="text-sky-400">'webflow-ui'</span>
<span class="text-slate-500">&lt;/script&gt;</span>

<span class="text-slate-500">&lt;template&gt;</span>
  <span class="text-pink-400">&lt;Navbar</span> <span class="text-sky-300">brand-name</span>=<span class="text-emerald-400">"Mon App"</span> <span class="text-pink-400">/&gt;</span>
  <span class="text-pink-400">&lt;Button</span> <span class="text-sky-300">severity</span>=<span class="text-emerald-400">"primary"</span><span class="text-pink-400">&gt;</span>Cliquez<span class="text-pink-400">&lt;/Button&gt;</span>
<span class="text-slate-500">&lt;/template&gt;</span></code></pre>
                    </div>
                </section>

                <!-- Navbar Section -->
                <section id="navbar" class="scroll-mt-24 mb-20">
                    <div class="flex items-center gap-3 mb-2">
                        <span
                            class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
                        <span
                            class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
                    </div>
                    <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Navbar
                    </h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-8">
                        Barre de navigation responsive avec support dark mode, bouton de recherche et menu mobile.
                    </p>

                    <!-- Preview -->
                    <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-8">
                        <div
                            class="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-red-500"></span>
                            <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span class="w-3 h-3 rounded-full bg-green-500"></span>
                            <span class="ml-4 text-xs text-slate-500">Prévisualisation</span>
                        </div>
                        <div class="bg-white dark:bg-slate-900">
                            <Navbar :brand-name="brandName" logo-href="#" :nav-items="demoNavItems" :show-search="true"
                                :show-theme-toggle="true" :is-dark="isDark" cta-text="Get Started" />
                        </div>
                    </div>

                    <!-- Props Table -->
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Props</h3>
                    <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                        <table class="w-full text-sm">
                            <thead class="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th class="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                                        Prop</th>
                                    <th class="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                                        Type</th>
                                    <th class="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                                        Défaut</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                                <tr>
                                    <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs">
                                        brandName</td>
                                    <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                        string</td>
                                    <td class="py-3 px-4 font-mono text-slate-500 text-xs">'WebFlow'</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs">
                                        navItems</td>
                                    <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                        NavItem[]</td>
                                    <td class="py-3 px-4 font-mono text-slate-500 text-xs">[]</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs">
                                        showSearch</td>
                                    <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                        boolean</td>
                                    <td class="py-3 px-4 font-mono text-slate-500 text-xs">true</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs">isDark
                                    </td>
                                    <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                        boolean</td>
                                    <td class="py-3 px-4 font-mono text-slate-500 text-xs">false</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs">ctaText
                                    </td>
                                    <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                        string</td>
                                    <td class="py-3 px-4 font-mono text-slate-500 text-xs">''</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <!-- Button Section -->
                <section id="button" class="scroll-mt-24 mb-20">
                    <div class="flex items-center gap-3 mb-2">
                        <span
                            class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
                        <span
                            class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
                    </div>
                    <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Button
                    </h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-8">
                        Boutons polyvalents avec variantes visuelles, états de chargement, icônes et support ARIA
                        complet.
                    </p>

                    <!-- Interactive Configurator -->
                    <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                        <!-- Configurator Header -->
                        <div
                            class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4">
                            <!-- Severity Select -->
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-medium text-slate-500 dark:text-slate-400">severity</span>
                                <div class="relative">
                                    <select v-model="selectedSeverity"
                                        class="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer">
                                        <option v-for="severity in severityOptions" :key="severity" :value="severity">
                                            {{ severity }}
                                        </option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Variant Select -->
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-medium text-slate-500 dark:text-slate-400">variant</span>
                                <div class="relative">
                                    <select v-model="selectedVariant"
                                        class="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer">
                                        <option v-for="variant in variantOptions" :key="variant" :value="variant">
                                            {{ variant }}
                                        </option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Size Select -->
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-medium text-slate-500 dark:text-slate-400">size</span>
                                <div class="relative">
                                    <select v-model="selectedSize"
                                        class="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer">
                                        <option v-for="size in sizeOptions" :key="size" :value="size">
                                            {{ size }}
                                        </option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Rounded Select -->
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-medium text-slate-500 dark:text-slate-400">rounded</span>
                                <div class="relative">
                                    <select v-model="selectedRounded"
                                        class="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer">
                                        <option v-for="rounded in roundedOptions" :key="rounded" :value="rounded">
                                            {{ rounded }}
                                        </option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Live Preview -->
                        <div
                            class="bg-white dark:bg-slate-900 p-12 flex items-center justify-center min-h-[160px] transition-colors duration-300">
                            <Button :severity="selectedSeverity" :variant="selectedVariant" :size="selectedSize"
                                :rounded="selectedRounded">
                                Button
                            </Button>
                        </div>

                        <!-- Code Preview -->
                        <div
                            class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                            <pre class="text-sm overflow-x-auto"><code><span class="text-pink-400">&lt;template&gt;</span>
  <span class="text-sky-400">{{ buttonCodeExample }}</span>
<span class="text-pink-400">&lt;/template&gt;</span></code></pre>
                        </div>
                    </div>

                    <!-- Variants -->
                    <div class="mb-12">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Variantes</h3>
                        <div
                            class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                            <Button variant="soft" severity="primary">Soft</Button>
                            <Button variant="outlined" severity="primary">Outlined</Button>
                            <Button variant="subtle" severity="primary">Subtle</Button>
                            <Button variant="ghost" severity="primary">Ghost</Button>
                            <Button variant="link" severity="primary">Link</Button>
                        </div>
                    </div>

                    <!-- Severities -->
                    <div class="mb-12">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Sévérités</h3>
                        <div
                            class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                            <Button severity="primary" rounded="full">Primary</Button>
                            <Button severity="secondary" rounded="full">Secondary</Button>
                            <Button severity="success" rounded="full">Success</Button>
                            <Button severity="info" rounded="full">Info</Button>
                            <Button severity="warn" rounded="full">Warning</Button>
                            <Button severity="danger" rounded="full">Danger</Button>
                            <Button severity="contrast" rounded="full">Contrast</Button>
                        </div>
                    </div>

                    <!-- Social -->
                    <div class="mb-12">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Social Buttons</h3>
                        <div
                            class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                            <SocialButton provider="google">
                                <template #icon>
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    </svg>
                                </template>
                                Google
                            </SocialButton>
                            <SocialButton provider="github">
                                <template #icon>
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </template>
                                GitHub
                            </SocialButton>
                            <SocialButton provider="facebook">Facebook</SocialButton>
                            <SocialButton provider="twitter">Twitter</SocialButton>
                            <SocialButton provider="linkedin">LinkedIn</SocialButton>
                        </div>
                    </div>

                    <!-- Sizes -->
                    <div class="mb-12">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tailles</h3>
                        <div
                            class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap items-center gap-4">
                            <Button size="xs">Extra Small</Button>
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                            <Button size="xl">Extra Large</Button>
                        </div>
                    </div>

                    <!-- States -->
                    <div class="mb-12">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">États</h3>
                        <div
                            class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap items-center gap-4">
                            <Button :loading="true">Loading...</Button>
                            <Button :disabled="true">Disabled</Button>
                            <Button rounded="full" severity="success">Rounded</Button>
                        </div>
                    </div>
                </section>

                <!-- ButtonGroup Section -->
                <section id="button-group" class="scroll-mt-24 mb-20">
                    <div class="flex items-center gap-3 mb-2">
                        <span
                            class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
                        <span
                            class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
                    </div>
                    <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        ButtonGroup
                    </h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-8">
                        Groupez des boutons horizontalement ou verticalement avec un rendu unifié.
                    </p>

                    <div
                        class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap items-start gap-8 mb-8">
                        <div>
                            <p class="text-xs font-medium text-slate-500 mb-3">Horizontal</p>
                            <ButtonGroup>
                                <Button variant="outlined" severity="primary">Left</Button>
                                <Button variant="outlined" severity="primary">Center</Button>
                                <Button variant="outlined" severity="primary">Right</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <p class="text-xs font-medium text-slate-500 mb-3">Vertical</p>
                            <ButtonGroup direction="vertical">
                                <Button severity="info" size="sm">Top</Button>
                                <Button severity="info" size="sm">Middle</Button>
                                <Button severity="info" size="sm">Bottom</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </section>

                <!-- Theming Section -->
                <section id="theming" class="scroll-mt-24 mb-20">
                    <div class="flex items-center gap-3 mb-2">
                        <span
                            class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Personnalisation</span>
                    </div>
                    <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Thèmes
                    </h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-8">
                        Personnalisez les couleurs et les styles en utilisant les variables CSS.
                    </p>

                    <div
                        class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
                        <p class="text-indigo-800 dark:text-indigo-300">
                            📝 Documentation complète sur les thèmes à venir...
                        </p>
                    </div>
                </section>

                <!-- Dark Mode Section -->
                <section id="dark-mode" class="scroll-mt-24 mb-20">
                    <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Dark Mode
                    </h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-8">
                        Tous les composants supportent nativement le dark mode via la classe <code
                            class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-sm">.dark</code> sur le
                        document.
                    </p>

                    <div
                        class="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                            <span class="text-xs font-medium text-slate-400">JavaScript</span>
                        </div>
                        <pre class="p-4 text-sm overflow-x-auto"><code><span class="text-slate-500">// Activer le dark mode</span>
                <span class="text-yellow-400">document</span>.<span class="text-sky-400">documentElement</span>.<span
                    class="text-purple-400">classList</span>.<span class="text-emerald-400">add</span>(<span
                    class="text-orange-400">'dark'</span>)</code></pre>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
