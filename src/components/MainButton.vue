<template>
    <NuxtLink v-if="to" :to="to"
        class="group inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
        :class="variantClasses">
        <slot />
        <svg v-if="showArrow" class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5"
            viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
    </NuxtLink>
    <button v-else
        class="group inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
        :class="variantClasses">
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    to: {
        type: String,
        default: null
    },
    variant: {
        type: String,
        default: 'indigo'
    },
    showArrow: {
        type: Boolean,
        default: false
    }
})

const variantClasses = computed(() => {
    const variants = {
        indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25',
        outline: 'bg-transparent border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-900 dark:text-white shadow-none'
    }
    return variants[props.variant] || variants.indigo
})
</script>
