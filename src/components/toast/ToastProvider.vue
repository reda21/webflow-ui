<script setup lang="ts">
import { ref, onMounted, provide, defineExpose } from 'vue'
import ToastItem from './Toast.vue'
import type { ToastOptions, ToastPosition, ToastProps, ToastId } from './types'
import { toastsState, initPersistence } from './store'
import { useWebmxConfig } from '../../lib/config'
import './toast.css'

const props = withDefaults(defineProps<{
    max?: number
    stacked?: boolean
    persist?: boolean
    onAdd?: (toast: ToastProps) => void
    onRemove?: (id: ToastId) => void
}>(), {
    max: 5,
    stacked: false,
    persist: false
})

const isExpanded = ref(false)
const isClient = ref(false)

onMounted(() => {
    isClient.value = true
    if (props.persist) {
        initPersistence()
    }
})

// Use global state
const toasts = toastsState
const globalConfig = useWebmxConfig()

// Performance optimization: prevent spam of identical toasts
let lastToastTime = 0
let lastToastKey = ''

const isActive = (id: ToastId) => {
    for (const position in toasts.value) {
        if (toasts.value[position as ToastPosition].some(t => t.id === id)) return true
    }
    return false
}

const updateToast = (id: ToastId, options: Partial<ToastOptions>) => {
    for (const position in toasts.value) {
        const index = toasts.value[position as ToastPosition].findIndex(t => t.id === id)
        if (index !== -1) {
            toasts.value[position as ToastPosition][index] = {
                ...toasts.value[position as ToastPosition][index],
                ...options
            } as ToastProps
            return true
        }
    }
    return false
}

const removeToast = (id: ToastId) => {
    for (const position in toasts.value) {
        toasts.value[position as ToastPosition] = toasts.value[position as ToastPosition].filter(t => t.id !== id)
    }
    if (props.onRemove) props.onRemove(id)
}

const addToast = (options: ToastOptions) => {
    const defaults = globalConfig?.toast || {}
    const toasterDefaults = globalConfig?.toaster || {}
    const maxLimit = props.max ?? toasterDefaults.max ?? 5

    // Rate limiting / Deduplication by content (Performance Optimization)
    const currentKey = `${options.title}-${options.description}`
    const now = Date.now()
    if (currentKey === lastToastKey && now - lastToastTime < 500) {
        return lastToastKey
    }
    lastToastTime = now
    lastToastKey = currentKey

    // Deduplication by ID
    const id = options.id || Math.random().toString(36).substring(2, 9)
    if (options.id && isActive(options.id)) {
        updateToast(options.id, options)
        return options.id
    }

    const position = options.position || defaults.position || 'top-right'

    // Respect max limit (Performance Optimization)
    if (toasts.value[position].length >= maxLimit) {
        toasts.value[position].shift()
    }

    const newToast: ToastProps = {
        id,
        title: options.title,
        description: options.description,
        severity: options.severity || defaults.severity || 'contrast',
        duration: options.duration !== undefined ? options.duration : (defaults.duration !== undefined ? defaults.duration : 5000),
        closable: options.closable !== undefined ? options.closable : (defaults.closable !== undefined ? defaults.closable : true),
        icon: options.icon !== undefined ? options.icon : true,
        action: options.action,
        actions: options.actions,
        avatar: options.avatar,
        orientation: options.orientation || defaults.orientation || 'horizontal',
        type: options.type || 'foreground',
        progress: options.progress !== undefined ? options.progress : (defaults.progress !== undefined ? defaults.progress : true),
        class: options.class,
        variant: options.variant || defaults.variant || 'soft',
        animation: options.animation || defaults.animation || 'slide',
        image: options.image,
        width: options.width,
        link: options.link
    }

    toasts.value[position].push(newToast)
    if (props.onAdd) props.onAdd(newToast)
    return id
}

const clearAll = () => {
    for (const position in toasts.value) {
        toasts.value[position as ToastPosition] = []
    }
}

// Expose and Provide methods
const api = {
    add: addToast,
    update: updateToast,
    remove: removeToast,
    dismiss: removeToast,
    clear: clearAll,
    isActive
}

defineExpose(api)
provide('toast', api)
</script>

<template>
    <div v-if="isClient" class="toast-containers">
        <template v-for="(list, position) in toasts" :key="position">
            <div v-if="list.length > 0" class="toast-viewport" role="region" :aria-label="`Notifications ${position}`"
                :class="[
                    `toast-viewport--${position}`,
                    {
                        'toast-viewport--stacked': props.stacked,
                        'toast-viewport--expanded': isExpanded && props.stacked
                    }
                ]" @mouseenter="isExpanded = true" @mouseleave="isExpanded = false">
                <TransitionGroup name="toast">
                    <ToastItem v-for="toast in list" :key="toast.id" v-bind="toast" @close="removeToast(toast.id)" />
                </TransitionGroup>
            </div>
        </template>
        <slot />
    </div>
</template>

<style scoped>
.toast-containers {
    position: relative;
    z-index: 9999;
}
</style>
