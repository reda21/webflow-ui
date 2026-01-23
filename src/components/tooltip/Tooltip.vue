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
 * - HTML content support
 * - Follow cursor mode
 * - Touch support (long press)
 */

import { computed, ref, watch, onMounted, onUnmounted, nextTick, type CSSProperties } from 'vue'
import type { TooltipProps } from './types'
import { useTooltipSingleton } from './useTooltipSingleton'
import { useFloatingUI, type FloatingUIOptions, type Boundary } from './useFloatingUI'

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
    animation: 'fade-in',
    animationDuration: 150,
    interactive: false,
    hideOnClick: true,
    closeOnEscape: true,
    disabled: false,
    defaultOpen: false,
    role: 'tooltip',
    html: false,
    followCursor: false,
    singleton: false,
    floatingUI: false
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
const mouseX = ref(0)
const mouseY = ref(0)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const positionStyles = ref<CSSProperties>({})

// Floating UI integration
const floatingOptions = computed<FloatingUIOptions>(() => {
    // Adapt offset type
    let offsetVal: number | { mainAxis?: number; crossAxis?: number } | undefined
    if (Array.isArray(props.offset)) {
        offsetVal = { mainAxis: props.offset[0], crossAxis: props.offset[1] }
    } else {
        offsetVal = props.offset
    }

    // Adapt boundary type
    let boundaryVal: Boundary | 'clippingParents' | undefined
    if (props.boundary === 'clippingParents') {
        boundaryVal = 'clippingParents'
    } else if (typeof props.boundary === 'object') {
        boundaryVal = props.boundary as Boundary
    }

    return {
        placement: props.position,
        offset: offsetVal,
        flip: props.flip,
        shift: props.shift,
        boundary: boundaryVal,
        autoUpdate: true
    }
})

const floatingUI = props.floatingUI ? useFloatingUI(
    computed(() => props.virtualElement ? props.virtualElement : triggerRef.value),
    contentRef,
    floatingOptions
) : null

// Timers
let showTimeout: ReturnType<typeof setTimeout> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null
let longPressTimeout: ReturnType<typeof setTimeout> | null = null

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

    const show = () => {
        isVisible.value = true
        emit('show')
        emit('update:modelValue', true)
    }

    if (delay > 0) {
        showTimeout = setTimeout(show, delay)
    } else {
        show()
    }
}

const hideTooltip = () => {
    clearTimeouts()

    const delay = getHideDelay()

    const hide = () => {
        isVisible.value = false
        emit('hide')
        emit('update:modelValue', false)
    }

    if (delay > 0) {
        hideTimeout = setTimeout(hide, delay)
    } else {
        hide()
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
// Singleton Pattern
// ============================================
const singleton = computed(() => {
    return props.singleton ? useTooltipSingleton(tooltipId, showTooltip, hideTooltip, isVisible) : null
})

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
        if (props.singleton && singleton.value) {
            singleton.value.show()
        } else {
            showTooltip()
        }
    }
}

const handleMouseLeave = () => {
    if (hasTrigger('hover')) {
        if (props.singleton && singleton.value) {
            singleton.value.hide()
        } else {
            hideTooltip()
        }
    }
}

const handleFocus = (event: FocusEvent) => {
    if (hasTrigger('focus')) {
        event.stopPropagation()
        if (props.singleton && singleton.value) {
            singleton.value.show()
        } else {
            showTooltip()
        }
    }
}

const handleBlur = (event: FocusEvent) => {
    if (hasTrigger('focus')) {
        event.stopPropagation()
        if (props.singleton && singleton.value) {
            singleton.value.hide()
        } else {
            hideTooltip()
        }
    }
}

const handleClick = (event: MouseEvent) => {
    if (hasTrigger('click')) {
        event.stopPropagation()
        if (props.singleton && singleton.value) {
            singleton.value.toggle()
        } else {
            toggleTooltip()
        }
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    if (props.closeOnEscape && event.key === 'Escape' && isVisible.value) {
        hideTooltip()
        event.preventDefault()
    }
}

const handleMouseMove = (event: MouseEvent) => {
    if (props.followCursor) {
        mouseX.value = event.clientX
        mouseY.value = event.clientY
    }
}

const handleTouchStart = (event: TouchEvent) => {
    event.stopPropagation()
    longPressTimeout = setTimeout(() => {
        showTooltip()
    }, 500) // Long press delay
}

const handleTouchEnd = (event: TouchEvent) => {
    event.stopPropagation()
    if (longPressTimeout) {
        clearTimeout(longPressTimeout)
        longPressTimeout = null
    }
}

// ============================================
// Positioning Logic
// ============================================
const teleportTo = computed(() => {
    if (typeof props.teleport === 'string') return props.teleport
    return 'body'
})

const updatePosition = async () => {
    if (!isVisible.value) return
    if (props.followCursor) return

    // Use Floating UI if enabled
    if (props.floatingUI && floatingUI) {
        await nextTick()
        await floatingUI.updatePosition()
        return
    }

    // Fallback to manual positioning
    if (props.teleport || props.virtualElement) {
        await nextTick()

        const triggerEl = props.virtualElement
            ? { getBoundingClientRect: props.virtualElement.getBoundingClientRect }
            : triggerRef.value

        const contentEl = contentRef.value

        if (!triggerEl || !contentEl) return

        const triggerRect = triggerEl.getBoundingClientRect()
        const contentRect = contentEl.getBoundingClientRect()
        const margin = 8

        let top = 0
        let left = 0

        // Basic positioning logic
        switch (props.position) {
            case 'top':
            case 'top-start':
            case 'top-end':
                top = triggerRect.top - contentRect.height - margin
                left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
                break
            case 'bottom':
            case 'bottom-start':
            case 'bottom-end':
                top = triggerRect.bottom + margin
                left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
                break
            case 'left':
            case 'left-start':
            case 'left-end':
                top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
                left = triggerRect.left - contentRect.width - margin
                break
            case 'right':
            case 'right-start':
            case 'right-end':
                top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
                left = triggerRect.right + margin
                break
        }

        positionStyles.value = {
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
            margin: 0,
            transform: 'none',
            zIndex: 9999
        }
    } else {
        positionStyles.value = {}
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

const tooltipStyles = computed((): CSSProperties => {
    if (props.followCursor && isVisible.value) {
        return {
            position: 'fixed',
            left: `${mouseX.value + 10}px`, // Offset to not overlap cursor
            top: `${mouseY.value + 10}px`,
            bottom: 'auto',
            right: 'auto',
            transform: 'none',
            margin: 0,
            zIndex: 9999
        }
    }

    // Use Floating UI styles if enabled
    if (props.floatingUI && floatingUI) {
        return floatingUI.floatingStyles.value
    }

    return positionStyles.value
})

// Animation name for Vue Transition
const transitionName = computed(() => {
    const base = props.animation || 'fade-in'
    return `tooltip--${base}`
})

// ============================================
// Watchers
// ============================================
watch(() => props.modelValue, (value) => {
    if (value !== undefined) {
        isVisible.value = value
    }
})

watch(isVisible, (value) => {
    if (value) {
        updatePosition()
        window.addEventListener('scroll', updatePosition, true)
        window.addEventListener('resize', updatePosition)

        // Start Floating UI auto-update if enabled
        if (props.floatingUI && floatingUI) {
            floatingUI.startAutoUpdate()
        }
    } else {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)

        // Stop Floating UI auto-update if enabled
        if (props.floatingUI && floatingUI) {
            floatingUI.stopAutoUpdate()
        }
    }
})

watch(() => props.virtualElement, () => {
    if (isVisible.value) updatePosition()
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

    // Clean up Floating UI auto-update
    if (props.floatingUI && floatingUI) {
        floatingUI.stopAutoUpdate()
    }
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
        @focusout="handleBlur" @click="handleClick" @mousemove="handleMouseMove" @touchstart="handleTouchStart"
        @touchend="handleTouchEnd">
        <!-- Trigger Element -->
        <div ref="triggerRef" class="tooltip-trigger" :aria-describedby="isVisible ? tooltipId : undefined">
            <slot :is-visible="isVisible" :show="showTooltip" :hide="hideTooltip" :toggle="toggleTooltip" />
        </div>

        <!-- Tooltip Content with Transition -->
        <Teleport :to="teleportTo" :disabled="!teleport">
            <Transition :name="transitionName">
                <div ref="contentRef" v-if="isVisible && !disabled" :id="tooltipId" :class="contentClasses" :role="role"
                    :aria-hidden="!isVisible" :style="tooltipStyles">
                    <!-- Arrow -->
                    <div v-if="arrow !== 'none' && !followCursor" :class="arrowClasses" />

                    <!-- Title (optional) -->
                    <div v-if="title || $slots.title" class="tooltip-title">
                        <slot name="title">{{ title }}</slot>
                    </div>

                    <!-- Body -->
                    <div class="tooltip-body">
                        <slot name="content">
                            <span v-if="html" v-html="content"></span>
                            <span v-else>{{ content }}</span>
                        </slot>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
