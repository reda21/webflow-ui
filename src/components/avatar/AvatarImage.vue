<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'

const props = defineProps<{
    src?: string
    alt?: string
}>()

const context = inject<{ imageLoaded: { value: boolean }, imageSkipped: { value: boolean } }>('avatarContext')
const error = ref(false)

const handleLoad = () => {
    if (context) context.imageLoaded.value = true
}

const handleError = () => {
    error.value = true
    if (context) {
        context.imageLoaded.value = false
        context.imageSkipped.value = true
    }
}

watch(() => props.src, (newSrc) => {
    if (!newSrc) {
        handleError()
    } else {
        error.value = false
        if (context) context.imageSkipped.value = false
    }
}, { immediate: true })
</script>

<template>
    <img v-if="src && !error" :src="src" :alt="alt" class="avatar-img h-full w-full object-cover" @load="handleLoad"
        @error="handleError" />
</template>

<style scoped>
@reference "../../style.css";

.avatar-img {
    @apply aspect-square h-full w-full;
}
</style>
