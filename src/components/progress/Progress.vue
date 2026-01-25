<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps } from './types'
import './progress.css'

const props = withDefaults(defineProps<ProgressProps>(), {
    modelValue: undefined,
    value: null,
    max: 100,
    size: 'md',
    severity: 'primary',
    variant: 'solid',
    animation: 'none',
    rounded: 'full',
    showValue: false,
    status: false,
    labelPosition: 'outside',
    orientation: 'horizontal',
    inverted: false,
    indeterminate: false
})

const currentValue = computed(() => props.modelValue !== undefined ? props.modelValue : props.value)

const isIndeterminate = computed(() => props.indeterminate || currentValue.value === null)

const maxLimit = computed(() => Array.isArray(props.max) ? props.max.length - 1 : props.max)

const percentage = computed(() => {
    if (isIndeterminate.value) return 0
    const val = Math.max(0, Math.min(Number(currentValue.value) || 0, maxLimit.value))
    return Math.round((val / maxLimit.value) * 100)
})

const bufferPercentage = computed(() => {
    if (!props.buffer) return 0
    return Math.max(0, Math.min(props.buffer, maxLimit.value)) / maxLimit.value * 100
})

const displayValue = computed(() => {
    if (isIndeterminate.value) return ''
    if (props.formatValue) {
        return props.formatValue(Number(currentValue.value) || 0, maxLimit.value)
    }
    if (Array.isArray(props.max)) {
        return props.max[Number(currentValue.value) || 0] || ''
    }
    return `${percentage.value}%`
})

const isCarousel = computed(() => isIndeterminate.value && (props.animation === 'carousel' || props.animation === 'indeterminate' || props.animation === 'none' || props.animation === 'pulse' || props.animation === 'striped'))
const isCarouselInverse = computed(() => isIndeterminate.value && props.animation === 'carousel-inverse')
const isSwing = computed(() => isIndeterminate.value && props.animation === 'swing')
const isElastic = computed(() => isIndeterminate.value && props.animation === 'elastic')

const barClasses = computed(() => [
    'progress-bar',
    `progress-bar--${props.severity}`,
    {
        'progress-bar--striped': props.variant === 'striped',
        'progress-bar--gradient': props.variant === 'gradient',
        'progress-bar--animate-pulse': props.animation === 'pulse',
        'progress-bar--animate-striped': props.animation === 'striped',
        'progress-bar--animate-carousel': isCarousel.value,
        'progress-bar--animate-carousel-inverse': isCarouselInverse.value,
        'progress-bar--animate-swing': isSwing.value,
        'progress-bar--animate-elastic': isElastic.value,
        'progress-bar--animate-bounce': props.animation === 'bounce',
        'progress-bar--animate-gradient-flow': props.animation === 'gradient-flow',
        'progress-bar--animate-glow': props.animation === 'glow',
        'progress-bar--animate-flash': props.animation === 'flash',
        'progress-bar--animate-scan': props.animation === 'scan',
        'progress-bar--optimised': props.animation !== 'none' || isIndeterminate.value
    }
])

const trackClasses = computed(() => [
    'progress-track',
    `progress-track--${props.size}`,
    `progress-track--${props.orientation}`,
    `progress-track--rounded-${props.rounded}`,
    { 'progress-track--inverted': props.inverted || props.reverse }
])

const indeterminateFullBar = computed(() =>
    isIndeterminate.value
    && ['bounce', 'gradient-flow', 'glow', 'flash', 'scan'].includes(props.animation)
)

const barStyle = computed(() => {
    const style: Record<string, string> = {}

    if (!isIndeterminate.value || indeterminateFullBar.value) {
        if (props.orientation === 'vertical') {
            style.height = `${indeterminateFullBar.value ? 100 : percentage.value}%`
        } else {
            style.width = `${indeterminateFullBar.value ? 100 : percentage.value}%`
        }
    }

    if (props.color) {
        style.backgroundColor = props.color
        style.backgroundImage = 'none'
    }

    return style
})

const trackStyle = computed(() => {
    if (props.trackColor) {
        return { backgroundColor: props.trackColor }
    }
    return {}
})

const ariaLabel = computed(() => {
    if (props.ariaLabel) return props.ariaLabel
    if (props.label) return props.label
    if (isIndeterminate.value) return 'Loading...'
    return `Progress: ${percentage.value}%`
})
const shouldShowTopLabel = computed(() => props.status || (props.labelPosition === 'top' && (props.showValue || !!props.label)))
</script>

<template>
    <div class="progress-wrapper" :class="[
        { 'progress-wrapper--top-label': shouldShowTopLabel },
        props['class']
    ]">
        <!-- Top Label -->
        <div v-if="shouldShowTopLabel" class="progress-label-top">
            <slot name="label">
                <span class="progress-label-text">
                    <slot name="label-text">{{ label }}</slot>
                </span>
            </slot>
            <span class="progress-label-value">{{ displayValue }}</span>
        </div>

        <!-- Track -->
        <div :class="trackClasses" :style="trackStyle" role="progressbar"
            :aria-valuenow="isIndeterminate ? undefined : percentage" :aria-valuemin="0" :aria-valuemax="100"
            :aria-label="ariaLabel" :aria-valuetext="ariaValuetext" :aria-describedby="ariaDescribedby"
            :aria-live="ariaLive || (isIndeterminate ? 'polite' : 'off')"
            :aria-busy="isIndeterminate ? 'true' : undefined">

            <!-- Steps Markers (Background) -->
            <template v-if="steps && showStepMarkers">
                <div class="progress-step-marker" v-for="i in steps - 1" :key="i"
                    :style="{ [orientation === 'vertical' ? 'top' : 'left']: `${(i / steps) * 100}%` }"></div>
            </template>

            <!-- Buffer (background progress) -->
            <div v-if="buffer && !isIndeterminate" class="progress-buffer" :class="barClasses"
                :style="{ [orientation === 'vertical' ? 'height' : 'width']: `${bufferPercentage}%`, transitionDuration: `${transitionDuration}ms` }">
            </div>

            <!-- Secondary Value -->
            <div v-if="secondaryValue && !isIndeterminate" class="progress-secondary" :class="barClasses"
                :style="{ [orientation === 'vertical' ? 'height' : 'width']: `${Math.min(100, Math.max(0, (secondaryValue / (Number(max) || 100)) * 100))}%`, transitionDuration: `${transitionDuration}ms` }">
            </div>

            <!-- Main Progress Bar -->
            <div :class="barClasses"
                :style="{ ...barStyle, transitionDuration: transitionDuration ? `${transitionDuration}ms` : undefined }">
                <!-- Inside Label -->
                <span
                    v-if="labelPosition === 'inside' && showValue && !isIndeterminate && size !== 'xs' && size !== 'sm'"
                    class="progress-label-inside">
                    {{ displayValue }}
                </span>
            </div>

            <!-- Indeterminate second bar (carousel) -->
            <div v-if="isCarousel" class="progress-bar"
                :class="[`progress-bar--${props.severity}`, 'progress-bar--animate-carousel-short']"></div>

            <!-- Indeterminate second bar (carousel-inverse) -->
            <div v-if="isCarouselInverse" class="progress-bar"
                :class="[`progress-bar--${props.severity}`, 'progress-bar--animate-carousel-inverse-short']"></div>
        </div>

        <!-- Outside Label -->
        <div v-if="labelPosition === 'outside' && showValue && !isIndeterminate" class="progress-label-outside">
            {{ displayValue }}
        </div>
    </div>
</template>
