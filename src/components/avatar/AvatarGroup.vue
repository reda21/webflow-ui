<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { AvatarSize } from './types'

const props = withDefaults(defineProps<{
    size?: AvatarSize
    max?: number
    spacing?: 'tight' | 'normal' | 'loose'
}>(), {
    size: 'md',
    max: 5,
    spacing: 'normal'
})

const slots = useSlots()

const spacingClasses = computed(() => {
    const spacings = {
        tight: '-space-x-3',
        normal: '-space-x-2',
        loose: '-space-x-1'
    }
    return spacings[props.spacing]
})

const sizeClasses = computed(() => {
    const sizes: Record<AvatarSize, string> = {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-14 w-14 text-lg',
        '2xl': 'h-16 w-16 text-xl',
    }
    return sizes[props.size]
})

// Count total avatars from slot
const totalAvatars = computed(() => {
    if (!slots.default) return 0
    const children = slots.default()
    return children.length
})

const remainingCount = computed(() => {
    if (totalAvatars.value <= props.max) return 0
    return totalAvatars.value - props.max
})
</script>

<template>
    <div class="avatar-group" :class="spacingClasses">
        <!-- Remaining count indicator -->
        <span v-if="remainingCount > 0"
            class="avatar round-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium ring-2 ring-white dark:ring-slate-900"
            :class="sizeClasses">
            +{{ remainingCount }}
        </span>
        <slot />
    </div>
</template>

<style scoped>
@reference "../../style.css";

.avatar-group {
    @apply inline-flex flex-row-reverse items-center justify-end;
}

.avatar-group :deep(.avatar) {
    @apply ring-2 ring-white dark:ring-slate-900;
}
</style>
