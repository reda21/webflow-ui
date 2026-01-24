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
import { useTooltipGroup } from './useTooltipGroup'
import { useTooltipPosition } from './useTooltipPosition'

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
    floatingUI: false,
    group: undefined,
    headless: false,
    teleport: true
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
const isTestEnv = typeof import.meta !== 'undefined' && (import.meta as any)?.env?.MODE === 'test'
const tooltipId = isTestEnv ? 'tooltip-test' : `tooltip-${Math.random().toString(36).substring(2, 9)}`
const mouseX = ref(0)
const mouseY = ref(0)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const positionStyles = ref<CSSProperties>({})

// Group Integration
const { isGroupActive, registerShow, registerHide } = useTooltipGroup(props.group)

// Positioning Integration
const { tooltipStyles: computedPositionStyles, updatePosition, startAutoUpdate, stopAutoUpdate } = useTooltipPosition({
    props,
    triggerRef,
    contentRef,
    isVisible
})

// Timers
let showTimeout: ReturnType<typeof setTimeout> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null
let longPressTimeout: ReturnType<typeof setTimeout> | null = null

// ============================================
// Delay helpers
// ============================================
const getShowDelay = (): number => {
    if (isGroupActive.value) return 0 // Smart delay: instant if group is active

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
        registerShow() // Notify group
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
        // Notify group with delay to keep it active for a bit
        // Use 500ms grace period or whatever logic
        registerHide(delay)
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
        // If interactive, check if focus moved to content
        if (props.interactive && contentRef.value?.contains(event.relatedTarget as Node)) {
            return
        }

        event.stopPropagation()
        if (props.singleton && singleton.value) {
            singleton.value.hide()
        } else {
            hideTooltip()
        }
    }
}

const handleContentBlur = (event: FocusEvent) => {
    if (hasTrigger('focus')) {
        // If focus moved back to trigger or stays within content, do nothing
        if (triggerRef.value?.contains(event.relatedTarget as Node) ||
            contentRef.value?.contains(event.relatedTarget as Node)) {
            return
        }

        hideTooltip()
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


// ============================================
// Computed Classes & Animation
// ============================================
const wrapperClasses = computed(() => {
    if (props.headless) return ['tooltip-wrapper']
    return [
        'tooltip-wrapper',
        `tooltip-wrapper--${props.position}`,
        `tooltip-wrapper--${props.variant}`,
        `tooltip-wrapper--${props.size}`,
        {
            'tooltip-wrapper--disabled': props.disabled,
            'tooltip-wrapper--interactive': props.interactive,
            'tooltip-wrapper--glass': props.variant === 'glass'
        }
    ]
})

const contentClasses = computed(() => {
    if (props.headless) return ['tooltip-content']
    return [
        'tooltip-content',
        `tooltip-content--${props.position}`,
        `tooltip-content--${props.variant}`,
        `tooltip-content--${props.size}`,
        {
            'tooltip-content--interactive': props.interactive
        }
    ]
})

const arrowClasses = computed(() => [
    'tooltip-arrow',
    `tooltip-arrow--${props.arrow}`,
    `tooltip-arrow--${props.position}`
])

const tooltipStyles = computed((): CSSProperties => {
    if (props.followCursor && isVisible.value) {
        return {
            position: 'fixed',
            left: `${mouseX.value + 10}px`, // Offset to not overlap cursor
            top: `${mouseY.value + 10}px`,
            bottom: 'auto',
            right: 'auto',
            margin: 0,
            zIndex: 9999
        }
    }

    return computedPositionStyles.value
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
        // useTooltipPosition handles scroll, resize, mutation, floating-ui, etc.
        startAutoUpdate()
    } else {
        stopAutoUpdate()
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
    stopAutoUpdate()
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
                    :aria-hidden="!isVisible" :style="tooltipStyles" @focusout="handleContentBlur">
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
