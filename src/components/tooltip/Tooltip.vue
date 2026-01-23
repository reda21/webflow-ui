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
// Computed Classes & Animation
// ============================================
const wrapperClasses = computed(() => [
    'tooltip-wrapper',
    `tooltip-wrapper--${props.position}`,
    `tooltip-wrapper--${props.variant}`,
    `tooltip-wrapper--${props.size}`,
    {
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

// Animation name for Vue Transition
const transitionName = computed(() => {
    const base = props.animation || 'fade'

    // Slide animation - direction based on position
    if (base === 'slide') {
        if (props.position.startsWith('top')) return 'tooltip-slide-up'
        if (props.position.startsWith('bottom')) return 'tooltip-slide-down'
        if (props.position.startsWith('left')) return 'tooltip-slide-left'
        if (props.position.startsWith('right')) return 'tooltip-slide-right'
    }

    // Directional animations (flip, bounce, subtle, expand)
    if (['flip', 'bounce', 'subtle', 'expand'].includes(base)) {
        if (props.position.startsWith('top')) return `tooltip-${base}-up`
        if (props.position.startsWith('bottom')) return `tooltip-${base}-down`
        if (props.position.startsWith('left')) return `tooltip-${base}-left`
        if (props.position.startsWith('right')) return `tooltip-${base}-right`
    }

    return `tooltip-${base}`
})

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

        <!-- Tooltip Content with Transition -->
        <Transition :name="transitionName">
            <div v-if="isVisible && !disabled" :id="tooltipId" :class="contentClasses" :role="role"
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
        </Transition>
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
.tooltip-wrapper--top .tooltip-content,
.tooltip-wrapper--top-start .tooltip-content,
.tooltip-wrapper--top-end .tooltip-content {
    bottom: 100%;
    margin-bottom: 8px;
}

.tooltip-wrapper--top .tooltip-content {
    left: 50%;
    transform: translateX(-50%);
}

.tooltip-wrapper--top-start .tooltip-content {
    left: 0;
}

.tooltip-wrapper--top-end .tooltip-content {
    right: 0;
}

.tooltip-wrapper--top .tooltip-arrow,
.tooltip-wrapper--top-start .tooltip-arrow,
.tooltip-wrapper--top-end .tooltip-arrow {
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
    border-color: #1a1a1a transparent transparent transparent;
}

/* ============================================
   Positions - Bottom
   ============================================ */
.tooltip-wrapper--bottom .tooltip-content,
.tooltip-wrapper--bottom-start .tooltip-content,
.tooltip-wrapper--bottom-end .tooltip-content {
    top: 100%;
    margin-top: 8px;
}

.tooltip-wrapper--bottom .tooltip-content {
    left: 50%;
    transform: translateX(-50%);
}

.tooltip-wrapper--bottom-start .tooltip-content {
    left: 0;
}

.tooltip-wrapper--bottom-end .tooltip-content {
    right: 0;
}

.tooltip-wrapper--bottom .tooltip-arrow,
.tooltip-wrapper--bottom-start .tooltip-arrow,
.tooltip-wrapper--bottom-end .tooltip-arrow {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent #1a1a1a transparent;
}

/* ============================================
   Positions - Left
   ============================================ */
.tooltip-wrapper--left .tooltip-content,
.tooltip-wrapper--left-start .tooltip-content,
.tooltip-wrapper--left-end .tooltip-content {
    right: 100%;
    margin-right: 8px;
}

.tooltip-wrapper--left .tooltip-content {
    top: 50%;
    transform: translateY(-50%);
}

.tooltip-wrapper--left-start .tooltip-content {
    top: 0;
}

.tooltip-wrapper--left-end .tooltip-content {
    bottom: 0;
}

.tooltip-wrapper--left .tooltip-arrow,
.tooltip-wrapper--left-start .tooltip-arrow,
.tooltip-wrapper--left-end .tooltip-arrow {
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent #1a1a1a;
}

/* ============================================
   Positions - Right
   ============================================ */
.tooltip-wrapper--right .tooltip-content,
.tooltip-wrapper--right-start .tooltip-content,
.tooltip-wrapper--right-end .tooltip-content {
    left: 100%;
    margin-left: 8px;
}

.tooltip-wrapper--right .tooltip-content {
    top: 50%;
    transform: translateY(-50%);
}

.tooltip-wrapper--right-start .tooltip-content {
    top: 0;
}

.tooltip-wrapper--right-end .tooltip-content {
    bottom: 0;
}

.tooltip-wrapper--right .tooltip-arrow,
.tooltip-wrapper--right-start .tooltip-arrow,
.tooltip-wrapper--right-end .tooltip-arrow {
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 6px 6px 0;
    border-color: transparent #1a1a1a transparent transparent;
}

/* ============================================
   ANIMATION: FADE (pure opacity)
   ============================================ */
.tooltip-fade-enter-active {
    transition: opacity 200ms ease-out;
}

.tooltip-fade-leave-active {
    transition: opacity 150ms ease-in;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
    opacity: 0;
}

/* ============================================
   ANIMATION: SCALE
   ============================================ */
.tooltip-scale-enter-active {
    transition: opacity 0.2s ease-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tooltip-scale-leave-active {
    transition: opacity 0.15s ease-in, transform 0.15s ease-in;
}

.tooltip-scale-enter-from,
.tooltip-scale-leave-to {
    opacity: 0;
    transform: scale(0.85);
}

/* Fix scale transform for different positions to maintain centering */
.tooltip-wrapper--top .tooltip-scale-enter-from,
.tooltip-wrapper--top .tooltip-scale-leave-to,
.tooltip-wrapper--top-start .tooltip-scale-enter-from,
.tooltip-wrapper--top-start .tooltip-scale-leave-to,
.tooltip-wrapper--top-end .tooltip-scale-enter-from,
.tooltip-wrapper--top-end .tooltip-scale-leave-to {
    transform: translateX(-50%) scale(0.85);
    transform-origin: bottom center;
}

.tooltip-wrapper--bottom .tooltip-scale-enter-from,
.tooltip-wrapper--bottom .tooltip-scale-leave-to,
.tooltip-wrapper--bottom-start .tooltip-scale-enter-from,
.tooltip-wrapper--bottom-start .tooltip-scale-leave-to,
.tooltip-wrapper--bottom-end .tooltip-scale-enter-from,
.tooltip-wrapper--bottom-end .tooltip-scale-leave-to {
    transform: translateX(-50%) scale(0.85);
    transform-origin: top center;
}

.tooltip-wrapper--left .tooltip-scale-enter-from,
.tooltip-wrapper--left .tooltip-scale-leave-to,
.tooltip-wrapper--left-start .tooltip-scale-enter-from,
.tooltip-wrapper--left-start .tooltip-scale-leave-to,
.tooltip-wrapper--left-end .tooltip-scale-enter-from,
.tooltip-wrapper--left-end .tooltip-scale-leave-to {
    transform: translateY(-50%) scale(0.85);
    transform-origin: right center;
}

.tooltip-wrapper--right .tooltip-scale-enter-from,
.tooltip-wrapper--right .tooltip-scale-leave-to,
.tooltip-wrapper--right-start .tooltip-scale-enter-from,
.tooltip-wrapper--right-start .tooltip-scale-leave-to,
.tooltip-wrapper--right-end .tooltip-scale-enter-from,
.tooltip-wrapper--right-end .tooltip-scale-leave-to {
    transform: translateY(-50%) scale(0.85);
    transform-origin: left center;
}

/* ============================================
   ANIMATION: SLIDE (directional movement)
   ============================================ */
.tooltip-slide-up-enter-active,
.tooltip-slide-down-enter-active,
.tooltip-slide-left-enter-active,
.tooltip-slide-right-enter-active {
    transition: opacity 250ms ease-out, transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

.tooltip-slide-up-leave-active,
.tooltip-slide-down-leave-active,
.tooltip-slide-left-leave-active,
.tooltip-slide-right-leave-active {
    transition: opacity 200ms ease-in, transform 200ms ease-in;
}

.tooltip-slide-up-enter-from,
.tooltip-slide-up-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
}

.tooltip-slide-down-enter-from,
.tooltip-slide-down-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
}

.tooltip-slide-left-enter-from,
.tooltip-slide-left-leave-to {
    opacity: 0;
    transform: translateY(-50%) translateX(8px);
}

.tooltip-slide-right-enter-from,
.tooltip-slide-right-leave-to {
    opacity: 0;
    transform: translateY(-50%) translateX(-8px);
}

/* ============================================
   ANIMATION: FLIP
   ============================================ */
.tooltip-flip-up-enter-active,
.tooltip-flip-down-enter-active,
.tooltip-flip-left-enter-active,
.tooltip-flip-right-enter-active {
    transition: opacity 300ms ease-out, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
    backface-visibility: hidden;
    perspective: 1000px;
}

.tooltip-flip-up-leave-active,
.tooltip-flip-down-leave-active,
.tooltip-flip-left-leave-active,
.tooltip-flip-right-leave-active {
    transition: opacity 250ms ease-in, transform 250ms ease-in;
}

.tooltip-flip-up-enter-from,
.tooltip-flip-up-leave-to {
    opacity: 0;
    transform: translateX(-50%) rotateX(-90deg);
    transform-origin: bottom center;
}

.tooltip-flip-down-enter-from,
.tooltip-flip-down-leave-to {
    opacity: 0;
    transform: translateX(-50%) rotateX(90deg);
    transform-origin: top center;
}

.tooltip-flip-left-enter-from,
.tooltip-flip-left-leave-to {
    opacity: 0;
    transform: translateY(-50%) rotateY(90deg);
    transform-origin: right center;
}

.tooltip-flip-right-enter-from,
.tooltip-flip-right-leave-to {
    opacity: 0;
    transform: translateY(-50%) rotateY(-90deg);
    transform-origin: left center;
}

/* ============================================
   ANIMATION: ZOOM (scale with bounce)
   ============================================ */
.tooltip-zoom-enter-active {
    animation: tooltip-zoom-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tooltip-zoom-leave-active {
    transition: opacity 0.2s ease-in, transform 0.2s ease-in;
}

.tooltip-zoom-leave-to {
    opacity: 0;
    transform: scale(0.7);
}

@keyframes tooltip-zoom-in {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* Need to handle position transforms for keyframes too or use different approach */
.tooltip-wrapper--top .tooltip-zoom-enter-active,
.tooltip-wrapper--top-start .tooltip-zoom-enter-active,
.tooltip-wrapper--top-end .tooltip-zoom-enter-active,
.tooltip-wrapper--bottom .tooltip-zoom-enter-active,
.tooltip-wrapper--bottom-start .tooltip-zoom-enter-active,
.tooltip-wrapper--bottom-end .tooltip-zoom-enter-active {
    animation-name: tooltip-zoom-in-x;
}

@keyframes tooltip-zoom-in-x {
    0% {
        opacity: 0;
        transform: translateX(-50%) scale(0.5);
    }

    100% {
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
}

.tooltip-wrapper--left .tooltip-zoom-enter-active,
.tooltip-wrapper--left-start .tooltip-zoom-enter-active,
.tooltip-wrapper--left-end .tooltip-zoom-enter-active,
.tooltip-wrapper--right .tooltip-zoom-enter-active,
.tooltip-wrapper--right-start .tooltip-zoom-enter-active,
.tooltip-wrapper--right-end .tooltip-zoom-enter-active {
    animation-name: tooltip-zoom-in-y;
}

@keyframes tooltip-zoom-in-y {
    0% {
        opacity: 0;
        transform: translateY(-50%) scale(0.5);
    }

    100% {
        opacity: 1;
        transform: translateY(-50%) scale(1);
    }
}

/* ============================================
   ANIMATION: BOUNCE
   ============================================ */
.tooltip-bounce-up-enter-active {
    animation: tooltip-bounce-up-in 0.5s;
}

.tooltip-bounce-down-enter-active {
    animation: tooltip-bounce-down-in 0.5s;
}

.tooltip-bounce-left-enter-active {
    animation: tooltip-bounce-left-in 0.5s;
}

.tooltip-bounce-right-enter-active {
    animation: tooltip-bounce-right-in 0.5s;
}

.tooltip-bounce-up-leave-active,
.tooltip-bounce-down-leave-active,
.tooltip-bounce-left-leave-active,
.tooltip-bounce-right-leave-active {
    transition: opacity 0.25s ease-in, transform 0.25s ease-in;
}

.tooltip-bounce-up-leave-to,
.tooltip-bounce-down-leave-to,
.tooltip-bounce-left-leave-to,
.tooltip-bounce-right-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

@keyframes tooltip-bounce-up-in {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px) scale(0.3);
    }

    50% {
        opacity: 1;
        transform: translateX(-50%) translateY(-10px) scale(1.1);
    }

    70% {
        transform: translateX(-50%) translateY(5px) scale(0.95);
    }

    100% {
        transform: translateX(-50%) translateY(0) scale(1);
    }
}

@keyframes tooltip-bounce-down-in {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px) scale(0.3);
    }

    50% {
        opacity: 1;
        transform: translateX(-50%) translateY(10px) scale(1.1);
    }

    70% {
        transform: translateX(-50%) translateY(-5px) scale(0.95);
    }

    100% {
        transform: translateX(-50%) translateY(0) scale(1);
    }
}

@keyframes tooltip-bounce-left-in {
    0% {
        opacity: 0;
        transform: translateY(-50%) translateX(20px) scale(0.3);
    }

    50% {
        opacity: 1;
        transform: translateY(-50%) translateX(-10px) scale(1.1);
    }

    70% {
        transform: translateY(-50%) translateX(5px) scale(0.95);
    }

    100% {
        transform: translateY(-50%) translateX(0) scale(1);
    }
}

@keyframes tooltip-bounce-right-in {
    0% {
        opacity: 0;
        transform: translateY(-50%) translateX(-20px) scale(0.3);
    }

    50% {
        opacity: 1;
        transform: translateY(-50%) translateX(10px) scale(1.1);
    }

    70% {
        transform: translateY(-50%) translateX(-5px) scale(0.95);
    }

    100% {
        transform: translateY(-50%) translateX(0) scale(1);
    }
}

/* ============================================
   ANIMATION: SUBTLE UP (for top position)
   ============================================ */
.tooltip-subtle-up-enter-active,
.tooltip-subtle-up-leave-active {
    transition: opacity 120ms ease-out, transform 120ms ease-out;
}

.tooltip-subtle-up-enter-from,
.tooltip-subtle-up-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(4px);
}

/* ============================================
   ANIMATION: SUBTLE DOWN (for bottom position)
   ============================================ */
.tooltip-subtle-down-enter-active,
.tooltip-subtle-down-leave-active {
    transition: opacity 120ms ease-out, transform 120ms ease-out;
}

.tooltip-subtle-down-enter-from,
.tooltip-subtle-down-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px);
}

/* ============================================
   ANIMATION: SUBTLE LEFT (for left position)
   ============================================ */
.tooltip-subtle-left-enter-active,
.tooltip-subtle-left-leave-active {
    transition: opacity 120ms ease-out, transform 120ms ease-out;
}

.tooltip-subtle-left-enter-from,
.tooltip-subtle-left-leave-to {
    opacity: 0;
    transform: translateY(-50%) translateX(4px);
}

/* ============================================
   ANIMATION: SUBTLE RIGHT (for right position)
   ============================================ */
.tooltip-subtle-right-enter-active,
.tooltip-subtle-right-leave-active {
    transition: opacity 120ms ease-out, transform 120ms ease-out;
}

.tooltip-subtle-right-enter-from,
.tooltip-subtle-right-leave-to {
    opacity: 0;
    transform: translateY(-50%) translateX(-4px);
}

/* ============================================
   ANIMATION: EXPAND UP (for top position)
   ============================================ */
.tooltip-expand-up-enter-active,
.tooltip-expand-up-leave-active {
    transition: opacity 200ms ease-out, transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tooltip-expand-up-enter-from,
.tooltip-expand-up-leave-to {
    opacity: 0;
    transform: translateX(-50%) scaleY(0);
    transform-origin: bottom center;
}

/* ============================================
   ANIMATION: EXPAND DOWN (for bottom position)
   ============================================ */
.tooltip-expand-down-enter-active,
.tooltip-expand-down-leave-active {
    transition: opacity 200ms ease-out, transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tooltip-expand-down-enter-from,
.tooltip-expand-down-leave-to {
    opacity: 0;
    transform: translateX(-50%) scaleY(0);
    transform-origin: top center;
}

/* ============================================
   ANIMATION: EXPAND LEFT (for left position)
   ============================================ */
.tooltip-expand-left-enter-active,
.tooltip-expand-left-leave-active {
    transition: opacity 200ms ease-out, transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tooltip-expand-left-enter-from,
.tooltip-expand-left-leave-to {
    opacity: 0;
    transform: translateY(-50%) scaleX(0);
    transform-origin: right center;
}

/* ============================================
   ANIMATION: EXPAND RIGHT (for right position)
   ============================================ */
.tooltip-expand-right-enter-active,
.tooltip-expand-right-leave-active {
    transition: opacity 200ms ease-out, transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tooltip-expand-right-enter-from,
.tooltip-expand-right-leave-to {
    opacity: 0;
    transform: translateY(-50%) scaleX(0);
    transform-origin: left center;
}

/* ============================================
   ANIMATION: NONE
   ============================================ */
.tooltip-none-enter-active,
.tooltip-none-leave-active {
    transition: none;
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

.tooltip-wrapper--light.tooltip-wrapper--bottom .tooltip-arrow,
.tooltip-wrapper--light.tooltip-wrapper--bottom-start .tooltip-arrow,
.tooltip-wrapper--light.tooltip-wrapper--bottom-end .tooltip-arrow {
    border-color: transparent transparent #ffffff transparent;
}

.tooltip-wrapper--light.tooltip-wrapper--left .tooltip-arrow,
.tooltip-wrapper--light.tooltip-wrapper--left-start .tooltip-arrow,
.tooltip-wrapper--light.tooltip-wrapper--left-end .tooltip-arrow {
    border-color: transparent transparent transparent #ffffff;
}

.tooltip-wrapper--light.tooltip-wrapper--right .tooltip-arrow,
.tooltip-wrapper--light.tooltip-wrapper--right-start .tooltip-arrow,
.tooltip-wrapper--light.tooltip-wrapper--right-end .tooltip-arrow {
    border-color: transparent #ffffff transparent transparent;
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

.tooltip-wrapper--primary.tooltip-wrapper--left .tooltip-arrow {
    border-color: transparent transparent transparent #6366f1;
}

.tooltip-wrapper--primary.tooltip-wrapper--right .tooltip-arrow {
    border-color: transparent #6366f1 transparent transparent;
}

.tooltip-content--success {
    background-color: #22c55e;
}

.tooltip-wrapper--success .tooltip-arrow {
    border-color: #22c55e transparent transparent transparent;
}

.tooltip-wrapper--success.tooltip-wrapper--bottom .tooltip-arrow {
    border-color: transparent transparent #22c55e transparent;
}

.tooltip-wrapper--success.tooltip-wrapper--left .tooltip-arrow {
    border-color: transparent transparent transparent #22c55e;
}

.tooltip-wrapper--success.tooltip-wrapper--right .tooltip-arrow {
    border-color: transparent #22c55e transparent transparent;
}

.tooltip-content--warning {
    background-color: #f59e0b;
    color: #1a1a1a;
}

.tooltip-wrapper--warning .tooltip-arrow {
    border-color: #f59e0b transparent transparent transparent;
}

.tooltip-wrapper--warning.tooltip-wrapper--bottom .tooltip-arrow {
    border-color: transparent transparent #f59e0b transparent;
}

.tooltip-wrapper--warning.tooltip-wrapper--left .tooltip-arrow {
    border-color: transparent transparent transparent #f59e0b;
}

.tooltip-wrapper--warning.tooltip-wrapper--right .tooltip-arrow {
    border-color: transparent #f59e0b transparent transparent;
}

.tooltip-content--danger {
    background-color: #ef4444;
}

.tooltip-wrapper--danger .tooltip-arrow {
    border-color: #ef4444 transparent transparent transparent;
}

.tooltip-wrapper--danger.tooltip-wrapper--bottom .tooltip-arrow {
    border-color: transparent transparent #ef4444 transparent;
}

.tooltip-wrapper--danger.tooltip-wrapper--left .tooltip-arrow {
    border-color: transparent transparent transparent #ef4444;
}

.tooltip-wrapper--danger.tooltip-wrapper--right .tooltip-arrow {
    border-color: transparent #ef4444 transparent transparent;
}

.tooltip-content--info {
    background-color: #06b6d4;
}

.tooltip-wrapper--info .tooltip-arrow {
    border-color: #06b6d4 transparent transparent transparent;
}

.tooltip-wrapper--info.tooltip-wrapper--bottom .tooltip-arrow {
    border-color: transparent transparent #06b6d4 transparent;
}

.tooltip-wrapper--info.tooltip-wrapper--left .tooltip-arrow {
    border-color: transparent transparent transparent #06b6d4;
}

.tooltip-wrapper--info.tooltip-wrapper--right .tooltip-arrow {
    border-color: transparent #06b6d4 transparent transparent;
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

/* ============================================
   Reduced Motion
   ============================================ */
@media (prefers-reduced-motion: reduce) {

    .tooltip-fade-enter-active,
    .tooltip-fade-leave-active,
    .tooltip-scale-enter-active,
    .tooltip-scale-leave-active,
    .tooltip-slide-up-enter-active,
    .tooltip-slide-up-leave-active,
    .tooltip-slide-down-enter-active,
    .tooltip-slide-down-leave-active,
    .tooltip-slide-left-enter-active,
    .tooltip-slide-left-leave-active,
    .tooltip-slide-right-enter-active,
    .tooltip-slide-right-leave-active,
    .tooltip-flip-up-enter-active,
    .tooltip-flip-up-leave-active,
    .tooltip-flip-down-enter-active,
    .tooltip-flip-down-leave-active,
    .tooltip-flip-left-enter-active,
    .tooltip-flip-left-leave-active,
    .tooltip-flip-right-enter-active,
    .tooltip-flip-right-leave-active,
    .tooltip-zoom-enter-active,
    .tooltip-zoom-leave-active,
    .tooltip-bounce-up-enter-active,
    .tooltip-bounce-up-leave-active,
    .tooltip-bounce-down-enter-active,
    .tooltip-bounce-down-leave-active,
    .tooltip-bounce-left-enter-active,
    .tooltip-bounce-left-leave-active,
    .tooltip-bounce-right-enter-active,
    .tooltip-bounce-right-leave-active,
    .tooltip-subtle-up-enter-active,
    .tooltip-subtle-up-leave-active,
    .tooltip-subtle-down-enter-active,
    .tooltip-subtle-down-leave-active,
    .tooltip-subtle-left-enter-active,
    .tooltip-subtle-left-leave-active,
    .tooltip-subtle-right-enter-active,
    .tooltip-subtle-right-leave-active,
    .tooltip-expand-up-enter-active,
    .tooltip-expand-up-leave-active,
    .tooltip-expand-down-enter-active,
    .tooltip-expand-down-leave-active,
    .tooltip-expand-left-enter-active,
    .tooltip-expand-left-leave-active,
    .tooltip-expand-right-enter-active,
    .tooltip-expand-right-leave-active {
        transition: none;
    }
}
</style>
