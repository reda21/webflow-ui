<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import type { AvatarSize, AvatarRounded } from './types'

const props = withDefaults(defineProps<{
    size?: AvatarSize
    rounded?: AvatarRounded
    src?: string
    alt?: string
}>(), {
    size: 'md',
    rounded: 'full'
})

const imageSkipped = ref(false)
const imageLoaded = ref(false)
const imageError = ref(false)

provide('avatarContext', {
    size: props.size,
    rounded: props.rounded,
    imageLoaded,
    imageSkipped,
})

const avatarClasses = computed(() => {
    return [
        'avatar',
        `avatar-${props.size}`,
        `round-${props.rounded}`
    ].join(' ')
})

const handleLoad = () => {
    imageLoaded.value = true
}

const handleError = () => {
    imageError.value = true
    imageLoaded.value = false
}

// Get initials from alt text
const initials = computed(() => {
    if (!props.alt) return ''
    return props.alt
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
})
</script>

<template>
    <div :class="avatarClasses">
        <!-- Simple mode: src prop provided -->
        <template v-if="src">
            <img v-if="!imageError" :src="src" :alt="alt" class="h-full w-full object-cover" @load="handleLoad"
                @error="handleError" />
            <span v-else
                class="flex h-full w-full items-center justify-center font-medium uppercase text-slate-600 dark:text-slate-300">
                {{ initials }}
            </span>
        </template>
        <!-- Composable mode: use slots -->
        <slot v-else />
    </div>
</template>

<style scoped>
@reference "../../style.css";

.avatar {
    @apply relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700;
}

.avatar-xs {
    @apply h-6 w-6 text-[10px];
}

.avatar-sm {
    @apply h-8 w-8 text-xs;
}

.avatar-md {
    @apply h-10 w-10 text-sm;
}

.avatar-lg {
    @apply h-12 w-12 text-base;
}

.avatar-xl {
    @apply h-14 w-14 text-lg;
}

.avatar-2xl {
    @apply h-16 w-16 text-xl;
}
</style>
