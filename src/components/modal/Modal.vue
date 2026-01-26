<script setup lang="ts">
/**
 * Modal Component
 * 
 * A premium, accessible modal component built on top of Radix Vue primitives.
 * Supports multiple sizes, variants, and smooth animations.
 */
import { computed, watch, onUnmounted } from 'vue'
import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
    VisuallyHidden,
} from 'radix-vue'
import { ref, onMounted, provide, inject, computed as vueComputed } from 'vue'
import Button from '../button/Button.vue'
import Icon from '../icon/Icon.vue'
import type { ModalProps, ModalEmits } from './types'
import './modal.css'

const props = withDefaults(defineProps<ModalProps>(), {
    open: undefined,
    modelValue: undefined,
    defaultOpen: false,
    size: 'md',
    variant: 'default',
    severity: 'default',
    position: 'center',
    animation: 'scale',
    loading: false,
    loadingColor: 'primary',
    close: true,
    overlay: true,
    overlayVariant: 'default',
    modal: true,
    dismissible: true,
    scrollable: false,
    transition: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    preventScroll: true,
    role: 'dialog',
    fullscreen: false,
    portal: true,
    content: undefined,
    stickyHeader: true,
    stickyFooter: true,
    loadingBlocking: true,
    draggable: false,
    resizable: false,
    swipeToDismiss: true,
    lazy: true,
    unmountOnClose: true,
    haptic: false,
    adaptivePadding: true,
    icon: true
})

const emit = defineEmits<ModalEmits>()

const isMounted = ref(false)
onMounted(() => {
    isMounted.value = true
})

// Handle v-model for openness
const isOpen = computed({
    get: () => props.open ?? props.modelValue ?? props.defaultOpen,
    set: (value) => {
        emit('update:modelValue', value)
        emit('update:open', value)
    }
})

const handleOpenChange = (value: boolean) => {
    isOpen.value = value
}

// Haptic Feedback Logic
const triggerHaptic = (style: 'light' | 'medium' | 'heavy') => {
    if (!props.haptic || typeof navigator === 'undefined' || !navigator.vibrate) return

    switch (style) {
        case 'light': navigator.vibrate(10); break
        case 'medium': navigator.vibrate([15, 10, 15]); break
        case 'heavy': navigator.vibrate([30, 10, 30]); break
    }
}

// Auto-close logic
let autoCloseTimeout: ReturnType<typeof setTimeout> | null = null

const startAutoCloseTask = () => {
    clearAutoCloseTask()
    if (props.autoClose && props.autoClose > 0) {
        autoCloseTimeout = setTimeout(() => {
            close('auto-close')
        }, props.autoClose)
    }
}

const clearAutoCloseTask = () => {
    if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout)
        autoCloseTimeout = null
    }
}

watch(() => props.autoClose, () => {
    if (isOpen.value) startAutoCloseTask()
})

onUnmounted(() => {
    clearAutoCloseTask()
})

// Classes
const contentClasses = computed(() => [
    'modal-content',
    `modal--${props.size}`,
    `modal--${props.variant}`,
    `modal--${props.severity}`,
    `modal--pos-${props.position}`,
    `modal--anim-${props.animation}`,
    props.scrollable ? 'modal-content--scrollable' : '',
    props.fullscreen ? 'modal-content--fullscreen' : '',
    props.contentClass,
    props.draggable ? 'modal--draggable' : '',
    `modal--depth-${currentDepth}`,
    props.adaptivePadding ? 'modal--adaptive-padding' : '',
    props.ui?.content
])

const overlayClasses = computed(() => [
    'modal-overlay',
    `modal-overlay--${props.overlayVariant}`,
    props.overlayClass,
    props.ui?.overlay
])

const overlayStyles = computed(() => {
    const styles: Record<string, string> = {}
    if (props.overlayColor || props.overlayOpacity !== undefined) {
        const color = props.overlayColor || '0, 0, 0'
        const opacity = props.overlayOpacity !== undefined ? props.overlayOpacity : 0.4

        if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('var')) {
            // If it's a full color string, we might need to handle opacity differently if it's not already in the string
            styles.backgroundColor = color
            if (props.overlayOpacity !== undefined && !color.includes('rgba')) {
                // This is tricky with CSS variables, but for hex we could convert.
                // Simple approach: if it's a hex, we apply opacity via color-mix if available or just use the color
                styles.opacity = props.overlayOpacity.toString()
            }
        } else {
            // Assume it's an RGB triple
            styles.backgroundColor = `rgba(${color}, ${opacity})`
        }
    }
    if (props.overlayBlur !== undefined) {
        const blurValue = typeof props.overlayBlur === 'number' ? `${props.overlayBlur}px` : props.overlayBlur
        styles.backdropFilter = `blur(${blurValue})`
    }
    return styles
})

const wrapperClasses = computed(() => [
    'modal-content-wrapper',
    `modal-wrapper--pos-${props.position}`,
    props.scrollable ? 'modal-wrapper--scrollable' : '',
    props.ui?.wrapper
])

// Close button normalized props
const closeButtonProps = computed(() => {
    const defaultIcon = props.closeIcon || 'heroicons:x-mark'

    if (typeof props.close === 'object') {
        return {
            severity: 'secondary' as const,
            variant: 'ghost' as const,
            icon: defaultIcon,
            size: 'sm' as const,
            ...props.close,
            class: ['modal-close', props.close.class]
        }
    }
    return {
        severity: 'secondary' as const,
        variant: 'ghost' as const,
        icon: defaultIcon,
        size: 'sm' as const,
        class: 'modal-close'
    }
})

// Animation names for Vue Transition
// We use Vue's Transition for smooth entry/exit

const close = (result?: any) => {
    isOpen.value = false
    emit('close', result)
}

const portalTarget = computed(() => {
    if (typeof props.portal === 'string') return props.portal
    if (typeof window !== 'undefined' && props.portal instanceof HTMLElement) return props.portal
    return undefined
})

// Draggable & Resizable Logic
const modalRef = ref<HTMLElement | null>(null)
const position = ref({ x: 0, y: 0 })
const size = ref({ width: 0, height: 0 })
const isDragging = ref(false)
const isResizing = ref(false)

const handleDragStart = (e: MouseEvent) => {
    if (!props.draggable) return
    // Only drag from header
    const target = e.target as HTMLElement
    if (!target.closest('.modal-header')) return

    isDragging.value = true
    const startX = e.clientX - position.value.x
    const startY = e.clientY - position.value.y

    const onMouseMove = (e: MouseEvent) => {
        position.value = {
            x: e.clientX - startX,
            y: e.clientY - startY
        }
    }

    const onMouseUp = () => {
        isDragging.value = false
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
}

const handleResizeStart = (e: MouseEvent) => {
    if (!props.resizable) return
    isResizing.value = true

    const startWidth = modalRef.value?.offsetWidth || 0
    const startHeight = modalRef.value?.offsetHeight || 0
    const startX = e.clientX
    const startY = e.clientY

    const onMouseMove = (e: MouseEvent) => {
        size.value = {
            width: startWidth + (e.clientX - startX),
            height: startHeight + (e.clientY - startY)
        }
    }

    const onMouseUp = () => {
        isResizing.value = false
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
}

// Swipe to Dismiss Logic
const touchY = ref(0)
const translateY = ref(0)
const isSwiping = ref(false)

const handleTouchStart = (e: TouchEvent) => {
    if (props.variant !== 'bottom-sheet' || !props.swipeToDismiss) return
    const touch = e.touches[0]
    if (!touch) return
    touchY.value = touch.clientY
    isSwiping.value = true
}

const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping.value) return
    const touch = e.touches[0]
    if (!touch) return
    const currentY = touch.clientY
    const delta = currentY - touchY.value
    if (delta > 0) {
        translateY.value = delta
    }
}

const handleTouchEnd = () => {
    if (!isSwiping.value) return
    isSwiping.value = false
    if (translateY.value > 150) {
        close('swipe')
    }
    translateY.value = 0
}

// Nested Modal Logic
const parentModalDepth = inject('modal-depth', 0)
const currentDepth = parentModalDepth + 1
provide('modal-depth', currentDepth)

// Multi-step logic
const activeStep = computed({
    get: () => props.step,
    set: (val) => emit('update:step', val!)
})

// Severity Icon Mapping
const severityIcon = computed(() => {
    if (props.icon === false) return null
    if (typeof props.icon === 'string') return props.icon

    switch (props.severity) {
        case 'success': return 'heroicons:check-circle'
        case 'danger': return 'heroicons:exclamation-triangle'
        case 'warning': return 'heroicons:exclamation-circle'
        case 'info': return 'heroicons:information-circle'
        default: return null
    }
})

const modalStyles = vueComputed(() => {
    const styles: Record<string, string> = {}

    // Draggable/Resizable
    if (props.draggable && (position.value.x !== 0 || position.value.y !== 0)) {
        styles.transform = `translate(${position.value.x}px, ${position.value.y}px)`
    }
    if (props.resizable && size.value.width > 0) {
        styles.width = `${size.value.width}px`
        styles.height = `${size.value.height}px`
    }

    // Swipe to Dismiss
    if (translateY.value > 0) {
        styles.transform = (styles.transform || '') + ` translateY(${translateY.value}px)`
        styles.transition = 'none'
    }

    // Visual Stacking for nested modals
    if (currentDepth > 1) {
        // We could apply effects to the parent here if we had a way to communicate back
    }

    return styles
})

// Aria-live Notifications
const notificationMessage = ref('')

watch(isOpen, (val) => {
    if (val) {
        notificationMessage.value = props.announcements?.opened || 'Modal opened'
        emit('open')
        startAutoCloseTask()
        triggerHaptic('light')
    }
    else {
        notificationMessage.value = props.announcements?.closed || 'Modal closed'
        emit('close')
        clearAutoCloseTask()
        triggerHaptic('medium')
    }
}, { immediate: true })

watch(() => props.loading, (val, oldVal) => {
    if (val !== false && oldVal === false) {
        notificationMessage.value = props.announcements?.loading || 'Content is loading...'
    } else if (val === false && oldVal !== false) {
        notificationMessage.value = props.announcements?.loaded || 'Content loaded'
    }
})

watch(activeStep, (val) => {
    if (val !== undefined) {
        notificationMessage.value = props.announcements?.stepChanged || `Step ${val} active`
    }
})

defineExpose({
    close
})
</script>

<template>
    <DialogRoot :open="isOpen" :modal="modal" @update:open="handleOpenChange">
        <DialogPortal v-if="isMounted" :to="portalTarget" :disabled="portal === false">
            <!-- Overlay transition -->
            <Transition :name="transition ? 'modal-overlay' : ''" :css="transition">
                <DialogOverlay v-if="isOpen && overlay && modal" :class="overlayClasses" :style="overlayStyles" />
            </Transition>

            <div v-if="isOpen || !unmountOnClose" v-show="isOpen"
                :class="[wrapperClasses, { 'modal-wrapper--hidden': !isOpen }]">
                <!-- Content transition -->
                <Transition :name="transition ? 'modal-content' : ''" :css="transition" appear
                    @after-leave="emit('after-leave')" @after-enter="emit('after-enter')">
                    <DialogContent v-if="isOpen || !unmountOnClose" ref="modalRef" :class="contentClasses"
                        :style="modalStyles" :aria-label="ariaLabel" :role="role" @interact-outside="(event: Event) => {
                            if (!dismissible) {
                                event.preventDefault()
                                emit('close-prevent')
                                return
                            }
                            if (!closeOnOutsideClick) event.preventDefault()
                        }" @escape-key-down="(event: KeyboardEvent) => {
                            if (!dismissible) {
                                event.preventDefault()
                                emit('close-prevent')
                                return
                            }
                            if (!closeOnEscape) event.preventDefault()
                        }" @mousedown="handleDragStart" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
                        @touchend="handleTouchEnd">
                        <!-- Drag Handle for Bottom Sheet -->
                        <div v-if="variant === 'bottom-sheet'" class="modal-drag-handle" />

                        <!-- Accessibility: Aria-live announcements -->
                        <VisuallyHidden aria-live="polite" role="status">
                            {{ notificationMessage }}
                        </VisuallyHidden>

                        <!-- Loading State Blocking -->
                        <div v-if="loading !== false && loadingBlocking" class="modal-loading-overlay">
                            <slot name="loading">
                                <!-- Subtle Spinner or just blocking -->
                            </slot>
                        </div>

                        <!-- Progress Bar -->
                        <div v-if="loading !== false" class="modal-progress"
                            :class="[`modal-progress--${loadingColor}`, { 'modal-progress--indeterminate': loading === true }]">
                            <div class="modal-progress-bar"
                                :style="typeof loading === 'number' ? { width: `${loading}%` } : {}"></div>
                        </div>

                        <slot name="content" :close="close">
                            <!-- Header Section -->
                            <header v-if="title || description || $slots.header || $slots.title || $slots.description"
                                :class="['modal-header', { 'modal-header--sticky': stickyHeader }, headerClass, ui?.header]">
                                <slot name="header" :close="close">
                                    <div v-if="severityIcon || $slots.icon" class="modal-header-icon"
                                        :class="`text-${severity}`">
                                        <slot name="icon">
                                            <Icon :name="severityIcon!" size="lg" />
                                        </slot>
                                    </div>

                                    <div class="flex flex-col gap-1.5 overflow-hidden flex-1">
                                        <DialogTitle v-if="title || $slots.title" :class="['modal-title', ui?.title]">
                                            <slot name="title">{{ title }}</slot>
                                        </DialogTitle>
                                        <DialogDescription v-if="description || $slots.description"
                                            :class="['modal-description', ui?.description]">
                                            <slot name="description">{{ description }}</slot>
                                        </DialogDescription>
                                    </div>

                                    <div v-if="$slots.actions" class="flex items-center gap-1.5 ml-auto">
                                        <slot name="actions" />
                                    </div>
                                </slot>
                            </header>

                            <!-- Accessibility: Ensure DialogTitle and DialogDescription are present for screen readers -->
                            <VisuallyHidden v-if="!title && !$slots.title && !$slots.header" as-child>
                                <DialogTitle>Modal Title</DialogTitle>
                            </VisuallyHidden>

                            <VisuallyHidden v-if="!description && !$slots.description && !$slots.header" as-child>
                                <DialogDescription class="sr-only">Modal Content</DialogDescription>
                            </VisuallyHidden>

                            <!-- Close Button -->
                            <DialogClose v-if="props.close !== false" :as-child="true">
                                <slot name="close" :ui="ui">
                                    <Button v-bind="closeButtonProps" aria-label="Close">
                                        <template #icon v-if="$slots['close-icon']">
                                            <slot name="close-icon" />
                                        </template>
                                    </Button>
                                </slot>
                            </DialogClose>

                            <!-- Body Section -->
                            <div :class="['modal-body', bodyClass, ui?.body]">
                                <slot name="body" :close="close" :step="activeStep">
                                    <Transition name="modal-step" mode="out-in">
                                        <div :key="activeStep" class="modal-step-content">
                                            <slot :open="isOpen" :step="activeStep" />
                                        </div>
                                    </Transition>
                                </slot>
                            </div>

                            <!-- Footer Section -->
                            <footer v-if="$slots.footer"
                                :class="['modal-footer', { 'modal-footer--sticky': stickyFooter }, footerClass, ui?.footer]">
                                <slot name="footer" :close="close" />
                            </footer>

                            <!-- Resize Handle -->
                            <div v-if="resizable" class="modal-resize-handle"
                                @mousedown.stop.prevent="handleResizeStart" />
                        </slot>
                    </DialogContent>
                </Transition>
            </div>
        </DialogPortal>
    </DialogRoot>
</template>
