<script setup lang="ts">
import { computed } from 'vue'
import type { CircularProgressProps } from './types'
import './progress.css'

const props = withDefaults(defineProps<CircularProgressProps>(), {
    modelValue: undefined,
    value: null,
    max: 100,
    size: 'md',
    severity: 'primary',
    animation: 'none',
    strokeWidth: 4,
    showValue: true,
    showCenter: true,
    indeterminate: false,
    variant: 'solid',
    startAngle: -90,
    endAngle: 270,
    gradientColors: () => ['#4f46e5', '#a855f7', '#ec4899'] // Indigo to Pink default
})

const currentValue = computed(() => props.modelValue !== undefined ? props.modelValue : props.value)
const isIndeterminate = computed(() => props.indeterminate || currentValue.value === null)
const maxLimit = computed(() => Array.isArray(props.max) ? props.max.length - 1 : props.max)

const sizeMap: Record<string, number> = {
    xs: 24, sm: 40, md: 64, lg: 96, xl: 128
}

const svgSize = computed(() => sizeMap[props.size] || 64)
const radius = computed(() => (svgSize.value - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

// Angle Logic
const angleRange = computed(() => props.endAngle - props.startAngle)
const isFullCircle = computed(() => Math.abs(angleRange.value) === 360)

const percentage = computed(() => {
    if (isIndeterminate.value) return 0
    const val = Math.max(0, Math.min(Number(currentValue.value) || 0, maxLimit.value))
    return Math.round((val / maxLimit.value) * 100)
})

// Unique ID for defs
const uid = computed(() => `cp-${Math.random().toString(36).slice(2, 9)}`)

// Computed Styles
const trackStyle = computed(() => {
    const len = (Math.abs(angleRange.value) / 360) * circumference.value
    return {
        strokeDasharray: `${len} ${circumference.value}`,
        transform: `rotate(${props.startAngle}deg)`,
        transformOrigin: 'center',
        stroke: props.trackColor,
        strokeLinecap: isFullCircle.value ? undefined : 'round'
    }
})

const barStyle = computed(() => {
    const totalLen = (Math.abs(angleRange.value) / 360) * circumference.value
    const currentLen = (percentage.value / 100) * totalLen

    // For indeterminate, we rely on CSS animation, but if angle is custom, we might need to adjust
    if (isIndeterminate.value) return {}

    const style: Record<string, string | number | undefined> = {
        strokeDasharray: `${currentLen} ${circumference.value}`,
        transform: `rotate(${props.startAngle}deg)`,
        transformOrigin: 'center',
        strokeLinecap: 'round'
    }

    if (props.variant === 'gradient') {
        style.stroke = `url(#${uid.value}-gradient)`
    }

    if (props.color && props.variant !== 'gradient') {
        style.stroke = props.color
    }

    if (props.variant === 'dashed') {
        style.mask = `url(#${uid.value}-mask)`
    }

    return style
})

const wrapperClasses = computed(() => [
    'circular-progress',
    `circular-progress--${props.size}`,
    `circular-progress--${props.severity}`,
    `circular-progress--${props.variant}`,
    {
        'circular-progress--indeterminate': isIndeterminate.value,
        'circular-progress--animate-spin': props.animation === 'spin'
    },
    props['class']
])

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

const ariaLabel = computed(() => {
    if (props.ariaLabel) return props.ariaLabel
    if (isIndeterminate.value) return 'Loading...'
    return `Progress: ${percentage.value}%`
})
</script>

<template>
    <div :class="wrapperClasses" role="progressbar" :aria-valuenow="isIndeterminate ? undefined : percentage"
        :aria-valuemin="0" :aria-valuemax="100" :aria-label="ariaLabel"
        :aria-busy="isIndeterminate ? 'true' : undefined">
        <svg class="circular-progress__svg" :width="svgSize" :height="svgSize" :viewBox="`0 0 ${svgSize} ${svgSize}`">
            <defs>
                <!-- Gradient Def -->
                <linearGradient v-if="variant === 'gradient'" :id="`${uid}-gradient`" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop v-for="(color, index) in gradientColors" :key="index"
                        :offset="`${(index / (gradientColors.length - 1)) * 100}%`" :stop-color="color" />
                </linearGradient>

                <!-- Mask for Dashed Variant -->
                <mask v-if="variant === 'dashed'" :id="`${uid}-mask`">
                    <circle :cx="svgSize / 2" :cy="svgSize / 2" :r="radius" :stroke-width="strokeWidth" stroke="white"
                        fill="transparent" stroke-dasharray="2 4" />
                </mask>
            </defs>

            <!-- Track -->
            <circle class="circular-progress__track" :cx="svgSize / 2" :cy="svgSize / 2" :r="radius"
                :stroke-width="strokeWidth" :style="trackStyle" fill="transparent" />

            <!-- Progress -->
            <circle class="circular-progress__bar" :cx="svgSize / 2" :cy="svgSize / 2" :r="radius"
                :stroke-width="strokeWidth" :style="barStyle" fill="transparent" />
        </svg>

        <!-- Center Content -->
        <div v-if="showCenter && showValue && !isIndeterminate" class="circular-progress__center">
            <slot>{{ displayValue }}</slot>
        </div>
        <div v-else-if="showCenter && $slots.default" class="circular-progress__center">
            <slot></slot>
        </div>
    </div>
</template>
