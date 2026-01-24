<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { Icon, Button, Avatar } from '@/index'
import type { ToastProps } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
    severity: 'contrast',
    duration: 5000,
    showProgress: true,
    closable: true,
    preventClose: false,
    icon: true
})

const emit = defineEmits<{
    'close': [id: string | number],
    'close:prevent': [id: string | number]
}>()

const isVisible = ref(true)
const progress = ref(100)
const isPaused = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null
let remainingTime = props.duration

const normalizedSeverity = computed(() => props.severity === 'warning' ? 'warn' : props.severity)

const severityIcon = computed(() => {
    if (props.icon === false) return null
    if (typeof props.icon === 'string') return props.icon

    switch (normalizedSeverity.value) {
        case 'success': return 'heroicons:check-circle-solid'
        case 'danger': return 'heroicons:exclamation-circle-solid'
        case 'warn': return 'heroicons:exclamation-triangle-solid'
        case 'info': return 'heroicons:information-circle-solid'
        case 'help': return 'heroicons:question-mark-circle-solid'
        default: return 'heroicons:bell-solid'
    }
})

const actionSeverity = computed(() => normalizedSeverity.value === 'contrast' ? 'secondary' : normalizedSeverity.value)

const close = () => {
    if (props.preventClose) {
        emit('close:prevent', props.id)
        return
    }
    isVisible.value = false
    emit('close', props.id)
}

// Force close - pour fermeture manuelle, bypass preventClose
const forceClose = () => {
    isVisible.value = false
    emit('close', props.id)
}

const pauseTimer = () => {
    if (props.duration <= 0 || props.preventClose) return
    isPaused.value = true
    if (timer) {
        clearTimeout(timer)
        timer = null
    }
    if (progressInterval) {
        clearInterval(progressInterval)
        progressInterval = null
    }
}

const resumeTimer = () => {
    if (props.duration <= 0 || props.preventClose) return
    isPaused.value = false
    remainingTime = (progress.value / 100) * props.duration

    if (remainingTime > 0) {
        timer = setTimeout(() => {
            close()
        }, remainingTime)

        const step = 100 / (props.duration / 10)
        progressInterval = setInterval(() => {
            progress.value -= step
            if (progress.value <= 0) {
                clearInterval(progressInterval!)
            }
        }, 10)
    }
}

onMounted(() => {
    if (props.duration > 0 && !props.preventClose) {
        timer = setTimeout(() => {
            close()
        }, props.duration)

        const step = 100 / (props.duration / 10)
        progressInterval = setInterval(() => {
            progress.value -= step
            if (progress.value <= 0) {
                clearInterval(progressInterval!)
            }
        }, 10)
    }
})

onUnmounted(() => {
    if (timer) clearTimeout(timer)
    if (progressInterval) clearInterval(progressInterval)
})
</script>

<template>
    <div class="toast-root"
        :class="[`toast-${normalizedSeverity}`, props.class, { 'toast-prevent-close': preventClose }]" role="alert"
        aria-live="polite" @mouseenter="pauseTimer" @mouseleave="resumeTimer">
        <div class="toast-content">
            <div v-if="avatar" class="toast-avatar-wrapper shrink-0">
                <Avatar :src="avatar" size="sm" rounded="full" loading="eager" />
            </div>
            <div v-else-if="severityIcon" class="toast-icon-wrapper">
                <Icon :name="severityIcon" size="sm" />
            </div>

            <div class="toast-body">
                <h4 v-if="title" class="toast-title">{{ title }}</h4>
                <p v-if="description" class="toast-description">{{ description }}</p>

                <div v-if="action" class="toast-actions mt-2">
                    <Button size="xs" variant="soft" :severity="actionSeverity" @click="action.onClick">
                        {{ action.label }}
                    </Button>
                </div>
            </div>

            <button v-if="closable" class="toast-close" @click="forceClose" aria-label="Fermer">
                <Icon name="heroicons:x-mark" size="xs" />
            </button>
        </div>

        <!-- Progress Bar -->
        <div v-if="duration > 0 && showProgress && !preventClose" class="toast-progress">
            <div class="toast-progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
    </div>
</template>
