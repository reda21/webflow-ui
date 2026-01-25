<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { Icon, Button, Avatar } from '@/index'
import type { ToastProps } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
    severity: 'contrast',
    duration: 5000,
    progress: true,
    closable: true,
    preventClose: false,
    icon: true,
    orientation: 'horizontal',
    type: 'foreground'
})

export interface SwipeEvent {
    direction: 'up' | 'down' | 'left' | 'right'
    distanceX: number
    distanceY: number
}

const emit = defineEmits<{
    'close': [id: string | number],
    'close:prevent': [id: string | number],
    'pause': [],
    'resume': [],
    'escapeKeyDown': [event: KeyboardEvent],
    'swipeStart': [event: TouchEvent],
    'swipeMove': [event: TouchEvent],
    'swipeCancel': [event: TouchEvent],
    'swipeEnd': [event: SwipeEvent],
    'update:open': [value: boolean]
}>()

const isVisible = ref(true)
const progress = ref(100)
const isPaused = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null
let remainingTime = props.duration

// Swipe tracking
let touchStartX = 0
let touchStartY = 0

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

const progressColor = computed(() => {
    if (typeof props.progress === 'object' && props.progress.color) {
        return props.progress.color
    }
    return undefined
})

const shouldShowProgress = computed(() => {
    return props.duration > 0 && props.progress !== false && !props.preventClose
})

const close = () => {
    if (props.preventClose) {
        emit('close:prevent', props.id)
        return
    }
    isVisible.value = false
    emit('update:open', false)
    emit('close', props.id)
}

// Force close - pour fermeture manuelle, bypass preventClose
const forceClose = () => {
    isVisible.value = false
    emit('update:open', false)
    emit('close', props.id)
}

const pauseTimer = () => {
    if (props.duration <= 0 || props.preventClose) return
    isPaused.value = true
    emit('pause')
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
    emit('resume')
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

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        emit('escapeKeyDown', event)
        if (!props.preventClose) {
            forceClose()
        }
    }
}

const onTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX
    touchStartY = event.touches[0].clientY
    emit('swipeStart', event)
}

const onTouchMove = (event: TouchEvent) => {
    emit('swipeMove', event)
}

const el = ref<HTMLElement | null>(null)
const height = ref(0)
let resizeObserver: ResizeObserver | null = null

defineExpose({
    height
})

const onTouchEnd = (event: TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX
    const touchEndY = event.changedTouches[0].clientY
    const diffX = touchEndX - touchStartX
    const diffY = touchEndY - touchStartY

    if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
        emit('swipeCancel', event)
        return
    }

    let direction: 'up' | 'down' | 'left' | 'right' = 'right'
    if (Math.abs(diffX) > Math.abs(diffY)) {
        direction = diffX > 0 ? 'right' : 'left'
    } else {
        direction = diffY > 0 ? 'down' : 'up'
    }

    emit('swipeEnd', {
        direction,
        distanceX: diffX,
        distanceY: diffY
    })
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    emit('update:open', true)

    if (el.value) {
        height.value = el.value.offsetHeight
        resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                height.value = (entry.target as HTMLElement).offsetHeight
            }
        })
        resizeObserver.observe(el.value)
    }

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
    window.removeEventListener('keydown', handleKeyDown)
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
    if (timer) clearTimeout(timer)
    if (progressInterval) clearInterval(progressInterval)
})
</script>

<template>
    <div ref="el" class="toast-root" :class="[
        `toast-${normalizedSeverity}`,
        `toast--${orientation}`,
        props.class,
        { 'toast-prevent-close': preventClose }
    ]" :role="type === 'foreground' ? 'alert' : 'status'" :aria-live="type === 'foreground' ? 'assertive' : 'polite'"
        @mouseenter="pauseTimer" @mouseleave="resumeTimer">
        <div class="toast-content" :class="{ 'flex-col': orientation === 'vertical' }">
            <div class="flex items-start gap-4">
                <slot name="leading" :ui="{ severity: normalizedSeverity }">
                    <div v-if="avatar" class="toast-avatar-wrapper shrink-0">
                        <Avatar :src="avatar" size="sm" rounded="full" loading="eager" />
                    </div>
                    <div v-else-if="severityIcon" class="toast-icon-wrapper">
                        <Icon :name="severityIcon" size="sm" />
                    </div>
                </slot>

                <div class="toast-body">
                    <slot name="title">
                        <h4 v-if="title" class="toast-title">{{ title }}</h4>
                    </slot>
                    <slot name="description">
                        <p v-if="description" class="toast-description">{{ description }}</p>
                    </slot>
                </div>
            </div>

            <slot name="actions">
                <!-- Single Action (Legacy Support) -->
                <div v-if="action && !actions" class="toast-actions"
                    :class="orientation === 'vertical' ? 'mt-4' : 'mt-2'">
                    <Button size="xs" variant="soft" :severity="actionSeverity" @click="action.onClick">
                        {{ action.label }}
                    </Button>
                </div>

                <!-- Multiple Actions -->
                <div v-if="actions && actions.length" class="toast-actions"
                    :class="orientation === 'vertical' ? 'mt-4 w-full flex-col' : 'mt-2'">
                    <Button v-for="(btn, index) in actions" :key="index" size="xs" :variant="btn.variant || 'soft'"
                        :severity="btn.color || actionSeverity" :icon="btn.icon"
                        :class="{ 'w-full': orientation === 'vertical' }" @click="btn.onClick">
                        {{ btn.label }}
                    </Button>
                </div>
            </slot>

            <slot name="close" :ui="{ closable, forceClose }">
                <button v-if="closable" class="toast-close" @click="forceClose" aria-label="Fermer">
                    <Icon name="heroicons:x-mark" size="xs" />
                </button>
            </slot>
        </div>


        <!-- Progress Bar -->
        <div v-if="shouldShowProgress" class="toast-progress">
            <div class="toast-progress-bar" :style="{ width: `${progress}%`, backgroundColor: progressColor }"></div>
        </div>
    </div>
</template>
