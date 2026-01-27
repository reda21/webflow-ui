<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { SkeletonProps } from './types'
import './skeleton.css'

const slots = useSlots()
defineSlots<{
    default?(): any
}>()

const props = withDefaults(defineProps<SkeletonProps>(), {
    animation: 'pulse',
    as: 'div'
})

const hasContent = computed<boolean>(() => !!slots.default)

const styles = computed(() => {
    const s: Record<string, string> = {}

    if (props.width) {
        s.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    }

    if (props.height) {
        s.height = typeof props.height === 'number' ? `${props.height}px` : props.height
    }

    if (props.radius && props.variant !== 'circle') {
        s.borderRadius = typeof props.radius === 'number' ? `${props.radius}px` : props.radius
    }

    if (props.color) {
        s.backgroundColor = props.color
    }

    if (props.shineColor) {
        s['--skeleton-shine'] = props.shineColor
    }

    if (props.glow) {
        s['--skeleton-glow-color'] = props.color || 'rgba(99, 102, 241, 0.3)'
    }

    if (props.gradient) {
        if (typeof props.gradient === 'string') {
            s['--skeleton-gradient'] = props.gradient
        } else {
            s['--skeleton-gradient'] = 'linear-gradient(135deg, var(--color-indigo-500) 0%, var(--color-violet-500) 100%)'
        }
    }

    return s
})

const classes = computed(() => [
    'skeleton',
    props.variant ? `skeleton--${props.variant}` : '',
    props.animation ? `skeleton--${props.animation}` : '',
    {
        'skeleton--glow': props.glow,
        'skeleton--gradient': props.gradient,
        'skeleton--has-content': hasContent.value
    },
    props.class
])
</script>

<template>
    <component :is="as" :class="classes" :style="styles" :aria-live="loadingText ? (ariaLive || 'polite') : undefined"
        :aria-busy="true" aria-hidden="false">
        <div v-if="hasContent" class="skeleton-content">
            <slot />
        </div>
        <span v-if="loadingText" class="sr-only">{{ loadingText }}</span>
    </component>
</template>
