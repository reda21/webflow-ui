<script setup lang="ts">
import { Card, Icon, Button } from '@/index'

const props = defineProps<{
    metric: {
        label: string
        value: string | number
        trend: number
        icon: string
        color: string
    }
}>()
</script>

<template>
    <Card variant="glass" class="w-full" :ui="{ header: 'pb-0' }">
        <div class="flex items-start justify-between">
            <div class="space-y-1">
                <span class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ metric.label }}</span>
                <h2 class="text-3xl font-black text-slate-900 dark:text-white">{{ metric.value }}</h2>
            </div>

            <div class="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5"
                :style="{ backgroundColor: `${metric.color}20`, color: metric.color }">
                <Icon :name="metric.icon" size="xl" />
            </div>
        </div>

        <div class="mt-6 flex items-center gap-2">
            <div class="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg"
                :class="[metric.trend >= 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600']">
                <Icon :name="metric.trend >= 0 ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'"
                    size="xs" />
                {{ Math.abs(metric.trend) }}%
            </div>
            <span class="text-xs text-slate-500">Depuis le mois dernier</span>
        </div>

        <template #footer>
            <div
                class="w-full flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                <Button variant="ghost" size="xs" severity="secondary">Détails</Button>
                <Button variant="ghost" size="xs" severity="primary">Rapport</Button>
            </div>
        </template>
    </Card>
</template>
