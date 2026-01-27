<script setup lang="ts">
import { ref } from 'vue'
import { Card, Button, Icon } from '../../../index'

const props = defineProps<{
    card: {
        title: string
        image: string
    }
}>()

const activeTheme = ref<'summer' | 'winter' | 'autumn' | 'spring'>('summer')

const themes = {
    summer: {
        name: 'Été',
        icon: 'heroicons:sun',
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b, #fb7185)',
        text: 'Chaleur et dynamisme'
    },
    winter: {
        name: 'Hiver',
        icon: 'heroicons:no-symbol',
        color: '#38bdf8',
        gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
        text: 'Pureté et calme'
    },
    autumn: {
        name: 'Automne',
        icon: 'heroicons:fire',
        color: '#b45309',
        gradient: 'linear-gradient(135deg, #b45309, #d97706)',
        text: 'Confort et nostalgie'
    },
    spring: {
        name: 'Printemps',
        icon: 'heroicons:sparkles',
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #10b981, #84cc16)',
        text: 'Renouveau et fraîcheur'
    }
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
            <Button v-for="(theme, key) in themes" :key="key" :severity="activeTheme === key ? 'primary' : 'secondary'"
                variant="ghost" size="sm" @click="activeTheme = key">
                {{ theme.name }}
            </Button>
        </div>

        <Card :title="card.title" subtitle="Thème dynamique saisonnier" :image="card.image" :style="{
            '--primary': themes[activeTheme].color,
            '--accent': themes[activeTheme].color
        }" class="transition-all duration-700">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-all duration-700"
                    :style="{ background: themes[activeTheme].gradient }">
                    <Icon :name="themes[activeTheme].icon" size="sm" />
                </div>
                <span class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ themes[activeTheme].text
                    }}</span>
            </div>

            <template #footer>
                <Button block :style="{ background: themes[activeTheme].gradient }"
                    class="!border-none !text-white !font-bold">
                    Appliquer ce pack
                </Button>
            </template>
        </Card>
    </div>
</template>
