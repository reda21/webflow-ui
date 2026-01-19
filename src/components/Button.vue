<template>
    <component :is="componentTag" :class="buttonClasses" :disabled="isDisabled" :href="as === 'a' ? href : undefined"
        :type="as === 'button' ? type : as === 'input' ? 'button' : undefined"
        :value="as === 'input' ? value : undefined" :aria-expanded="ariaExpanded" :aria-pressed="ariaPressed"
        :aria-describedby="ariaDescribedby" :aria-controls="ariaControls" :aria-haspopup="ariaHaspopup"
        :aria-current="ariaCurrent" :aria-live="ariaLive" :aria-atomic="ariaAtomic" :aria-relevant="ariaRelevant"
        :aria-disabled="isDisabled" :aria-hidden="ariaHidden" :aria-labelledby="ariaLabelledby" :aria-label="ariaLabel"
        v-bind="$attrs" @click="handleClick">
        <!-- Loading Spinner -->
        <svg v-if="loading" class="animate-spin flex-shrink-0" :class="spinnerSizeClass"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>

        <!-- Icon (when not loading) -->
        <span v-else-if="$slots.icon" class="flex-shrink-0 inline-flex" aria-hidden="true">
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

export type ButtonVariant = 'soft' | 'outlined' | 'subtle' | 'ghost' | 'link'
export type ButtonSeverity =
    | 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
    | 'google' | 'facebook' | 'github' | 'twitter' | 'linkedin'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ButtonRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type ButtonAs = 'button' | 'a' | 'input'
export type ButtonIconPos = 'left' | 'right' | 'top' | 'bottom'
export type ButtonShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'
export type ButtonRing = 'none' | '1' | '2' | '4'

export interface ButtonProps {
    variant?: ButtonVariant
    severity?: ButtonSeverity
    size?: ButtonSize
    rounded?: ButtonRounded
    shadow?: ButtonShadow
    ring?: ButtonRing
    as?: ButtonAs
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
    iconPos?: ButtonIconPos
    href?: string
    value?: string
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
}

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

// Severity color mapping
const getSeverityClasses = computed(() => {
    const { severity, variant } = props

    // Management for Social buttons (custom overrides as they are not in the main theme)
    if (severity === 'google') return 'bg-[#DB4437] text-white hover:bg-[#C53929] border border-transparent'
    if (severity === 'facebook') return 'bg-[#1877F2] text-white hover:bg-[#1565D8] border border-transparent'
    if (severity === 'github') return 'bg-[#24292F] text-white hover:bg-[#1B1F23] border border-transparent'
    if (severity === 'twitter') return 'bg-[#1DA1F2] text-white hover:bg-[#1A91DA] border border-transparent'
    if (severity === 'linkedin') return 'bg-[#0077B5] text-white hover:bg-[#006097] border border-transparent'

    const classes = []

    // Add severity class (btn-primary, btn-success, etc.)
    classes.push(`btn-${severity}`)

    // Add variant class
    if (variant === 'soft') classes.push('btn-soft')
    else if (variant === 'outlined') classes.push('btn-outlined')
    else if (variant === 'subtle') classes.push('btn-subtle')
    else if (variant === 'ghost') classes.push('btn-ghost')
    else if (variant === 'link') classes.push('text-primary hover:underline border-transparent p-0 h-auto')

    return classes.join(' ')
})

// Size classes
const sizeClasses = computed(() => {
    const { size, iconPos } = props
    const isVertical = iconPos === 'top' || iconPos === 'bottom'

    if (!hasChildren.value) {
        // Icon-only sizes
        const iconOnlySizes: Record<ButtonSize, string> = {
            xs: 'w-7 h-7 p-0',
            sm: 'w-8 h-8 p-0',
            md: 'w-10 h-10 p-0',
            lg: 'w-12 h-12 p-0',
            xl: 'w-14 h-14 p-0',
            '2xl': 'w-16 h-16 p-0',
        }
        return iconOnlySizes[size]
    }

    const paddingSizes: Record<ButtonSize, string> = {
        xs: `px-2 py-1 text-xs font-medium ${isVertical ? 'h-auto py-2.5 min-h-[48px]' : 'h-7'} gap-1.5`,
        sm: `px-3 py-1.5 text-sm font-medium ${isVertical ? 'h-auto py-3 min-h-[56px]' : 'h-8'} gap-2`,
        md: `px-4 py-2 text-sm font-medium ${isVertical ? 'h-auto py-4 min-h-[68px]' : 'h-10'} gap-2.5`,
        lg: `px-6 py-3 text-base font-medium ${isVertical ? 'h-auto py-5 min-h-[80px]' : 'h-12'} gap-3`,
        xl: `px-8 py-4 text-lg font-medium ${isVertical ? 'h-auto py-6 min-h-[96px]' : 'h-14'} gap-3.5`,
        '2xl': `px-10 py-5 text-xl font-medium ${isVertical ? 'h-auto py-8 min-h-[112px]' : 'h-16'} gap-4`,
    }
    return paddingSizes[size]
})

// Rounded classes
const roundedClasses = computed(() => {
    const map: Record<ButtonRounded, string> = {
        none: 'rounded-none',
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
    }
    return map[props.rounded]
})

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
        google: 'ring-red-400',
        facebook: 'ring-blue-400',
        github: 'ring-gray-600',
        twitter: 'ring-sky-400',
        linkedin: 'ring-blue-600',
    }
    return `ring-${props.ring} ${ringColorMap[props.severity]}`
})

// Focus ring classes
const focusRingClasses = computed(() => {
    const focusRingMap: Record<ButtonSeverity, string> = {
        primary: 'focus:ring-primary',
        secondary: 'focus:ring-secondary',
        success: 'focus:ring-success',
        info: 'focus:ring-info',
        warn: 'focus:ring-warn',
        help: 'focus:ring-help',
        danger: 'focus:ring-danger',
        contrast: 'focus:ring-contrast',
        google: 'focus:ring-red-600',
        facebook: 'focus:ring-blue-600',
        github: 'focus:ring-black',
        twitter: 'focus:ring-sky-400',
        linkedin: 'focus:ring-blue-700',
    }
    return focusRingMap[props.severity]
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
        'btn', // Base class from style.css
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
