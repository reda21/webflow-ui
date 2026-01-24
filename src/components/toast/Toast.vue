<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { Icon, Button, Avatar } from '@/index'
import type { ToastProps } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
    severity: 'contrast',
    duration: 5000,
    closable: true,
    icon: true
})

const emit = defineEmits<{
    'close': [id: string | number]
}>()

const isVisible = ref(true)
const progress = ref(100)
let timer: ReturnType<typeof setTimeout> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null

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
    isVisible.value = false
    emit('close', props.id)
}

onMounted(() => {
    if (props.duration > 0) {
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
    <div class="toast-root" :class="[`toast--${normalizedSeverity}`, props.class]" role="alert" aria-live="polite">
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
                    <Button size="xs" variant="soft" :severity="actionSeverity"
                        @click="action.onClick">
                        {{ action.label }}
                    </Button>
                </div>
            </div>

            <button v-if="closable" class="toast-close" @click="close" aria-label="Fermer">
                <Icon name="heroicons:x-mark" size="xs" />
            </button>
        </div>

        <!-- Progress Bar -->
        <div v-if="duration > 0" class="toast-progress">
            <div class="toast-progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
    </div>
</template>
