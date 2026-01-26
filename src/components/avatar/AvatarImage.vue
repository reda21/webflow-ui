<script setup lang="ts">
import { inject, ref, watch, computed, onUnmounted } from 'vue'
import type { AvatarContext } from './types'

const props = withDefaults(defineProps<{
    src?: string
    alt?: string
    loading?: 'eager' | 'lazy'
    srcset?: string
    sizes?: string
    crossorigin?: '' | 'anonymous' | 'use-credentials'
    referrerpolicy?: ReferrerPolicy
    objectFit?: 'cover' | 'contain' | 'fill' | 'none'
    // New features
    retryAttempts?: number
    retryDelay?: number
    placeholder?: string
}>(), {
    loading: 'lazy',
    objectFit: 'cover',
    retryAttempts: 3,
    retryDelay: 1000
})

const context = inject<AvatarContext>('avatarContext')
const error = ref(false)
const loaded = ref(false)
const retryCount = ref(0)
const currentSrc = ref(props.src)
let retryTimeout: ReturnType<typeof setTimeout> | null = null

const handleLoad = () => {
    loaded.value = true
    retryCount.value = 0
    if (context) context.imageLoaded.value = true
}

const handleError = () => {
    // Retry logic with exponential backoff
    const handleSrc = props.src
    if (retryCount.value < props.retryAttempts && handleSrc) {
        retryCount.value++
        const delay = props.retryDelay * Math.pow(2, retryCount.value - 1)

        retryTimeout = setTimeout(() => {
            // Force reload by appending timestamp
            currentSrc.value = `${handleSrc}${handleSrc.includes('?') ? '&' : '?'}_retry=${Date.now()}`
        }, delay)
    } else {
        error.value = true
        if (context) {
            context.imageLoaded.value = false
            context.imageError.value = true
        }
    }
}

// Cleanup on unmount
onUnmounted(() => {
    if (retryTimeout) clearTimeout(retryTimeout)
})

watch(() => props.src, (newSrc) => {
    if (!newSrc) {
        error.value = true
        if (context) {
            context.imageLoaded.value = false
            context.imageError.value = true
        }
    } else {
        error.value = false
        loaded.value = false
        retryCount.value = 0
        currentSrc.value = newSrc
        if (context) context.imageError.value = false
    }
}, { immediate: true })

const imageClasses = computed(() => {
    const fitClasses = {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
        none: 'object-none'
    }
    return [
        'avatar-img h-full w-full',
        fitClasses[props.objectFit],
        loaded.value ? 'avatar-img-loaded' : 'avatar-img-enter'
    ].join(' ')
})

const showPlaceholder = computed(() => {
    return props.placeholder && !loaded.value && !error.value
})
</script>

<template>
    <!-- Placeholder during load -->
    <img v-if="showPlaceholder" :src="placeholder" :alt="alt"
        class="avatar-img h-full w-full object-cover avatar-placeholder" />

    <!-- Main image -->
    <img v-if="currentSrc && !error" :src="currentSrc" :alt="alt" :loading="loading" :srcset="srcset" :sizes="sizes"
        :crossorigin="crossorigin" :referrerpolicy="referrerpolicy" :class="imageClasses" @load="handleLoad"
        @error="handleError" />
</template>

<style scoped>
@reference "../../theme.css";

.avatar-img {
    @apply aspect-square h-full w-full;
}

.avatar-img-enter {
    @apply opacity-0;
}

.avatar-img-loaded {
    @apply opacity-100 transition-opacity duration-300 ease-out;
}

.avatar-placeholder {
    @apply absolute inset-0 blur-sm scale-105;
}
</style>
