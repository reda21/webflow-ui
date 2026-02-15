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
    toggle: false,
    multiple: false,
})

const emit = defineEmits(['update:modelValue'])

const isHorizontal = computed(() => props.direction === 'horizontal')

const handleSelect = (value: any) => {
    if (!props.toggle) return

    if (props.multiple) {
        const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
        const index = current.indexOf(value)
        if (index > -1) {
            current.splice(index, 1)
        } else {
            current.push(value)
        }
        emit('update:modelValue', current)
    } else {
        emit('update:modelValue', props.modelValue === value ? null : value)
    }
}

const isSelected = (value: any) => {
    if (!props.toggle) return false
    if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.includes(value)
    }
    return props.modelValue === value
}

const containerClasses = computed(() => {
    return [
        isHorizontal.value ? 'btn-group-horizontal' : 'btn-group-vertical',
        props.toggle ? 'btn-group-toggle' : ''
    ].filter(Boolean).join(' ')
})

// Provide context for child Button components
provide('buttonGroup', {
    direction: computed(() => props.direction),
    isInGroup: true,
    toggle: computed(() => props.toggle),
    isSelected,
    handleSelect
})
</script>

<style scoped>
.btn-group {
    display: inline-flex;
    border-radius: var(--radius-lg);
    isolation: isolate;
}

.btn-group-horizontal {
    flex-direction: row;
}

.btn-group-vertical {
    flex-direction: column;
    align-items: stretch;
}

/* Base button override when in group */
.btn-group :deep(.btn-wrapper) {
    flex: 1 1 auto;
}

.btn-group :deep(.btn) {
    position: relative;
}

.btn-group-vertical :deep(.btn-wrapper) {
    display: flex;
}

.btn-group-vertical :deep(.btn) {
    width: 100%;
}


/* Specific rounding overrides to join buttons together */

/* Middle buttons: square all corners */
.btn-group :deep(.btn-wrapper:not(:first-child):not(:last-child) .btn) {
    border-radius: 0 !important;
}

/* Horizontal group: zero out right corners of first button and left corners of last button */
.btn-group-horizontal :deep(.btn-wrapper:first-child:not(:last-child) .btn) {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.btn-group-horizontal :deep(.btn-wrapper:last-child:not(:first-child) .btn) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

/* Vertical group: zero out bottom corners of first button and top corners of last button */
.btn-group-vertical :deep(.btn-wrapper:first-child:not(:last-child) .btn) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.btn-group-vertical :deep(.btn-wrapper:last-child:not(:first-child) .btn) {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}


/* Border overlapping to avoid double lines */
.btn-group-horizontal :deep(.btn-wrapper:not(:first-child)) {
    margin-left: -1px;
}

.btn-group-vertical :deep(.btn-wrapper:not(:first-child)) {
    margin-top: -1px;
}

/* Z-index management for borders/focus */
.btn-group :deep(.btn-wrapper:hover),
.btn-group :deep(.btn-wrapper:focus-within) {
    z-index: 1;
}

.btn-group :deep(.btn-selected) {
    z-index: 2;
}
</style>
