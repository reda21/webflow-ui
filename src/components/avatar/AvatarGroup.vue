<script setup lang="ts">
import { computed, useSlots, ref } from 'vue'
import type { AvatarSize } from './types'
import './avatar.css'

const props = withDefaults(defineProps<{
    size?: AvatarSize
    max?: number
    spacing?: 'tight' | 'normal' | 'loose'
    reverse?: boolean
    animated?: boolean
    overflowPlacement?: 'start' | 'end'
    orientation?: 'horizontal' | 'vertical'
    ring?: boolean | { color?: string }
    expandable?: boolean
    tooltipNames?: string[]
}>(), {
    size: 'md',
    max: 5,
    spacing: 'normal',
    reverse: false,
    animated: false,
    overflowPlacement: 'start',
    orientation: 'horizontal',
    expandable: false
})

// Slots
const slots = useSlots()
defineSlots<{
    default(): any
    overflow?(props: { count: number }): any
}>()

// State
const isExpanded = ref(false)
const isHoveringOverflow = ref(false)

const groupClasses = computed(() => {
    const classes = [
        'avatar-group',
        `avatar-group-${props.orientation}`,
        `avatar-group-${props.spacing}`,
    ]

    if (props.animated) {
        classes.push('avatar-group-animated')
    }

    if (props.reverse) {
        classes.push('avatar-group-reverse')
    }

    if (props.expandable && isExpanded.value) {
        classes.push('avatar-group-expanded')
    }

    return classes.join(' ')
})

const sizeClasses = computed(() => {
    const sizes: Record<AvatarSize, string> = {
        '3xs': 'h-4 w-4 text-[8px]',
        '2xs': 'h-5 w-5 text-[9px]',
        'xs': 'h-6 w-6 text-[10px]',
        'sm': 'h-8 w-8 text-xs',
        'md': 'h-10 w-10 text-sm',
        'lg': 'h-12 w-12 text-base',
        'xl': 'h-14 w-14 text-lg',
        '2xl': 'h-16 w-16 text-xl',
        '3xl': 'h-20 w-20 text-2xl',
    }
    return sizes[props.size]
})

// Ring styles
const ringStyle = computed(() => {
    if (!props.ring) return {}
    if (typeof props.ring === 'object' && props.ring.color) {
        return { '--avatar-group-ring-color': props.ring.color }
    }
    return {}
})

// Count total avatars from slot
const totalAvatars = computed(() => {
    if (!slots.default) return 0
    const children = slots.default({})
    return children.length
})

const remainingCount = computed(() => {
    if (isExpanded.value) return 0
    if (totalAvatars.value <= props.max) return 0
    return totalAvatars.value - props.max
})

// Tooltip content for overflow
const tooltipContent = computed(() => {
    if (!props.tooltipNames || props.tooltipNames.length === 0) return ''
    const hiddenNames = props.tooltipNames.slice(props.max)
    return hiddenNames.join(', ')
})

// Handlers
const handleOverflowClick = () => {
    if (props.expandable) {
        isExpanded.value = !isExpanded.value
    }
}

const handleOverflowHover = (hovering: boolean) => {
    isHoveringOverflow.value = hovering
}
</script>

<template>
    <div :class="groupClasses" :style="ringStyle">
        <!-- Overflow indicator at start -->
        <template v-if="remainingCount > 0 && overflowPlacement === 'start'">
            <!-- Custom overflow slot -->
            <slot v-if="$slots.overflow" name="overflow" :count="remainingCount" />

            <!-- Default overflow indicator -->
            <div v-else class="avatar-overflow-wrapper relative" @mouseenter="handleOverflowHover(true)"
                @mouseleave="handleOverflowHover(false)" @click="handleOverflowClick">
                <span class="avatar avatar-overflow round-full ring-2"
                    :class="[sizeClasses, { 'cursor-pointer': expandable }]">
                    +{{ remainingCount }}
                </span>

                <!-- Tooltip -->
                <div v-if="tooltipContent && isHoveringOverflow" class="avatar-overflow-tooltip">
                    {{ tooltipContent }}
                </div>
            </div>
        </template>

        <slot />

        <!-- Overflow indicator at end -->
        <template v-if="remainingCount > 0 && overflowPlacement === 'end'">
            <!-- Custom overflow slot -->
            <slot v-if="$slots.overflow" name="overflow" :count="remainingCount" />

            <!-- Default overflow indicator -->
            <div v-else class="avatar-overflow-wrapper relative" @mouseenter="handleOverflowHover(true)"
                @mouseleave="handleOverflowHover(false)" @click="handleOverflowClick">
                <span class="avatar avatar-overflow round-full ring-2"
                    :class="[sizeClasses, { 'cursor-pointer': expandable }]">
                    +{{ remainingCount }}
                </span>

                <!-- Tooltip -->
                <div v-if="tooltipContent && isHoveringOverflow" class="avatar-overflow-tooltip">
                    {{ tooltipContent }}
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
@reference "../../theme.css";

.avatar-group-reverse {
    @apply flex-row;
}

.avatar-group-reverse.avatar-group-vertical {
    @apply flex-col;
}

.avatar-group-expanded {
    @apply gap-2;
}

.avatar-group-expanded.avatar-group-horizontal {
    @apply space-x-0;
}

.avatar-group-expanded.avatar-group-vertical {
    @apply space-y-0;
}

/* Ring color override */
.avatar-group :deep(.avatar) {
    --tw-ring-color: var(--avatar-group-ring-color, theme(colors.white));
}

.dark .avatar-group :deep(.avatar) {
    --tw-ring-color: var(--avatar-group-ring-color, theme(colors.slate.900));
}

/* Overflow tooltip */
.avatar-overflow-tooltip {
    @apply absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1;
    @apply bg-slate-900 dark:bg-slate-700 text-white text-xs rounded;
    @apply whitespace-nowrap pointer-events-none z-20;
    @apply opacity-100 transition-opacity duration-200;
}

.avatar-overflow-tooltip::after {
    content: '';
    @apply absolute top-full left-1/2 -translate-x-1/2;
    border: 4px solid transparent;
    border-top-color: theme(colors.slate.900);
}

.dark .avatar-overflow-tooltip::after {
    border-top-color: theme(colors.slate.700);
}
</style>
