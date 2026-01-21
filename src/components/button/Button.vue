<template>
    <component :is="componentTag" :class="buttonClasses" :disabled="isDisabled"
        :href="props.as === 'a' ? props.href : undefined"
        :type="props.as === 'button' ? props.type : props.as === 'input' ? 'button' : undefined"
        :value="props.as === 'input' ? computedValue : undefined" :aria-expanded="props.ariaExpanded || undefined"
        :aria-pressed="props.ariaPressed || undefined" :aria-describedby="props.ariaDescribedby || undefined"
        :aria-controls="props.ariaControls || undefined" :aria-haspopup="props.ariaHaspopup || undefined"
        :aria-current="props.ariaCurrent || undefined" :aria-live="props.ariaLive || undefined"
        :aria-atomic="props.ariaAtomic || undefined" :aria-relevant="props.ariaRelevant || undefined"
        :aria-disabled="isDisabled || undefined" :aria-hidden="props.ariaHidden || undefined"
        :aria-labelledby="props.ariaLabelledby || undefined" :aria-label="props.ariaLabel || undefined" :to="props.to"
        :name="props.name" :autofocus="props.autofocus || undefined" :referrerpolicy="props.referrerpolicy"
        :active="props.active" :trailing-slash="props.trailingSlash" v-bind="$attrs" @click="handleClick">
        <template v-if="componentTag !== 'input'">
            <!-- Loading Spinner -->
            <svg v-if="isCurrentlyLoading" class="animate-spin shrink-0" :class="spinnerSizeClass"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>

            <!-- Avatar -->
            <img v-else-if="props.avatar" :src="props.avatar" class="rounded-full shrink-0 object-cover"
                :class="spinnerSizeClass" aria-hidden="true" />

            <!-- Icon -->
            <span v-else-if="$slots.icon || props.leadingIcon || props.icon" class="shrink-0 inline-flex"
                aria-hidden="true">
                <slot name="icon">
                    <Iconify v-if="props.leadingIcon || props.icon" :icon="(props.leadingIcon || props.icon)!"
                        :class="spinnerSizeClass" />
                </slot>
            </span>

            <!-- Label -->
            <span v-if="$slots.default || props.label" :class="labelClass">
                <slot>{{ props.label }}</slot>
            </span>
        </template>
    </component>
</template>

<script setup lang="ts">
import { computed, useSlots, ref, useAttrs, type Slots, type VNode, type VNodeArrayChildren } from 'vue'
import { Icon as Iconify } from '@iconify/vue'
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
})

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const slots: Slots = useSlots()
const attrs = useAttrs()
const internalLoading = ref(false)

const isDisabled = computed(() => props.disabled || props.loading || internalLoading.value)
const isCurrentlyLoading = computed(() => props.loading || internalLoading.value)
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
    else if (variant === 'ghost') classes.push('btn-ghost')
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
        xs: isV ? 'h-3.5 w-3.5' : 'h-3 w-3',
        sm: isV ? 'h-4 w-4' : 'h-3.5 w-3.5',
        md: isV ? 'h-5 w-5' : 'h-4 w-4',
        lg: isV ? 'h-6 w-6' : 'h-5 w-5',
        xl: isV ? 'h-7 w-7' : 'h-6 w-6',
        '2xl': isV ? 'h-8 w-8' : 'h-7 w-7',
    }
    return spinnerSizes[props.size]
})

// Label class for text alignment in vertical layout
const isVertical = computed(() => props.iconPos === 'top' || props.iconPos === 'bottom')

const labelClass = computed(() => {
    return isVertical.value ? 'text-center whitespace-nowrap' : 'whitespace-nowrap'
})

// Combined button classes
const buttonClasses = computed(() => {
    return [
        'btn', // Base class from button.css
        isCurrentlyLoading.value ? 'btn-loading shadow-none!' : '',
        isDisabled.value ? 'btn-disabled opacity-50 cursor-not-allowed' : '',
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
    ].filter(Boolean).join(' ')
})

const handleClick = async (event: MouseEvent) => {
    if (isDisabled.value) return

    const clickHandler = attrs.onClick as ((event: MouseEvent) => any) | undefined

    if (props.loadingAuto && clickHandler) {
        const result = clickHandler(event)
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
</script>
