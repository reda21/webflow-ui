<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    images: string[]
    imageAlt?: string
    title?: string
}>()

const emit = defineEmits<{
    'change': [index: number]
}>()

const currentImageIndex = ref(0)

const nextImage = (e?: Event) => {
    e?.stopPropagation()
    if (props.images && props.images.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length
        emit('change', currentImageIndex.value)
    }
}

const prevImage = (e?: Event) => {
    e?.stopPropagation()
    if (props.images && props.images.length > 0) {
        currentImageIndex.value = (currentImageIndex.value - 1 + props.images.length) % props.images.length
        emit('change', currentImageIndex.value)
    }
}

const setIndex = (index: number, e?: Event) => {
    e?.stopPropagation()
    currentImageIndex.value = index
    emit('change', index)
}
</script>

<template>
    <div class="card-carousel" @click.stop>
        <div class="card-carousel-container" :style="{ '--current-index': currentImageIndex }">
            <img v-for="(img, index) in images" :key="index" :src="img"
                :alt="`${imageAlt || title || 'Card image'} - Image ${index + 1}`" class="card-carousel-image"
                :class="{ 'card-carousel-image--active': index === currentImageIndex }" loading="lazy"
                decoding="async" />
        </div>
        <button v-if="images.length > 1" @click="prevImage" class="card-carousel-btn card-carousel-prev"
            aria-label="Image précédente">‹</button>
        <button v-if="images.length > 1" @click="nextImage" class="card-carousel-btn card-carousel-next"
            aria-label="Image suivante">›</button>
        <div v-if="images.length > 1" class="card-carousel-dots" role="tablist">
            <button v-for="(_, index) in images" :key="index" class="card-carousel-dot"
                :class="{ 'card-carousel-dot--active': index === currentImageIndex }" @click="setIndex(index, $event)"
                role="tab" :aria-label="`Aller à l'image ${index + 1}`"
                :aria-selected="index === currentImageIndex"></button>
        </div>
    </div>
</template>
