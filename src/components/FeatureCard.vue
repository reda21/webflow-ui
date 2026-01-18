<template>
    <div class="group p-8 md:p-10 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        :class="hoverBorderClass">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            :class="iconBgClass">
            <slot name="icon" />
        </div>
        <h2 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">
            {{ title }}
        </h2>
        <div class="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        default: 'indigo',
        validator: (value) => ['indigo', 'pink', 'blue'].includes(value)
    }
})

const hoverBorderClass = computed(() => {
    const borders = {
        indigo: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10',
        pink: 'hover:border-pink-500/50 hover:shadow-pink-500/10',
        blue: 'hover:border-blue-500/50 hover:shadow-blue-500/10'
    }
    return borders[props.variant] || borders.indigo
})

const iconBgClass = computed(() => {
    const backgrounds = {
        indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        pink: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
        blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    }
    return backgrounds[props.variant] || backgrounds.indigo
})
</script>
