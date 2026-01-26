<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'
import { Avatar } from '../avatar/index'
import type { ToastProps, SwipeEvent, ToastId, SwipeDirection, ToastEmits } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
    severity: 'contrast',
    duration: 5000,
    progress: true,
    closable: true,
    preventClose: false,
    icon: true,
    orientation: 'horizontal',
    type: 'foreground',
    variant: 'soft',
    animation: 'slide',
    width: undefined
})

const emit = defineEmits<ToastEmits>()

const isVisible = ref(true)
const progress = ref(100)
const isPaused = ref(false)
const isShaking = ref(false)
const el = ref<HTMLElement | null>(null)
const height = ref(0)
let resizeObserver: ResizeObserver | null = null

const shake = () => {
    isShaking.value = true
    setTimeout(() => {
        isShaking.value = false
    }, 500)
}

let timer: ReturnType<typeof setTimeout> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null
let remainingTime = props.duration

// Swipe tracking
let touchStartX = 0
let touchStartY = 0
const dragX = ref(0)
const dragY = ref(0)
const isDragging = ref(false)

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

const normalizeColor = (value: string) => {
    const color = value.trim()
    const hexMatch = color.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
    if (!hexMatch) return color
    const hex = hexMatch[1].length === 3
        ? hexMatch[1].split('').map((ch) => ch + ch).join('')
        : hexMatch[1]
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgb(${r}, ${g}, ${b})`
}

const progressColor = computed(() => {
    if (typeof props.progress === 'object' && props.progress.color) {
        return normalizeColor(props.progress.color)
    }
    return undefined
})

const shouldShowProgress = computed(() => {
    return props.duration > 0 && props.progress !== false && !props.preventClose
})

const close = () => {
    if (props.preventClose) {
        shake()
        emit('close:prevent', props.id)
        return
    }
    isVisible.value = false
    emit('update:open', false)
    emit('close', props.id)
}

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

const handleTab = (e: KeyboardEvent) => {
    if (!props.preventClose) return

    // Focus Trap logic for persistent toasts
    const focusableElements = el.value?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusableElements || focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
        }
    } else { // Tab
        if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
        }
    }
}

const dragStyle = computed(() => {
    if (!isDragging.value) return {}
    return {
        transform: `translate(${dragX.value}px, ${dragY.value}px)`,
        transition: 'none',
        opacity: Math.max(0, 1 - (Math.abs(dragX.value) + Math.abs(dragY.value)) / 200)
    }
})

const onTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX
    touchStartY = event.touches[0].clientY
    isDragging.value = true
    emit('swipeStart', event)
}

const onTouchMove = (event: TouchEvent) => {
    if (!isDragging.value) return
    const currentX = event.touches[0].clientX
    const currentY = event.touches[0].clientY
    dragX.value = currentX - touchStartX
    dragY.value = currentY - touchStartY
    emit('swipeMove', event)
}

const onTouchEnd = (event: TouchEvent) => {
    isDragging.value = false
    const diffX = dragX.value
    const diffY = dragY.value

    const threshold = 50
    if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold) {
        let direction: SwipeDirection = 'right'
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

        forceClose()
    } else if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
        emit('swipeCancel', event)
    }

    dragX.value = 0
    dragY.value = 0
}

const loadingStates = ref<Record<number | string, boolean>>({})

const handleAction = async (action: any, index: number | string) => {
    if (loadingStates.value[index]) return

    const retryConfig = typeof action.retry === 'number'
        ? { attempts: action.retry, delay: 1000 }
        : { attempts: action.retry?.attempts || 0, delay: action.retry?.delay || 1000 }

    let currentAttempt = 0
    let success = false

    try {
        loadingStates.value[index] = true

        while (currentAttempt <= retryConfig.attempts) {
            try {
                const result = action.onClick()
                if (result instanceof Promise) {
                    await result
                }
                success = true
                break
            } catch (err) {
                currentAttempt++
                if (currentAttempt <= retryConfig.attempts) {
                    await new Promise(res => setTimeout(res, retryConfig.delay))
                } else {
                    throw err
                }
            }
        }

        if (success && action.autoClose !== false) {
            forceClose()
        }
    } catch (err) {
        console.error('[Toast Action Error]', err)
    } finally {
        loadingStates.value[index] = false
    }
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

defineExpose({
    height,
    shake
})
</script>

<template>
    <div ref="el" class="toast-root" :class="[
        `toast-${normalizedSeverity}`,
        `toast--${orientation}`,
        `toast-variant-${variant}`,
        `toast-animation-${animation}`,
        props.width ? `toast-width-${props.width}` : '',
        props['class'],
        { 'toast-prevent-close': preventClose, 'toast-shake': isShaking }
    ]" :style="dragStyle" :role="type === 'foreground' ? 'alert' : 'status'"
        :aria-live="type === 'foreground' ? 'assertive' : 'polite'" @mouseenter="pauseTimer" @mouseleave="resumeTimer"
        @focusin="pauseTimer" @focusout="resumeTimer" @keydown.tab="handleTab" @touchstart="onTouchStart"
        @touchmove="onTouchMove" @touchend="onTouchEnd">
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
                        <h4 v-if="title" class="toast-title text-sm font-bold">{{ title }}</h4>
                    </slot>
                    <slot name="description">
                        <p v-if="description" class="toast-description text-xs" v-html="description"></p>
                    </slot>

                    <!-- Inline Image -->
                    <div v-if="image"
                        class="toast-image-container mt-3 overflow-hidden rounded-lg border border-slate-200/50 dark:border-slate-800/50">
                        <img :src="image" loading="lazy" class="toast-image w-full h-auto object-cover max-h-48"
                            @load="height = el?.offsetHeight || 0" />
                    </div>

                    <!-- Link & Preview -->
                    <div v-if="link" class="toast-link-section mt-3 space-y-2">
                        <a v-if="link.label || !link.preview" :href="link.url" :target="link.target || '_blank'"
                            class="text-xs font-bold underline decoration-indigo-500/30 hover:decoration-indigo-500 transition-all flex items-center gap-1">
                            <Icon name="heroicons:link" size="xs" class="shrink-0" />
                            {{ link.label || link.url }}
                        </a>

                        <a v-if="link.preview" :href="link.url" :target="link.target || '_blank'"
                            class="toast-preview-card block bg-slate-50/50 dark:bg-slate-950/30 rounded-lg p-2 border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors group">
                            <div class="flex gap-3 items-center">
                                <img v-if="link.preview.image" :src="link.preview.image"
                                    class="w-12 h-12 rounded object-cover shrink-0" />
                                <div class="min-w-0 flex-1">
                                    <p v-if="link.preview.title"
                                        class="text-xs font-bold line-clamp-1 group-hover:text-indigo-500 transition-colors">
                                        {{ link.preview.title }}</p>
                                    <p v-if="link.preview.description"
                                        class="text-[10px] text-slate-500 line-clamp-2 leading-tight">{{
                                            link.preview.description }}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <slot name="actions">
                <div v-if="action && !actions" class="toast-actions"
                    :class="orientation === 'vertical' ? 'mt-4' : 'mt-2'">
                    <Button size="xs" variant="soft" :severity="actionSeverity"
                        :loading="loadingStates['single'] || action.loading" :aria-label="action.label"
                        @click="handleAction(action, 'single')">
                        {{ action.label }}
                    </Button>
                </div>

                <div v-if="actions && actions.length" class="toast-actions"
                    :class="orientation === 'vertical' ? 'mt-4 w-full flex-col' : 'mt-2'">
                    <Button v-for="(btn, index) in actions" :key="index" size="xs" :variant="btn.variant || 'soft'"
                        :severity="btn.color || actionSeverity" :icon="btn.icon"
                        :loading="loadingStates[index] || btn.loading" :aria-label="btn.label"
                        :class="{ 'w-full': orientation === 'vertical' }" @click="handleAction(btn, index)">
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

        <div v-if="shouldShowProgress" class="toast-progress">
            <div class="toast-progress-bar" :style="{ width: `${progress}%`, backgroundColor: progressColor }"></div>
        </div>
    </div>
</template>
