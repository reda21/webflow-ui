<script setup lang="ts">
defineProps<{
    image?: boolean
    images?: boolean
}>()
</script>

<template>
    <div class="card-skeleton">
        <div class="card-skeleton-image" v-if="image || images"></div>
        <div class="card-skeleton-header">
            <div class="card-skeleton-title"></div>
            <div class="card-skeleton-subtitle"></div>
        </div>
        <div class="card-skeleton-body">
            <div class="card-skeleton-line"></div>
            <div class="card-skeleton-line"></div>
            <div class="card-skeleton-line"></div>
        </div>
    </div>
</template>
