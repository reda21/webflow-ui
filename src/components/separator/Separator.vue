<script setup lang="ts">
import { computed } from 'vue'
import type { SeparatorProps } from './types'
import './separator.css'

const props = withDefaults(defineProps<SeparatorProps>(), {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    severity: 'default',
    labelPosition: 'center',
    decorative: true,
    spacing: 'md'
})

const hasLabel = computed(() => !!props.label)

const separatorClasses = computed(() => [
    'separator',
    `separator--${props.orientation}`,
    `separator--${props.variant}`,
    `separator--${props.size}`,
    `separator--${props.severity}`,
    `separator--spacing-${props.spacing}`,
    {
        [`separator--label-${props.labelPosition}`]: hasLabel.value
    },
    props['class']
])

const lineStyle = computed(() => {
    if (props.color) {
        return { color: props.color }
    }
    return {}
})
</script>

<template>
    <div :class="separatorClasses" :role="decorative ? 'none' : 'separator'"
        :aria-orientation="decorative ? undefined : orientation" :style="lineStyle">
        <!-- First line -->
        <div class="separator__line" aria-hidden="true"></div>

        <!-- Label -->
        <span v-if="hasLabel || $slots.default" class="separator__label">
            <slot>{{ label }}</slot>
        </span>

        <!-- Second line (only if label exists) -->
        <div v-if="hasLabel || $slots.default" class="separator__line" aria-hidden="true"></div>
    </div>
</template>
