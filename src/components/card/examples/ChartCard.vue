<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, Icon } from '@/index'
import { Chart, type ChartConfiguration, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps<{
    title: string
    value: string | number
    data: number[]
    color?: string
}>()

const chartRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

onMounted(() => {
    if (chartRef.value) {
        const config: ChartConfiguration = {
            type: 'line',
            data: {
                labels: props.data.map((_, i) => i),
                datasets: [{
                    data: props.data,
                    borderColor: props.color || '#6366f1',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: `${props.color || '#6366f1'}15`
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        }
        chartInstance = new Chart(chartRef.value, config)
    }
})

onUnmounted(() => {
    chartInstance?.destroy()
})
</script>

<template>
    <Card variant="default" shadow="sm" class="w-full overflow-hidden">
        <div class="p-4 space-y-4">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ title }}</span>
                <Icon name="heroicons:ellipsis-vertical" class="text-slate-400" />
            </div>

            <div class="flex items-end justify-between gap-4">
                <h2 class="text-2xl font-black text-slate-900 dark:text-white leading-none">{{ value }}</h2>
                <div class="h-10 flex-1 min-w-[80px]">
                    <canvas ref="chartRef"></canvas>
                </div>
            </div>
        </div>
    </Card>
</template>
