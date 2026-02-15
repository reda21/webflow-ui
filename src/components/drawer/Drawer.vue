<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
/**
 * Drawer Component
 *
 * A premium, accessible slide-out panel built with Vue 3.
 * Supports left/right/top/bottom placement, multiple sizes,
 * overlay variants, and smooth CSS animations.
 */
import { computed, ref, watch, onMounted, onUnmounted, nextTick, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'
import type { DrawerProps, DrawerEmits, DrawerTransition } from './types'
import './drawer.css'

const attrs = useAttrs()

const props = withDefaults(defineProps<DrawerProps>(), {
    open: undefined,
    modelValue: undefined,
    placement: 'right',
    size: 'md',
    variant: 'default',
    closable: true,
    closeIcon: 'mdi:close',
    closeOnOutsideClick: true,
    closeOnEscape: true,
    closeConfirm: false,
    closeConfirmMessage: 'Êtes-vous sûr de vouloir fermer ?',
    overlay: true,
    overlayVariant: 'default',
    overlayBlur: undefined,
    overlayOpacity: undefined,
    preventScroll: true,
    lazy: false,
    unmountOnClose: false,
    loading: false,
    portal: undefined,
    ariaLabel: undefined,
    swipeToClose: true,
    swipeThreshold: 50,
    resizable: false,
    minSize: 200,
    maxSize: 800,
    snapPoints: () => [],
    showPullIndicator: false,
    transitionType: 'slide',
    transitionDuration: 350,
    persistent: false,
    mini: false,
    autoClose: 0,
    restoreFocus: true,
    restoreFocusTarget: undefined,
})

const emit = defineEmits<DrawerEmits>()

// ── Open state ──
const internalOpen = ref(false)
const hasBeenOpened = ref(false)
const lastActiveElement = ref<HTMLElement | null>(null)

const isOpen = computed({
    get() {
        return props.modelValue ?? props.open ?? internalOpen.value
    },
    set(value: boolean) {
        internalOpen.value = value
        emit('update:modelValue', value)
        emit('update:open', value)
    },
})

// ── Focus management ──
watch(isOpen, async (val) => {
    if (val) {
        hasBeenOpened.value = true
        emit('open')

        if (props.restoreFocus) {
            lastActiveElement.value = document.activeElement as HTMLElement
            await nextTick()
            const panel = document.querySelector('.drawer-panel') as HTMLElement
            panel?.focus()
        }
    } else {
        if (props.restoreFocus && lastActiveElement.value) {
            await nextTick()
            lastActiveElement.value?.focus()
        }
    }
})

// ── Body scroll lock ──
watch(isOpen, (val) => {
    if (!props.preventScroll || props.persistent) return
    if (typeof document === 'undefined') return
    if (val) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

onUnmounted(() => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
    }
})

// ── Auto close timer ──
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null

watch(isOpen, (val) => {
    if (autoCloseTimer) {
        clearTimeout(autoCloseTimer)
        autoCloseTimer = null
    }
    if (val && props.autoClose > 0) {
        autoCloseTimer = setTimeout(() => {
            close()
        }, props.autoClose)
    }
})

// ── Keyboard handling ──
function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.closeOnEscape && isOpen.value) {
        if (props.closeConfirm) {
            emit('confirm-close')
        } else {
            close()
        }
    }
}

onMounted(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', onKeydown)
    }
})

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', onKeydown)
    }
})

// ── Close ──
function close() {
    if (!props.closable && !props.closeOnOutsideClick) return
    isOpen.value = false
}

function onOverlayClick() {
    if (props.closeOnOutsideClick) {
        if (props.closeConfirm) {
            emit('confirm-close')
        } else {
            close()
        }
    }
}

function onAfterEnter() {
    emit('after-enter')
}

function onAfterLeave() {
    emit('after-leave')
    emit('close')
}

// ── Swipe to close ──
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchCurrentX = ref(0)
const touchCurrentY = ref(0)
const isDragging = ref(false)

function onTouchStart(e: TouchEvent) {
    if (!props.swipeToClose || props.placement === 'top' || props.placement === 'bottom') return
    const touch = e.touches[0]
    if (!touch) return
    touchStartX.value = touch.clientX
    touchStartY.value = touch.clientY
    isDragging.value = true
}

function onTouchMove(e: TouchEvent) {
    if (!isDragging.value) return
    const touch = e.touches[0]
    if (!touch) return
    touchCurrentX.value = touch.clientX
    touchCurrentY.value = touch.clientY

    const deltaX = touchCurrentX.value - touchStartX.value
    const deltaY = touchCurrentY.value - touchStartY.value

    if (props.placement === 'right' && deltaX < -props.swipeThreshold) {
        close()
    } else if (props.placement === 'left' && deltaX > props.swipeThreshold) {
        close()
    }
}

function onTouchEnd() {
    isDragging.value = false
}

// ── Resizable ──
const currentSize = ref(0)
const isResizing = ref(false)
const resizeStartX = ref(0)
const resizeStartSize = ref(0)

function onResizeStart(e: MouseEvent) {
    if (!props.resizable) return
    isResizing.value = true
    resizeStartX.value = e.clientX
    resizeStartSize.value = currentSize.value

    document.addEventListener('mousemove', onResizeMove)
    document.addEventListener('mouseup', onResizeEnd)
}

function onResizeMove(e: MouseEvent) {
    if (!isResizing.value) return

    let delta: number
    if (props.placement === 'right') {
        delta = resizeStartX.value - e.clientX
    } else if (props.placement === 'left') {
        delta = e.clientX - resizeStartX.value
    } else if (props.placement === 'top') {
        delta = e.clientY - resizeStartY.value
    } else {
        delta = resizeStartY.value - e.clientY
    }

    const newSize = Math.min(Math.max(resizeStartSize.value + delta, props.minSize), props.maxSize)
    currentSize.value = newSize
    emit('resize', newSize)
}

function onResizeEnd() {
    isResizing.value = false
    document.removeEventListener('mousemove', onResizeMove)
    document.removeEventListener('mouseup', onResizeEnd)
}

let resizeStartY = ref(0)

// ── Computed classes ──
const panelClasses = computed(() => [
    'drawer-panel',
    `drawer-panel--${props.placement}`,
    props.size === 'custom' ? 'drawer-panel--custom' : `drawer-panel--${props.size}`,
    `drawer-panel--${props.variant}`,
    {
        'drawer-panel--persistent': props.persistent,
        'drawer-panel--mini': props.mini,
        'drawer-panel--resizable': props.resizable,
        'drawer-panel--no-overlay': !props.overlay || props.persistent,
    },
    props.contentClass,
])

const overlayClasses = computed(() => [
    'drawer-overlay',
    `drawer-overlay--${props.overlayVariant}`,
    props.overlayClass,
])

const overlayStyles = computed(() => {
    const styles: Record<string, string> = {}
    if (props.overlayOpacity !== undefined) {
        styles.opacity = String(props.overlayOpacity)
    }
    if (props.overlayBlur !== undefined && !props.persistent) {
        const blur = typeof props.overlayBlur === 'number' ? `${props.overlayBlur}px` : props.overlayBlur
        styles.backdropFilter = `blur(${blur})`
    }
    return styles
})

const panelStyles = computed(() => {
    const styles: Record<string, string> = {}

    if (props.size === 'custom' || !['xs', 'sm', 'md', 'lg', 'xl', 'full'].includes(props.size)) {
        styles[props.placement === 'top' || props.placement === 'bottom' ? 'height' : 'width'] = props.size
    }

    if (currentSize.value > 0 && props.resizable) {
        styles[props.placement === 'top' || props.placement === 'bottom' ? 'height' : 'width'] = `${currentSize.value}px`
    }

    if (props.transitionType !== 'slide') {
        styles.transitionDuration = `${props.transitionDuration}ms`
    }

    return styles
})

const transitionName = computed(() => {
    if (props.transitionType === 'fade') return 'drawer-fade'
    if (props.transitionType === 'scale') return 'drawer-scale'
    if (props.transitionType === 'spring') return 'drawer-spring'
    return `drawer-${props.placement}`
})

const reducedMotion = computed(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

// ── Should render content (lazy support) ──
const shouldRender = computed(() => {
    if (!props.lazy) return true
    if (props.unmountOnClose) return isOpen.value
    return hasBeenOpened.value
})

// Expose
defineExpose({ open: () => (isOpen.value = true), close })
</script>

<template>
    <Teleport :to="(portal as string) || 'body'" :disabled="portal === undefined || portal === false">
        <!-- Overlay -->
        <Transition name="drawer-overlay">
            <div v-if="isOpen && overlay && !persistent" :class="overlayClasses" :style="overlayStyles"
                @click="onOverlayClick" />
        </Transition>

        <!-- Panel -->
        <Transition :name="transitionName" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
            <div v-if="isOpen || persistent" :class="panelClasses" :style="panelStyles" v-bind="attrs" role="dialog"
                :aria-modal="!persistent" :aria-label="ariaLabel || title" tabindex="-1" @touchstart="onTouchStart"
                @touchmove="onTouchMove" @touchend="onTouchEnd">
                <!-- Pull Indicator -->
                <div v-if="showPullIndicator && (placement === 'top' || placement === 'bottom')"
                    class="drawer-pull-indicator">
                    <div class="drawer-pull-indicator-bar" />
                </div>

                <!-- Resize Handle -->
                <div v-if="resizable && (placement === 'left' || placement === 'right')"
                    class="drawer-resize-handle drawer-resize-handle--vertical" @mousedown="onResizeStart" />
                <div v-if="resizable && (placement === 'top' || placement === 'bottom')"
                    class="drawer-resize-handle drawer-resize-handle--horizontal" @mousedown="onResizeStart" />

                <!-- Header -->
                <div v-if="title || description || closable || $slots.header" :class="['drawer-header', headerClass]">
                    <slot name="header">
                        <div class="drawer-header-content">
                            <h2 v-if="title" class="drawer-title">{{ title }}</h2>
                            <p v-if="description" class="drawer-description">{{ description }}</p>
                        </div>
                    </slot>
                    <button v-if="closable && !persistent" class="drawer-close" aria-label="Close drawer"
                        @click="close">
                        <Icon :icon="closeIcon" :width="20" />
                    </button>
                </div>

                <!-- Loading -->
                <div v-if="loading" class="drawer-loading">
                    <div class="drawer-loading-spinner" />
                </div>

                <!-- Body -->
                <div v-if="shouldRender && !loading" :class="['drawer-body', bodyClass]">
                    <slot />
                </div>

                <!-- Footer -->
                <div v-if="$slots.footer" :class="['drawer-footer', footerClass]">
                    <slot name="footer" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
