<script setup lang="ts">
import { ref, watch } from 'vue'
import ToastItem from './Toast.vue'
import type { ToastOptions, ToastPosition, ToastProps } from './types'
import './toast.css'

// Global state for toasts
const toasts = ref<Record<ToastPosition, ToastProps[]>>({
    'top-right': [],
    'top-left': [],
    'bottom-right': [],
    'bottom-left': [],
    'top-center': [],
    'bottom-center': []
})

const addToast = (options: ToastOptions) => {
    const position = options.position || 'top-right'
    const id = options.id || Math.random().toString(36).substring(2, 9)

    const newToast: ToastProps = {
        id,
        title: options.title,
        description: options.description,
        severity: options.severity || 'contrast',
        duration: options.duration !== undefined ? options.duration : 5000,
        closable: options.closable !== undefined ? options.closable : true,
        icon: options.icon !== undefined ? options.icon : true,
        action: options.action,
        avatar: options.avatar,
        class: options.class
    }

    toasts.value[position].push(newToast)
    return id
}

const removeToast = (id: string | number) => {
    for (const position in toasts.value) {
        toasts.value[position as ToastPosition] = toasts.value[position as ToastPosition].filter(t => t.id !== id)
    }
}

const clearAll = () => {
    for (const position in toasts.value) {
        toasts.value[position as ToastPosition] = []
    }
}

// Expose methods
defineExpose({
    add: addToast,
    remove: removeToast,
    clear: clearAll
})

// Provide to children
import { provide } from 'vue'
provide('toast', {
    add: addToast,
    remove: removeToast,
    clear: clearAll
})
</script>

<template>
    <div class="toast-containers">
        <template v-for="(list, position) in toasts" :key="position">
            <div v-if="list.length > 0" class="toast-viewport" :class="`toast-viewport--${position}`">
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
