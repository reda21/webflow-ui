import { ref, computed, onMounted, onUnmounted, watch, type Ref } from 'vue'

export interface UseButtonProps {
    loading?: boolean
    loadingAuto?: boolean
    disabled?: boolean
    countdown?: number
    doubleClickProtection?: boolean | number
    longPressDelay?: number
    shortcut?: string
    copyText?: string
    onClick?: (event: MouseEvent) => any
}

export interface UseButtonEmits {
    (e: 'click', event: MouseEvent): void
    (e: 'longPress', event: MouseEvent | TouchEvent): void
    (e: 'copy', text: string): void
}

export function useButton(props: UseButtonProps, emit: UseButtonEmits) {
    const internalLoading = ref(false)
    const countdownValue = ref(props.countdown && props.countdown > 0 ? props.countdown : 0)
    const isDoubleClickBlocked = ref(false)
    const isLongPressing = ref(false)
    const hasCopied = ref(false)
    
    let countdownInterval: ReturnType<typeof setInterval> | null = null
    let doubleClickTimeout: ReturnType<typeof setTimeout> | null = null
    let longPressTimer: ReturnType<typeof setTimeout> | null = null

    const isCurrentlyLoading = computed(() => props.loading || internalLoading.value)
    const isDisabled = computed(() => 
        props.disabled || 
        props.loading || 
        internalLoading.value || 
        countdownValue.value > 0 || 
        isDoubleClickBlocked.value
    )

    // Countdown
    const startCountdown = () => {
        if (props.countdown && props.countdown > 0) {
            countdownValue.value = props.countdown
            countdownInterval = setInterval(() => {
                countdownValue.value--
                if (countdownValue.value <= 0 && countdownInterval) {
                    clearInterval(countdownInterval)
                    countdownInterval = null
                }
            }, 1000)
        }
    }

    watch(() => props.countdown, (newVal) => {
        if (newVal && newVal > 0) {
            startCountdown()
        }
    })

    // Keyboard shortcut
    const handleKeyboard = (event: KeyboardEvent) => {
        if (!props.shortcut) return

        const keys = props.shortcut.toLowerCase().split('+')
        const key = keys[keys.length - 1]
        const needCtrl = keys.includes('ctrl') || keys.includes('control')
        const needAlt = keys.includes('alt')
        const needShift = keys.includes('shift')
        const needMeta = keys.includes('meta') || keys.includes('cmd')

        if (
            event.key.toLowerCase() === key &&
            event.ctrlKey === needCtrl &&
            event.altKey === needAlt &&
            event.shiftKey === needShift &&
            event.metaKey === needMeta
        ) {
            event.preventDefault()
            const fakeEvent = new MouseEvent('click')
            handleClick(fakeEvent)
        }
    }

    const handleClick = async (event: MouseEvent) => {
        if (isDisabled.value) return

        // Haptic feedback
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(10)
        }

        // Double-click protection
        if (props.doubleClickProtection) {
            const delay = typeof props.doubleClickProtection === 'number' ? props.doubleClickProtection : 1000
            isDoubleClickBlocked.value = true
            doubleClickTimeout = setTimeout(() => {
                isDoubleClickBlocked.value = false
            }, delay)
        }

        // Copy to clipboard
        if (props.copyText) {
            try {
                await navigator.clipboard.writeText(props.copyText)
                hasCopied.value = true
                emit('copy', props.copyText)
                setTimeout(() => {
                    hasCopied.value = false
                }, 2000)
            } catch (err) {
                console.error('Failed to copy opt:', err)
            }
        }

        if (props.loadingAuto && props.onClick) {
            const result = props.onClick(event)
            if (result instanceof Promise) {
                internalLoading.value = true
                try {
                    await result
                } finally {
                    internalLoading.value = false
                }
            }
        } else {
            emit('click', event)
        }
    }

    // Long press
    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
        if (!props.longPressDelay || isDisabled.value) return

        isLongPressing.value = false
        longPressTimer = setTimeout(() => {
            isLongPressing.value = true
            emit('longPress', event)
        }, props.longPressDelay)
    }

    const handleMouseUp = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer)
            longPressTimer = null
        }
    }

    onMounted(() => {
        if (props.countdown && props.countdown > 0) {
            startCountdown()
        }
        if (props.shortcut) {
            window.addEventListener('keydown', handleKeyboard)
        }
    })

    onUnmounted(() => {
        if (countdownInterval) clearInterval(countdownInterval)
        if (doubleClickTimeout) clearTimeout(doubleClickTimeout)
        if (longPressTimer) clearTimeout(longPressTimer)
        if (props.shortcut) window.removeEventListener('keydown', handleKeyboard)
    })

    return {
        internalLoading,
        countdownValue,
        isDoubleClickBlocked,
        isLongPressing,
        hasCopied,
        isCurrentlyLoading,
        isDisabled,
        handleClick,
        handleMouseDown,
        handleMouseUp,
        handleMouseLeave: handleMouseUp
    }
}
