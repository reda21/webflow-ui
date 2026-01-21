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
