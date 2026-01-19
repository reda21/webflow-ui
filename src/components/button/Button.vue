<template>
    <component :is="componentTag" :class="buttonClasses" :disabled="isDisabled" :href="as === 'a' ? href : undefined"
        :type="as === 'button' ? type : as === 'input' ? 'button' : undefined"
        :value="as === 'input' ? value : undefined" :aria-expanded="ariaExpanded || undefined"
        :aria-pressed="ariaPressed || undefined" :aria-describedby="ariaDescribedby || undefined"
        :aria-controls="ariaControls || undefined" :aria-haspopup="ariaHaspopup || undefined"
        :aria-current="ariaCurrent || undefined" :aria-live="ariaLive || undefined"
        :aria-atomic="ariaAtomic || undefined" :aria-relevant="ariaRelevant || undefined"
        :aria-disabled="isDisabled || undefined" :aria-hidden="ariaHidden || undefined"
        :aria-labelledby="ariaLabelledby || undefined" :aria-label="ariaLabel || undefined" v-bind="$attrs"
        @click="handleClick">
        <!-- Loading Spinner -->
        <svg v-if="loading" class="animate-spin shrink-0" :class="spinnerSizeClass" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>

        <!-- Icon (when not loading) -->
        <span v-else-if="$slots.icon" class="shrink-0 inline-flex" aria-hidden="true">
            <slot name="icon" />
        </span>

        <!-- Label -->
        <span v-if="$slots.default" :class="labelClass">
            <slot />
        </span>
    </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
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

const props = withDefaults(defineProps<ButtonProps>(), {
    variant: 'soft',
    severity: 'primary',
    size: 'md',
    rounded: 'md',
    shadow: 'none',
    ring: 'none',
    as: 'button',
    type: 'button',
    loading: false,
    disabled: false,
    iconPos: 'left',
})

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const slots = useSlots()

const isDisabled = computed(() => props.disabled || props.loading)
const hasChildren = computed(() => !!slots.default)

const componentTag = computed(() => {
    if (props.as === 'a') return 'a'
    if (props.as === 'input') return 'input'
    return 'button'
})

const getSeverityClasses = computed(() => {
    const { severity, variant } = props
    const classes = []

    if (severity !== 'primary') classes.push(`btn-${severity}`)

    if (variant === 'outlined') classes.push('btn-outlined')
    else if (variant === 'subtle') classes.push('btn-subtle')
    else if (variant === 'ghost') classes.push('btn-ghost')
    else if (variant === 'link') classes.push('btn-link')
    else if (variant !== 'soft') classes.push(`btn-${variant}`)

    return classes.join(' ')
})

// Size classes
const sizeClasses = computed(() => {
    const { size } = props
    const classes = size !== 'md' ? [`btn-${size}`] : []

    if (!hasChildren.value) {
        classes.push('btn-icon-only')
    }

    return classes.join(' ')
})

// Rounded classes
const roundedClasses = computed(() => props.rounded !== 'md' ? `round-${props.rounded}` : '')

// Shadow classes
const shadowClasses = computed(() => {
    if (props.shadow === 'none') return 'shadow-none'
    return `shadow-${props.shadow}`
})

// Ring classes
const ringClasses = computed(() => {
    if (props.ring === 'none') return ''
    const ringColorMap: Record<ButtonSeverity, string> = {
        primary: 'ring-primary',
        secondary: 'ring-secondary',
        success: 'ring-success',
        info: 'ring-info',
        warn: 'ring-warn',
        help: 'ring-help',
        danger: 'ring-danger',
        contrast: 'ring-contrast',
    }
    return `ring-${props.ring} ${ringColorMap[props.severity]}`
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

// Spinner size class
const spinnerSizeClass = computed(() => {
    const spinnerSizes: Record<ButtonSize, string> = {
        xs: 'h-3 w-3',
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
        xl: 'h-6 w-6',
        '2xl': 'h-7 w-7',
    }
    return spinnerSizes[props.size]
})

// Label class for text alignment in vertical layout
const labelClass = computed(() => {
    const isVertical = props.iconPos === 'top' || props.iconPos === 'bottom'
    return isVertical ? 'text-center whitespace-nowrap' : 'whitespace-nowrap'
})

// Combined button classes
const buttonClasses = computed(() => {
    return [
        'btn', // Base class from button.css
        getSeverityClasses.value,
        sizeClasses.value,
        roundedClasses.value,
        shadowClasses.value,
        ringClasses.value,
        flexDirectionClass.value,
    ].filter(Boolean).join(' ')
})

const handleClick = (event: MouseEvent) => {
    if (!isDisabled.value) {
        emit('click', event)
    }
}
</script>
