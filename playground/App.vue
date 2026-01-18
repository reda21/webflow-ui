<template>
    <div class="min-h-screen">
        <!-- Background Effects -->
        <div class="bg-mesh"></div>
        <div class="bg-grid"></div>

        <!-- Navbar Component Demo -->
        <Navbar :brand-name="brandName" logo-href="#" :nav-items="navItems" :show-search="showSearch"
            :show-theme-toggle="showThemeToggle" :is-dark="isDark" :cta-text="ctaText" @theme-toggle="toggleDarkMode"
            @nav-click="handleNavClick" @search-click="handleSearchClick" @cta-click="handleCtaClick" />

        <!-- Main Content -->
        <main class="relative z-10 pt-24">
            <!-- Hero Section -->
            <section class="max-w-6xl mx-auto px-6 py-20">
                <div class="text-center">
                    <!-- Badge -->
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-8 animate-fade-up">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                            Component Playground v0.0.3
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-up delay-100">
                        <span class="gradient-text">WebFlow UI</span>
                    </h1>

                    <!-- Subtitle -->
                    <p
                        class="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 animate-fade-up delay-200">
                        Une bibliothèque de composants Vue 3 moderne, accessible et belle.
                        <span class="text-indigo-600 dark:text-indigo-400 font-semibold">Construite pour
                            impressionner.</span>
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap items-center justify-center gap-4 animate-fade-up delay-300">
                        <button class="btn-primary">
                            <span>🚀</span>
                            <span>Commencer</span>
                        </button>
                        <button class="btn-secondary">
                            <span>📖</span>
                            <span>Documentation</span>
                        </button>
                    </div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-up delay-400">
                    <div class="glass-card stat-item">
                        <div class="stat-number gradient-text">5+</div>
                        <div class="stat-label">Composants</div>
                    </div>
                    <div class="glass-card stat-item">
                        <div class="stat-number gradient-text">100%</div>
                        <div class="stat-label">TypeScript</div>
                    </div>
                    <div class="glass-card stat-item">
                        <div class="stat-number gradient-text">A11y</div>
                        <div class="stat-label">Accessible</div>
                    </div>
                    <div class="glass-card stat-item">
                        <div class="stat-number gradient-text">0</div>
                        <div class="stat-label">Dépendances</div>
                    </div>
                </div>
            </section>

            <!-- Live Preview Section -->
            <section class="max-w-6xl mx-auto px-6 py-16">
                <div class="section-header">
                    <span class="section-label">
                        <span>⚡</span>
                        <span>Démo Interactive</span>
                    </span>
                    <h2 class="section-title">Personnalisez en temps réel</h2>
                    <p class="section-description">
                        Modifiez les propriétés du composant et voyez les changements instantanément.
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-8">
                    <!-- Controls -->
                    <div class="glass-card p-8">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
                            <span class="text-2xl">🎛️</span>
                            Contrôles
                        </h3>

                        <div class="space-y-6">
                            <!-- Brand Name Input -->
                            <div>
                                <label class="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Nom de la marque
                                </label>
                                <input v-model="brandName" type="text" class="input-modern" placeholder="WebFlow UI">
                            </div>

                            <!-- CTA Text Input -->
                            <div>
                                <label class="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Texte du bouton CTA
                                </label>
                                <input v-model="ctaText" type="text" class="input-modern" placeholder="Get Started">
                            </div>

                            <!-- Toggles -->
                            <div class="flex flex-wrap gap-6">
                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <div class="toggle-switch" :class="{ active: showSearch }"
                                        @click="showSearch = !showSearch"></div>
                                    <span
                                        class="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-500 transition-colors">
                                        Recherche
                                    </span>
                                </label>

                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <div class="toggle-switch" :class="{ active: showThemeToggle }"
                                        @click="showThemeToggle = !showThemeToggle"></div>
                                    <span
                                        class="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-500 transition-colors">
                                        Thème
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Event Log -->
                    <div class="glass-card p-8">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
                            <span class="text-2xl">📋</span>
                            Journal des événements
                        </h3>

                        <div class="event-log">
                            <div v-if="eventLog.length === 0" class="text-slate-500 italic">
                                // Interagissez avec la navbar pour voir les événements...
                            </div>
                            <div v-for="(log, index) in eventLog" :key="index" class="event-log-item">
                                <span class="event-time">{{ log.time }}</span>
                                <span class="event-message">{{ log.message }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="max-w-6xl mx-auto px-6 py-16">
                <div class="section-header">
                    <span class="section-label">
                        <span>✨</span>
                        <span>Fonctionnalités</span>
                    </span>
                    <h2 class="section-title">Tout ce dont vous avez besoin</h2>
                    <p class="section-description">
                        Des composants pensés pour les développeurs modernes.
                    </p>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="feature-card"
                        style="--card-accent: #667eea; --card-accent-end: #764ba2; --icon-bg: rgba(102, 126, 234, 0.1); --icon-bg-end: rgba(118, 75, 162, 0.1); --icon-border: rgba(102, 126, 234, 0.2);">
                        <div class="feature-icon">🎨</div>
                        <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Glassmorphism</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Effets de flou élégants et design moderne au scroll.
                        </p>
                    </div>

                    <div class="feature-card"
                        style="--card-accent: #f093fb; --card-accent-end: #f5576c; --icon-bg: rgba(240, 147, 251, 0.1); --icon-bg-end: rgba(245, 87, 108, 0.1); --icon-border: rgba(240, 147, 251, 0.2);">
                        <div class="feature-icon">📱</div>
                        <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Responsive</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Mobile-first avec menu hamburger animé.
                        </p>
                    </div>

                    <div class="feature-card"
                        style="--card-accent: #4facfe; --card-accent-end: #00f2fe; --icon-bg: rgba(79, 172, 254, 0.1); --icon-bg-end: rgba(0, 242, 254, 0.1); --icon-border: rgba(79, 172, 254, 0.2);">
                        <div class="feature-icon">🌙</div>
                        <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Dark Mode</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Support natif du thème sombre intégré.
                        </p>
                    </div>

                    <div class="feature-card"
                        style="--card-accent: #43e97b; --card-accent-end: #38f9d7; --icon-bg: rgba(67, 233, 123, 0.1); --icon-bg-end: rgba(56, 249, 215, 0.1); --icon-border: rgba(67, 233, 123, 0.2);">
                        <div class="feature-icon">🔍</div>
                        <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Recherche</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Raccourci clavier ⌘K pour une recherche rapide.
                        </p>
                    </div>

                    <div class="feature-card"
                        style="--card-accent: #fa709a; --card-accent-end: #fee140; --icon-bg: rgba(250, 112, 154, 0.1); --icon-bg-end: rgba(254, 225, 64, 0.1); --icon-border: rgba(250, 112, 154, 0.2);">
                        <div class="feature-icon">🎯</div>
                        <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">TypeScript</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Typage complet avec autocomplétion IDE.
                        </p>
                    </div>

                    <div class="feature-card"
                        style="--card-accent: #a18cd1; --card-accent-end: #fbc2eb; --icon-bg: rgba(161, 140, 209, 0.1); --icon-bg-end: rgba(251, 194, 235, 0.1); --icon-border: rgba(161, 140, 209, 0.2);">
                        <div class="feature-icon">♿</div>
                        <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Accessible</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Conforme WCAG avec navigation clavier.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Code Example Section -->
            <section class="max-w-6xl mx-auto px-6 py-16">
                <div class="section-header">
                    <span class="section-label">
                        <span>💻</span>
                        <span>Intégration</span>
                    </span>
                    <h2 class="section-title">Simple à utiliser</h2>
                    <p class="section-description">
                        Commencez en quelques lignes de code.
                    </p>
                </div>

                <div class="code-block">
                    <pre><code><span class="code-comment">// Installation</span>
<span class="code-function">npm install</span> webflow-ui

<span class="code-comment">// Utilisation dans un composant Vue</span>
<span class="code-tag">&lt;template&gt;</span>
  <span class="code-tag">&lt;Navbar</span>
    <span class="code-attr">brand-name</span>=<span class="code-string">"{{ brandName }}"</span>
    <span class="code-attr">:nav-items</span>=<span class="code-string">"navItems"</span>
    <span class="code-attr">:show-search</span>=<span class="code-value">"{{ showSearch }}"</span>
    <span class="code-attr">:show-theme-toggle</span>=<span class="code-value">"{{ showThemeToggle }}"</span>
    <span class="code-attr">:is-dark</span>=<span class="code-string">"isDark"</span>
    <span class="code-attr">@theme-toggle</span>=<span class="code-string">"toggleDark"</span>
  <span class="code-tag">/&gt;</span>
<span class="code-tag">&lt;/template&gt;</span>

<span class="code-tag">&lt;script setup&gt;</span>
<span class="code-keyword">import</span> { <span class="code-function">Navbar</span> } <span class="code-keyword">from</span> <span class="code-string">'webflow-ui'</span>
<span class="code-keyword">import</span> <span class="code-string">'webflow-ui/style.css'</span>
<span class="code-tag">&lt;/script&gt;</span></code></pre>
                </div>
            </section>
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

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Navbar, type NavItem } from '../src/index'

const isDark = ref(false)
const brandName = ref('WebFlow UI')
const ctaText = ref('Get Started')
const showSearch = ref(true)
const showThemeToggle = ref(true)

const navItems = ref<NavItem[]>([
    { label: 'Accueil', href: '#', active: true },
    { label: 'Composants', href: '#components' },
    { label: 'Documentation', href: '#docs' },
    { label: 'GitHub', href: '#github' },
])

interface EventLog {
    time: string
    message: string
}

const eventLog = ref<EventLog[]>([])

const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    eventLog.value.unshift({ time, message })
    if (eventLog.value.length > 8) {
        eventLog.value.pop()
    }
}

const toggleDarkMode = () => {
    isDark.value = !isDark.value
    addLog(`Thème → ${isDark.value ? '🌙 Sombre' : '☀️ Clair'}`)
}

const handleNavClick = (item: NavItem) => {
    navItems.value.forEach(i => i.active = false)
    item.active = true
    addLog(`Navigation → "${item.label}"`)
}

const handleSearchClick = () => {
    addLog('🔍 Recherche ouverte')
}

const handleCtaClick = () => {
    addLog('🚀 CTA cliqué')
}

watch(isDark, (dark) => {
    document.documentElement.classList.toggle('dark', dark)
})

onMounted(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark.value = true
    }
    addLog('✅ Playground initialisé')
})
</script>
