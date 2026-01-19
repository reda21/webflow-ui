<template>
    <div :class="containerClasses" class="btn-group" role="group">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import type { ButtonGroupDirection, ButtonGroupProps } from './types'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
    direction: 'horizontal',
})

const isHorizontal = computed(() => props.direction === 'horizontal')

const containerClasses = computed(() => {
    return isHorizontal.value ? 'btn-group-horizontal' : 'btn-group-vertical'
})

// Provide context for child Button components
provide('buttonGroup', {
    direction: computed(() => props.direction),
    isInGroup: true,
})
</script>
