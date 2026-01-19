<script setup lang="ts">
</script>

<template>
    <div class="relative z-10">
        <!-- Hero Section -->
        <section class="container mx-auto px-6 py-20">
            <div class="text-center">
                <!-- Badge -->
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-8 animate-fade-up">
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
                    <router-link to="/components" class="btn-primary">
                        <span>🚀</span>
                        <span>Commencer</span>
                    </router-link>
                    <router-link to="/docs" class="btn-secondary">
                        <span>📖</span>
                        <span>Documentation</span>
                    </router-link>
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

        <!-- Features Section -->
        <section class="container mx-auto px-6 py-16">
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
                <div class="feature-card" style="--card-accent: #667eea;">
                    <div class="feature-icon">🎨</div>
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Glassmorphism</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Effets de flou élégants et design moderne au scroll.
                    </p>
                </div>

                <div class="feature-card" style="--card-accent: #f093fb;">
                    <div class="feature-icon">📱</div>
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Responsive</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Mobile-first avec menu hamburger animé.
                    </p>
                </div>

                <div class="feature-card" style="--card-accent: #4facfe;">
                    <div class="feature-icon">🌙</div>
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Dark Mode</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Support natif du thème sombre intégré.
                    </p>
                </div>

                <div class="feature-card" style="--card-accent: #43e97b;">
                    <div class="feature-icon">🔍</div>
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Recherche</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Raccourci clavier ⌘K pour une recherche rapide.
                    </p>
                </div>

                <div class="feature-card" style="--card-accent: #fa709a;">
                    <div class="feature-icon">🎯</div>
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">TypeScript</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Typage complet avec autocomplétion IDE.
                    </p>
                </div>

                <div class="feature-card" style="--card-accent: #a18cd1;">
                    <div class="feature-icon">♿</div>
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">Accessible</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Conforme WCAG avec navigation clavier.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>
