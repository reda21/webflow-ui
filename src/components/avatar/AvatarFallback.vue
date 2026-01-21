<script setup lang="ts">
import { inject, computed } from 'vue'

const context = inject<{ imageLoaded: { value: boolean }, imageSkipped: { value: boolean } }>('avatarContext')

const shouldShow = computed(() => {
    if (!context) return true
    return context.imageSkipped.value || !context.imageLoaded.value
})
</script>

<template>
    <span v-if="shouldShow" class="avatar-fallback">
        <slot />
    </span>
</template>

<style scoped>
@reference "../../theme.css";

.avatar-fallback {
    @apply flex h-full w-full items-center justify-center font-medium uppercase text-slate-600 dark:text-slate-300;
}
</style>
