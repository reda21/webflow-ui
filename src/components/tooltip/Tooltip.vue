<script setup lang="ts">
/**
 * Tooltip Component
 * 
 * A customizable tooltip component with support for:
 * - Multiple positions (top, bottom, left, right with variants)
 * - Multiple trigger modes (hover, click, focus, manual)
 * - Multiple variants (dark, light, primary, success, warning, danger, info)
 * - Animations (fade, scale, slide)
 * - Accessibility (ARIA attributes, keyboard support)
 */

import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import type { TooltipProps } from './types'

// ============================================
// Props
// ============================================
const props = withDefaults(defineProps<TooltipProps>(), {
    position: 'top',
    variant: 'dark',
    size: 'md',
    arrow: 'md',
    trigger: 'hover',
    delay: 0,
    duration: 0,
    animation: 'fade',
    animationDuration: 150,
    interactive: false,
    hideOnClick: true,
    closeOnEscape: true,
    disabled: false,
    defaultOpen: false,
    role: 'tooltip'
})

// ============================================
// Emits
// ============================================
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'show'): void
    (e: 'hide'): void
}>()

// ============================================
// State
// ============================================
const isVisible = ref(props.defaultOpen ?? false)
const tooltipId = `tooltip-${Math.random().toString(36).substring(2, 9)}`

// Timers
let showTimeout: ReturnType<typeof setTimeout> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null

// ============================================
// Delay helpers
// ============================================
const getShowDelay = (): number => {
    if (typeof props.delay === 'number') return props.delay
    if (typeof props.delay === 'object' && props.delay) return props.delay.show
    return 0
}

const getHideDelay = (): number => {
    if (typeof props.delay === 'number') return props.delay
    if (typeof props.delay === 'object' && props.delay) return props.delay.hide
    return 0
}

// ============================================
// Core methods
// ============================================
const clearTimeouts = () => {
    if (showTimeout) {
        clearTimeout(showTimeout)
        showTimeout = null
    }
    if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
    }
}

const showTooltip = () => {
    if (props.disabled) return

    clearTimeouts()

    const delay = getShowDelay()

    if (delay > 0) {
        showTimeout = setTimeout(() => {
            isVisible.value = true
            emit('show')
            emit('update:modelValue', true)
        }, delay)
    } else {
        isVisible.value = true
        emit('show')
        emit('update:modelValue', true)
    }
}

const hideTooltip = () => {
    clearTimeouts()

    const delay = getHideDelay()

    if (delay > 0) {
        hideTimeout = setTimeout(() => {
            isVisible.value = false
            emit('hide')
            emit('update:modelValue', false)
        }, delay)
    } else {
        isVisible.value = false
        emit('hide')
        emit('update:modelValue', false)
    }
}

const toggleTooltip = () => {
    if (isVisible.value) {
        hideTooltip()
    } else {
        showTooltip()
    }
}

// ============================================
// Trigger detection
// ============================================
const hasTrigger = (trigger: string): boolean => {
    if (Array.isArray(props.trigger)) return props.trigger.includes(trigger as any)
    return props.trigger === trigger
}

// ============================================
// Event handlers
// ============================================
const handleMouseEnter = () => {
    if (hasTrigger('hover')) {
        showTooltip()
    }
}

const handleMouseLeave = () => {
    if (hasTrigger('hover')) {
        hideTooltip()
    }
}

const handleFocus = () => {
    if (hasTrigger('focus')) {
        showTooltip()
    }
}

const handleBlur = () => {
    if (hasTrigger('focus')) {
        hideTooltip()
    }
}

const handleClick = () => {
    if (hasTrigger('click')) {
        toggleTooltip()
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    if (props.closeOnEscape && event.key === 'Escape' && isVisible.value) {
        hideTooltip()
        event.preventDefault()
    }
}

// ============================================
// Computed Classes
// ============================================
const wrapperClasses = computed(() => [
    'tooltip-wrapper',
    `tooltip-wrapper--${props.position}`,
    `tooltip-wrapper--${props.variant}`,
    `tooltip-wrapper--${props.size}`,
    {
        'tooltip-wrapper--visible': isVisible.value,
        'tooltip-wrapper--disabled': props.disabled,
        'tooltip-wrapper--interactive': props.interactive
    }
])

const contentClasses = computed(() => [
    'tooltip-content',
    `tooltip-content--${props.variant}`
])

const arrowClasses = computed(() => [
    'tooltip-arrow',
    `tooltip-arrow--${props.arrow}`
])

// ============================================
// Watchers
// ============================================
watch(() => props.modelValue, (value) => {
    if (value !== undefined) {
        isVisible.value = value
    }
})

// ============================================
// Lifecycle
// ============================================
onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    clearTimeouts()
    document.removeEventListener('keydown', handleKeydown)
})

// ============================================
// Exposed methods
// ============================================
defineExpose({
    show: showTooltip,
    hide: hideTooltip,
    toggle: toggleTooltip,
    isVisible
})
</script>

<template>
    <div :class="wrapperClasses" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @focusin="handleFocus"
        @focusout="handleBlur" @click="handleClick">
        <!-- Trigger Element -->
        <div class="tooltip-trigger" :aria-describedby="isVisible ? tooltipId : undefined">
            <slot :is-visible="isVisible" :show="showTooltip" :hide="hideTooltip" :toggle="toggleTooltip" />
        </div>

        <!-- Tooltip Content -->
        <div v-show="isVisible && !disabled" :id="tooltipId" :class="contentClasses" :role="role"
            :aria-hidden="!isVisible">
            <!-- Arrow -->
            <div v-if="arrow !== 'none'" :class="arrowClasses" />

            <!-- Title (optional) -->
            <div v-if="title || $slots.title" class="tooltip-title">
                <slot name="title">{{ title }}</slot>
            </div>

            <!-- Body -->
            <div class="tooltip-body">
                <slot name="content">{{ content }}</slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* ============================================
   Tooltip Wrapper - Base
   ============================================ */
.tooltip-wrapper {
    position: relative;
    display: inline-flex;
}

.tooltip-trigger {
    display: inline-flex;
}

/* ============================================
   Tooltip Content - Base
   ============================================ */
.tooltip-content {
    position: absolute;
    z-index: 9999;
    padding: 0.5rem 0.75rem;
    max-width: 300px;
    font-size: 0.875rem;
    line-height: 1.4;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    background-color: #1a1a1a;
    color: #ffffff;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    pointer-events: none;
    opacity: 0;
    transition: opacity 150ms ease-out;
}

.tooltip-wrapper--visible .tooltip-content {
    opacity: 1;
}

.tooltip-wrapper--interactive .tooltip-content {
    pointer-events: auto;
}

/* ============================================
   Arrow
   ============================================ */
.tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
}

/* ============================================
   Positions - Top
   ============================================ */
.tooltip-wrapper--top .tooltip-content {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
}

.tooltip-wrapper--top .tooltip-arrow {
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
    border-color: #1a1a1a transparent transparent transparent;
}

.tooltip-wrapper--top-start .tooltip-content {
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
}

.tooltip-wrapper--top-end .tooltip-content {
    bottom: 100%;
    right: 0;
    margin-bottom: 8px;
}

/* ============================================
   Positions - Bottom
   ============================================ */
.tooltip-wrapper--bottom .tooltip-content {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
}

.tooltip-wrapper--bottom .tooltip-arrow {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent #1a1a1a transparent;
}

.tooltip-wrapper--bottom-start .tooltip-content {
    top: 100%;
    left: 0;
    margin-top: 8px;
}

.tooltip-wrapper--bottom-end .tooltip-content {
    top: 100%;
    right: 0;
    margin-top: 8px;
}

/* ============================================
   Positions - Left
   ============================================ */
.tooltip-wrapper--left .tooltip-content {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 8px;
}

.tooltip-wrapper--left .tooltip-arrow {
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent #1a1a1a;
}

/* ============================================
   Positions - Right
   ============================================ */
.tooltip-wrapper--right .tooltip-content {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
}

.tooltip-wrapper--right .tooltip-arrow {
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 6px 6px 0;
    border-color: transparent #1a1a1a transparent transparent;
}

/* ============================================
   Variants
   ============================================ */
.tooltip-content--light {
    background-color: #ffffff;
    color: #1a1a1a;
    border: 1px solid #e5e5e5;
}

.tooltip-wrapper--light .tooltip-arrow {
    border-color: #ffffff transparent transparent transparent;
}

.tooltip-wrapper--light.tooltip-wrapper--bottom .tooltip-arrow {
    border-color: transparent transparent #ffffff transparent;
}

.tooltip-content--primary {
    background-color: #6366f1;
}

.tooltip-wrapper--primary .tooltip-arrow {
    border-color: #6366f1 transparent transparent transparent;
}

.tooltip-wrapper--primary.tooltip-wrapper--bottom .tooltip-arrow {
    border-color: transparent transparent #6366f1 transparent;
}

.tooltip-content--success {
    background-color: #22c55e;
}

.tooltip-wrapper--success .tooltip-arrow {
    border-color: #22c55e transparent transparent transparent;
}

.tooltip-content--warning {
    background-color: #f59e0b;
    color: #1a1a1a;
}

.tooltip-wrapper--warning .tooltip-arrow {
    border-color: #f59e0b transparent transparent transparent;
}

.tooltip-content--danger {
    background-color: #ef4444;
}

.tooltip-wrapper--danger .tooltip-arrow {
    border-color: #ef4444 transparent transparent transparent;
}

.tooltip-content--info {
    background-color: #06b6d4;
}

.tooltip-wrapper--info .tooltip-arrow {
    border-color: #06b6d4 transparent transparent transparent;
}

/* ============================================
   Sizes
   ============================================ */
.tooltip-wrapper--xs .tooltip-content {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
}

.tooltip-wrapper--sm .tooltip-content {
    padding: 0.375rem 0.625rem;
    font-size: 0.8125rem;
}

.tooltip-wrapper--lg .tooltip-content {
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    max-width: 400px;
}

/* ============================================
   Title
   ============================================ */
.tooltip-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

/* ============================================
   States
   ============================================ */
.tooltip-wrapper--disabled {
    pointer-events: none;
    opacity: 0.5;
}

/* ============================================
   Arrow Sizes
   ============================================ */
.tooltip-arrow--sm {
    border-width: 4px !important;
}

.tooltip-arrow--lg {
    border-width: 8px !important;
}

.tooltip-arrow--none {
    display: none;
}
</style>
