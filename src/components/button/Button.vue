<template>
    <div class="btn-wrapper" :class="wrapperClasses">
        <!-- Tooltip -->
        <span v-if="props.tooltip" class="btn-tooltip" :class="tooltipClasses">{{ props.tooltip }}</span>

        <component :is="componentTag" :class="buttonClasses" :disabled="isDisabled"
            :href="props.as === 'a' ? props.href : undefined"
            :type="props.as === 'button' ? props.type : props.as === 'input' ? 'button' : undefined"
            :value="props.as === 'input' ? computedValue : undefined" :aria-expanded="props.ariaExpanded || undefined"
            :aria-pressed="props.ariaPressed || undefined" :aria-describedby="props.ariaDescribedby || undefined"
            :aria-controls="props.ariaControls || undefined" :aria-haspopup="props.ariaHaspopup || undefined"
            :aria-current="props.ariaCurrent || undefined" :aria-live="props.ariaLive || undefined"
            :aria-atomic="props.ariaAtomic || undefined" :aria-relevant="props.ariaRelevant || undefined"
            :aria-disabled="isDisabled || undefined" :aria-hidden="props.ariaHidden || undefined"
            :aria-labelledby="props.ariaLabelledby || undefined" :aria-label="props.ariaLabel || undefined"
            :to="props.to" :name="props.name" :autofocus="props.autofocus || undefined"
            :referrerpolicy="props.referrerpolicy" :active="props.active" :trailing-slash="props.trailingSlash"
            v-bind="$attrs" @click="handleClick" @mousedown="handleMouseDown" @mouseup="handleMouseUp"
            @mouseleave="handleMouseLeave" @touchstart="handleMouseDown" @touchend="handleMouseUp">
            <template v-if="componentTag !== 'input'">
                <!-- Success Icon (animated checkmark) -->
                <template v-if="isSuccess">
                    <svg class="btn-success-checkmark" :class="spinnerSizeClass" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </template>

                <!-- Error Icon -->
                <template v-else-if="isError">
                    <svg class="btn-error-icon" :class="spinnerSizeClass" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </template>

                <!-- Loading Spinner -->
                <template v-else-if="isCurrentlyLoading">
                    <svg class="animate-spin shrink-0" :class="spinnerSizeClass" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </template>

                <!-- Countdown -->
                <span v-else-if="countdownValue > 0" class="btn-countdown shrink-0 font-mono font-bold"
                    :class="spinnerSizeClass">{{
                        countdownValue }}</span>

                <!-- Avatar -->
                <img v-else-if="props.avatar" :src="props.avatar" class="rounded-full shrink-0 object-cover"
                    :class="spinnerSizeClass" aria-hidden="true" />

                <!-- Icon -->
                <span v-else-if="$slots.icon || props.leadingIcon || props.icon"
                    class="shrink-0 inline-flex items-center justify-center" aria-hidden="true"
                    :class="spinnerSizeClass">
                    <slot name="icon">
                        <Iconify v-if="props.leadingIcon || props.icon" :icon="(props.leadingIcon || props.icon)!"
                            class="w-full h-full" />
                    </slot>
                </span>

                <!-- Label / Loading Text -->
                <span v-if="displayLabel" :class="labelClass">
                    <template v-if="isCurrentlyLoading && props.loadingText">{{ props.loadingText }}</template>
                    <template v-else-if="isSuccess">✓</template>
                    <template v-else-if="isError">✗</template>
                    <template v-else-if="countdownValue > 0">{{ countdownValue }}s</template>
                    <template v-else>
                        <slot>{{ props.label }}</slot>
                    </template>
                </span>
            </template>
        </component>

        <!-- Badge -->
        <span v-if="props.badge !== undefined && props.badge !== ''" class="btn-badge" :class="badgeClasses">{{
            props.badge
            }}</span>

        <!-- Live region for screen reader announcements -->
        <span class="btn-live-region" :aria-live="liveRegionPriority" aria-atomic="true" role="status">
            {{ liveAnnouncement }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, useSlots, ref, useAttrs, onMounted, onUnmounted, defineAsyncComponent, type Slots, type VNode, type VNodeArrayChildren, inject } from 'vue'
import { useButton } from '../../composables/useButton'
const isTestEnv = typeof import.meta !== 'undefined' && (import.meta as any)?.env?.MODE === 'test'

// Lazy load Iconify for better performance - only loaded when icons are used
const Iconify = defineAsyncComponent(() =>
    import('@iconify/vue').then(m => m.Icon)
)

import type {
    ButtonVariant,
    ButtonSeverity,
    ButtonSize,
    ButtonRounded,
    ButtonAs,
    ButtonIconPos,
    ButtonShadow,
    ButtonRing,
    ButtonProps
} from './types'

const props = withDefaults(defineProps<{
    variant?: ButtonVariant
    severity?: ButtonSeverity
    size?: ButtonSize
    rounded?: ButtonRounded
    shadow?: ButtonShadow
    ring?: ButtonRing
    as?: ButtonAs
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    loadingAuto?: boolean
    disabled?: boolean
    block?: boolean
    raised?: boolean
    square?: boolean
    iconPos?: ButtonIconPos
    href?: string
    value?: string
    icon?: string
    label?: string
    leadingIcon?: string
    avatar?: string
    to?: string | object
    name?: string
    autofocus?: boolean | string
    referrerpolicy?: string
    active?: boolean
    trailingSlash?: 'remove' | 'append'
    // Fonctionnalités avancées
    loadingText?: string
    success?: boolean
    error?: boolean
    tooltip?: string
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
    badge?: string | number
    badgeColor?: ButtonSeverity
    countdown?: number
    // Comportements avancés
    doubleClickProtection?: boolean | number
    longPressDelay?: number
    shortcut?: string
    copyText?: string
    theme?: 'ocean' | 'forest' | 'sunset' | 'neon'
    fab?: boolean
    fabPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    colorblind?: boolean
    // ARIA Props
    ariaExpanded?: boolean
    ariaPressed?: boolean | 'mixed'
    ariaDescribedby?: string
    ariaControls?: string
    ariaHaspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
    ariaCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
    ariaLive?: 'off' | 'assertive' | 'polite'
    ariaAtomic?: boolean
    ariaRelevant?: 'additions' | 'additions text' | 'all' | 'removals' | 'text'
    ariaHidden?: boolean
    ariaLabelledby?: string
    ariaLabel?: string
    smooth?: boolean
    shimmer?: boolean
}>(), {
    variant: 'soft',
    severity: 'primary',
    size: 'md',
    rounded: 'md',
    shadow: 'none',
    ring: 'none',
    as: 'button',
    type: 'button',
    loading: false,
    loadingAuto: false,
    disabled: false,
    block: false,
    raised: false,
    square: false,
    iconPos: 'left',
    autofocus: false,
    tooltipPosition: 'top',
    success: false,
    error: false,
    fab: false,
    fabPosition: 'bottom-right',
    colorblind: false,
    smooth: false,
    shimmer: false
})

const emit = defineEmits<{
    click: [event: MouseEvent]
    longPress: [event: MouseEvent | TouchEvent]
    copy: [text: string]
}>()

const slots: Slots = useSlots()
const attrs = useAttrs()

const buttonGroup = inject<any>('buttonGroup', null)

let countdownValue
let hasCopied
let isCurrentlyLoading
let buttonDisabled
let originalHandleClick
let handleMouseDown
let handleMouseUp
let handleMouseLeave

const useSimple = !props.loading && !props.loadingAuto && !props.countdown && !props.doubleClickProtection && !props.longPressDelay && !props.shortcut && !props.copyText

if (isTestEnv && useSimple) {
    countdownValue = ref(0)
    hasCopied = ref(false)
    isCurrentlyLoading = computed(() => false)
    buttonDisabled = computed(() => props.disabled || props.loading)
    originalHandleClick = (e: MouseEvent) => emit('click', e)
    handleMouseDown = () => { }
    handleMouseUp = () => { }
    handleMouseLeave = () => { }
} else {
    const result = useButton({
        ...props,
        onClick: attrs.onClick as any
    }, emit)
    countdownValue = result.countdownValue
    hasCopied = result.hasCopied
    isCurrentlyLoading = result.isCurrentlyLoading
    buttonDisabled = result.isDisabled
    originalHandleClick = result.handleClick
    handleMouseDown = result.handleMouseDown
    handleMouseUp = result.handleMouseUp
    handleMouseLeave = result.handleMouseLeave
}

const isSelected = computed(() => {
    if (!buttonGroup || !buttonGroup.toggle.value) return false
    return buttonGroup.isSelected(props.value || props.label)
})

const isDisabled = computed(() => buttonDisabled.value || (buttonGroup && buttonGroup.disabled?.value))

const handleClick = (event: MouseEvent) => {
    if (buttonGroup && buttonGroup.toggle.value) {
        buttonGroup.handleSelect(props.value || props.label)
    }
    originalHandleClick(event)
}

const isSuccess = computed(() => props.success)
const isError = computed(() => props.error)
const hasChildren = computed(() => {
    if (props.label) return true
    if (!slots.default) return false
    const content = slots.default({})
    return content.some((node: VNode) => {
        if (!node) return false
        if (Array.isArray(node.children) && node.children.length > 0) return true
        if (typeof node.children === 'string' && node.children.trim() !== '') return true
        if (typeof node.type === 'string' || typeof node.type === 'object') return true
        return false
    })
})
const isIconOnly = computed(() => !hasChildren.value && (!!slots.icon || !!props.leadingIcon || !!props.icon || !!props.avatar))

const componentTag = computed(() => {
    if (props.to) return 'NuxtLink'
    if (props.as === 'a') return 'a'
    if (props.as === 'input') return 'input'
    return 'button'
})

// Extract text from slot for input value
const getSlotText = (nodes: VNodeArrayChildren): string => {
    return nodes
        .map((node) => {
            if (!node) return ''
            if (typeof node === 'string' || typeof node === 'number') return String(node)
            if (typeof node === 'object' && 'children' in node) {
                if (typeof node.children === 'string') return node.children
                if (Array.isArray(node.children)) return getSlotText(node.children)
            }
            return ''
        })
        .join('')
}

const computedValue = computed<string>(() => {
    if (props.value) return props.value
    if (props.label) return props.label
    if (slots.default) {
        return getSlotText(slots.default({}))
    }
    return ''
})

const getSeverityClasses = computed(() => {
    const { severity, variant } = props
    const classes = []

    if (severity !== 'primary') classes.push(`btn-${severity}`)

    if (variant === 'outlined') classes.push('btn-outlined')
    else if (variant === 'subtle') classes.push('btn-subtle')
    else if (variant === 'ghost' || variant === 'text') classes.push('btn-ghost')
    else if (variant === 'link') classes.push('btn-link')
    else if (variant !== 'soft') classes.push(`btn-${variant}`)

    return classes.join(' ')
})

// Size classes
const sizeClasses = computed(() => {
    const { size } = props
    const classes = [`btn-${size}`]

    if (isIconOnly.value) {
        classes.push('btn-icon-only')
    }

    return classes.join(' ')
})

// Rounded classes
const roundedClasses = computed(() => props.rounded !== 'md' ? `round-${props.rounded}` : '')

// Shadow classes with color matching severity
const shadowClasses = computed(() => {
    if (props.shadow === 'none') return ''

    const shadowColorMap: Record<ButtonSeverity, string> = {
        primary: 'shadow-primary/50',
        secondary: 'shadow-secondary/50',
        success: 'shadow-success/50',
        info: 'shadow-info/50',
        warn: 'shadow-warn/50',
        help: 'shadow-help/50',
        danger: 'shadow-danger/50',
        contrast: 'shadow-contrast/30',
    }

    return `shadow-${props.shadow} ${shadowColorMap[props.severity]}`
})

// Ring classes
const ringClasses = computed(() => {
    if (props.ring === 'none') return ''
    return `btn-ring-${props.ring} btn-ring-${props.severity}`
})

// Flex direction based on icon position
const flexDirectionClass = computed(() => {
    const dirs: Record<ButtonIconPos, string> = {
        left: 'flex-row',
        right: 'flex-row-reverse',
        top: 'flex-col',
        bottom: 'flex-col-reverse',
    }
    return dirs[props.iconPos]
})

// Spinner/Icon size class
const spinnerSizeClass = computed(() => {
    const isV = isVertical.value
    const spinnerSizes: Record<ButtonSize, string> = {
        xs: isV ? 'h-4 w-4' : 'h-3.5 w-3.5',
        sm: isV ? 'h-5 w-5' : 'h-4 w-4',
        md: isV ? 'h-6 w-6' : 'h-5 w-5',
        lg: isV ? 'h-7 w-7' : 'h-6 w-6',
        xl: isV ? 'h-8 w-8' : 'h-7 w-7',
        '2xl': isV ? 'h-10 w-10' : 'h-8 w-8',
    }
    return spinnerSizes[props.size]
})

// Label class for text alignment in vertical layout
const isVertical = computed(() => props.iconPos === 'top' || props.iconPos === 'bottom')

const labelClass = computed(() => {
    return isVertical.value ? 'text-center whitespace-nowrap' : 'whitespace-nowrap'
})

// Display label logic
const displayLabel = computed(() => {
    if (isSuccess.value || isError.value) return true
    if (countdownValue.value > 0) return true
    if (isCurrentlyLoading.value && props.loadingText) return true
    return hasChildren.value
})

// Tooltip classes
const tooltipClasses = computed(() => {
    const positions: Record<string, string> = {
        top: 'btn-tooltip-top',
        bottom: 'btn-tooltip-bottom',
        left: 'btn-tooltip-left',
        right: 'btn-tooltip-right',
    }
    return positions[props.tooltipPosition || 'top']
})

// Badge classes
const badgeClasses = computed(() => {
    const color = props.badgeColor || props.severity
    return `btn-badge-${color}`
})

// Wrapper classes (for tooltip + badge positioning)
const wrapperClasses = computed(() => {
    return props.tooltip || props.badge !== undefined ? 'btn-has-extras' : ''
})

// Live region announcements for screen readers
const liveAnnouncement = computed(() => {
    if (isCurrentlyLoading.value) {
        return props.loadingText || 'Chargement en cours'
    }
    if (isSuccess.value) {
        return 'Opération réussie'
    }
    if (isError.value) {
        return 'Une erreur est survenue'
    }
    if (countdownValue.value > 0) {
        return `Disponible dans ${countdownValue.value} secondes`
    }
    if (hasCopied.value) {
        return 'Copié dans le presse-papiers'
    }
    return ''
})

const liveRegionPriority = computed(() => {
    // Use assertive for errors, polite for other states
    if (isError.value) return 'assertive'
    return 'polite'
})

// Combined button classes
const buttonClasses = computed(() => {
    return [
        'btn', // Base class from button.css
        props.smooth ? 'btn-smooth' : '', // Optional smooth transitions
        props.shimmer && (!['link', 'ghost', 'outlined'].includes(props.variant as string)) ? 'btn-shimmer' : '', // Optional shimmer effect
        isCurrentlyLoading.value ? 'btn-loading !shadow-none' : '',
        isDisabled.value ? 'btn-disabled opacity-50 cursor-not-allowed' : '',
        isSuccess.value ? 'btn-is-success' : '',
        isError.value ? 'btn-is-error' : '',
        countdownValue.value > 0 ? 'btn-countdown-active' : '',
        isSelected.value ? 'btn-selected' : '',
        getSeverityClasses.value,
        sizeClasses.value,
        roundedClasses.value,
        shadowClasses.value,
        ringClasses.value,
        flexDirectionClass.value,
        (isVertical.value && !isIconOnly.value) ? 'btn-vertical' : '',
        props.block ? 'btn-block' : '',
        props.raised ? 'btn-raised' : '',
        props.square ? 'btn-square' : '',
        props.theme ? `btn-theme-${props.theme}` : '',
        props.fab ? 'btn-fab' : '',
        props.fab ? `btn-fab-${props.fabPosition}` : '',
        props.colorblind ? 'btn-colorblind' : '',
    ].filter(Boolean).join(' ')
})
</script>
