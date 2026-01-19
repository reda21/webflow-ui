<template>
    <div :class="containerClasses" role="group">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed, provide, useSlots, h, cloneVNode, VNode } from 'vue'

export type ButtonGroupDirection = 'horizontal' | 'vertical'

export interface ButtonGroupProps {
    direction?: ButtonGroupDirection
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
    direction: 'horizontal',
})

const isHorizontal = computed(() => props.direction === 'horizontal')

const containerClasses = computed(() => {
    return [
        'inline-flex isolate',
        isHorizontal.value ? 'flex-row -space-x-px' : 'flex-col -space-y-px',
    ].join(' ')
})

// Provide context for child Button components
provide('buttonGroup', {
    direction: computed(() => props.direction),
    isInGroup: true,
})
</script>

<style scoped>
/* Button group styling - first, middle, last button corner rounding */

/* Horizontal group */
:deep(.inline-flex:first-child:not(:last-child)) {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

:deep(.inline-flex:last-child:not(:first-child)) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

:deep(.inline-flex:not(:first-child):not(:last-child)) {
    border-radius: 0 !important;
}

/* Z-index for stacking on hover/focus */
:deep(.inline-flex) {
    position: relative;
    z-index: 0;
}

:deep(.inline-flex:hover) {
    z-index: 10;
}

:deep(.inline-flex:focus) {
    z-index: 20;
}
</style>
