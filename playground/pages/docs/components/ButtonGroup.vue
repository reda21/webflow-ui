<script setup lang="ts">
import { Button, ButtonGroup } from '../../../../src/index'
</script>

<template>
    <section id="button-group" class="scroll-mt-24 mb-20">
        <div class="flex items-center gap-3 mb-2">
            <span
                class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            ButtonGroup
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
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
</template>
