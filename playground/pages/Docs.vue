<script setup lang="ts">
</script>

<template>
    <section class="container mx-auto px-6 py-20">
        <div class="section-header">
            <span class="section-label">
                <span>📖</span>
                <span>Guide</span>
            </span>
            <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
                <span class="gradient-text">Documentation</span>
            </h1>
            <p class="section-description">
                Apprenez à utiliser WebFlow UI dans vos projets.
            </p>
        </div>

        <div class="glass-card p-8 mt-12 text-center">
            <p class="text-lg text-slate-600 dark:text-slate-400">
                📝 La documentation complète est en cours de rédaction...
            </p>
            <p class="text-sm text-slate-500 mt-2">
                En attendant, consultez la page
                <router-link to="/components" class="text-indigo-600 hover:underline">Composants</router-link>
                pour voir les exemples.
            </p>
        </div>
    </section>
</template>
