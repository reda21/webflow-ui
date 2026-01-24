<script setup lang="ts">
import { provide } from 'vue'

const props = withDefaults(defineProps<{
    stagger?: boolean | number
    animation?: 'pulse' | 'wave' | 'none'
}>(), {
    stagger: true,
    animation: 'pulse'
})

// Provide configuration to child skeletons if needed, 
// though currently we'll just handle basic stagger via CSS or prop passing if we want complex logic.
// For now let's use a simpler approach: just a wrapper that can be used to group them.
</script>

<template>
    <div class="skeleton-group" :class="{ 'skeleton-group--stagger': stagger }">
        <slot />
    </div>
</template>

<style scoped>
.skeleton-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.skeleton-group--stagger :deep(.skeleton):nth-child(1) {
    animation-delay: 0.1s;
}

.skeleton-group--stagger :deep(.skeleton):nth-child(2) {
    animation-delay: 0.2s;
}

.skeleton-group--stagger :deep(.skeleton):nth-child(3) {
    animation-delay: 0.3s;
}

.skeleton-group--stagger :deep(.skeleton):nth-child(4) {
    animation-delay: 0.4s;
}

.skeleton-group--stagger :deep(.skeleton):nth-child(5) {
    animation-delay: 0.5s;
}
</style>
