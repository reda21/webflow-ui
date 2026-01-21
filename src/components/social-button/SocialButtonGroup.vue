<template>
    <div class="social-button-group-container w-full">
        <div v-if="divider" class="relative flex items-center py-5">
            <div class="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            <span class="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-widest">
                <slot name="divider">{{ dividerText }}</slot>
            </span>
            <div class="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
        </div>

        <div class="social-button-group flex flex-wrap gap-3" :class="[directionClass, alignClass]">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    direction?: 'row' | 'column'
    align?: 'start' | 'center' | 'end' | 'between'
    divider?: boolean
    dividerText?: string
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'row',
    align: 'start',
    divider: false,
    dividerText: 'Ou continuer avec'
})

const directionClass = computed(() => ({
    'flex-row': props.direction === 'row',
    'flex-col': props.direction === 'column'
}))

const alignClass = computed(() => {
    const aligns: Record<string, string> = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between'
    }
    return aligns[props.align] || 'justify-start'
})
</script>
