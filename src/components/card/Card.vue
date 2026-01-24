<script setup lang="ts">
import { computed, ref, onMounted, defineAsyncComponent } from 'vue'
import type { CardProps } from './types'
import './card.css'

// Code splitting pour les fonctionnalités avancées
const CardCarousel = defineAsyncComponent(() => import('./CardCarousel.vue'))
const CardSkeleton = defineAsyncComponent(() => import('./CardSkeleton.vue'))

const props = withDefaults(defineProps<CardProps>(), {
    variant: 'default',
    shadow: 'md',
    padding: 'md',
    hover: false,
    scrollable: false,
    loading: false,
    interactive: false,
    expandable: false,
    selectable: false,
    draggable: false,
    swipeable: false,
    currency: 'USD',
    flipable: false,
    swipeToDismiss: false,
    pinchToZoom: false,
    doubleTapToLike: false,
    lazyLoad: false,
    highContrast: false,
    responsive: true
})

// État réactif
const isExpanded = ref(false)
const isFlipped = ref(false)
const isLiked = ref(false)
const touchStartX = ref(0)
const touchStartY = ref(0)
let lastTapTime = 0

const cardClasses = computed(() => {
    return [
        'card',
        `card--${props.variant}`,
        `card--shadow-${props.shadow}`,
        {
            'card--hover-scale': props.hover === true || props.hover === 'scale',
            'card--hover-raise': props.hover === 'raise',
            'card--hover-glow': props.hover === 'glow',
            'card--loading': props.loading,
            'card--interactive': props.interactive,
            'card--expandable': props.expandable,
            'card--selectable': props.selectable,
            'card--draggable': props.draggable,
            'card--swipeable': props.swipeable,
            'card--flipped': isFlipped.value,
            'card--high-contrast': props.highContrast
        }
    ]
})

const bodyClasses = computed(() => {
    return [
        'card-body',
        `card-body--p-${props.padding}`,
        {
            'card-body--scrollable': props.scrollable,
            'card-body--loading': props.loading
        },
        props.bodyClass
    ]
})

const formattedPrice = computed(() => {
    if (!props.price) return ''
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: props.currency
    }).format(props.price)
})

const toggleExpand = () => {
    if (props.expandable) {
        isExpanded.value = !isExpanded.value
    }
}

const toggleFlip = () => {
    if (props.flipable) {
        isFlipped.value = !isFlipped.value
    }
}

const toggleLike = () => {
    if (props.doubleTapToLike) {
        isLiked.value = !isLiked.value
        emit('like-toggle', isLiked.value)
    }
}

// Touch handlers
const handleTouchStart = (event: TouchEvent) => {
    if (!props.swipeable && !props.swipeToDismiss) return
    touchStartX.value = event.touches[0].clientX
    touchStartY.value = event.touches[0].clientY
}

const handleTouchMove = (event: TouchEvent) => {
    if (!props.swipeable && !props.swipeToDismiss) return
    const touchEndX = event.touches[0].clientX
    const touchEndY = event.touches[0].clientY
    const deltaX = touchEndX - touchStartX.value
    const deltaY = touchEndY - touchStartY.value
    if (props.swipeToDismiss && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
        emit('swipe-dismiss', deltaX > 0 ? 'right' : 'left')
    }
}

const handleTouchEnd = (event: TouchEvent) => {
    if (!props.doubleTapToLike) return
    const touchEndX = event.changedTouches[0].clientX
    const touchEndY = event.changedTouches[0].clientY
    const deltaX = touchEndX - touchStartX.value
    const deltaY = touchEndY - touchStartY.value
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        const now = Date.now()
        if (now - lastTapTime < 300) {
            toggleLike()
        }
        lastTapTime = now
    }
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (!props.selectable) return
    switch (event.key) {
        case 'Enter':
        case ' ':
            event.preventDefault()
            toggleExpand()
            break
    }
}

onMounted(() => {
    if (props.lazyLoad && props.image) {
        const img = new Image()
        img.src = props.image
    }
})

const emit = defineEmits<{
    'swipe-dismiss': [direction: 'left' | 'right']
    'like-toggle': [liked: boolean]
    'image-change': [index: number]
}>()
</script>

<template>
    <div :class="cardClasses" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
        @keydown="handleKeyDown" @dblclick="toggleLike" :aria-label="ariaLabel || title"
        :role="selectable ? 'button' : 'article'" :tabindex="selectable ? 0 : -1">

        <div :class="['card-inner', { 'card-inner--flipped': isFlipped && flipable }]"
            @click="flipable && toggleFlip()">
            <!-- Front Face -->
            <div class="card-face card-face--front">
                <div class="card-content-wrapper">
                    <!-- Loading Skeleton (Dynamic) -->
                    <CardSkeleton v-if="loading" :image="!!image" :images="!!images?.length" />

                    <!-- Standard Content -->
                    <template v-else>
                        <!-- Progress Bar -->
                        <div v-if="progress !== undefined" class="card-progress">
                            <div class="card-progress-bar"
                                :style="typeof progress === 'number' ? { width: `${progress}%` } : {}"></div>
                        </div>

                        <!-- Badge -->
                        <div v-if="badge" class="card-badge">{{ badge }}</div>

                        <!-- Rating -->
                        <div v-if="rating" class="card-rating">
                            <span v-for="i in 5" :key="i" class="card-rating-star"
                                :class="{ 'card-rating-star--filled': i <= rating }"> ★ </span>
                        </div>

                        <!-- Price -->
                        <div v-if="price" class="card-price">{{ formattedPrice }}</div>

                        <!-- Like Indicator -->
                        <div v-if="doubleTapToLike && isLiked" class="card-like-indicator">❤️</div>

                        <!-- Selectable Checkbox -->
                        <div v-if="selectable" class="card-checkbox" @click.stop>
                            <input type="checkbox" class="card-checkbox-input" />
                        </div>

                        <!-- Carousel (Dynamic) -->
                        <CardCarousel v-if="images && images.length > 0" :images="images" :image-alt="imageAlt"
                            :title="title" @change="emit('image-change', $event)" />

                        <!-- Single Image Header -->
                        <div v-else-if="image || $slots.image" :class="['card-image-wrapper', imageClass]">
                            <slot name="image">
                                <img :src="image" :alt="imageAlt" class="card-image" loading="lazy" decoding="async" />
                            </slot>
                        </div>

                        <!-- Header -->
                        <header v-if="title || subtitle || $slots.header || $slots.title || $slots.subtitle"
                            :class="['card-header', headerClass]">
                            <slot name="header">
                                <div v-if="title || $slots.title" class="card-title">
                                    <slot name="title">{{ title }}</slot>
                                </div>
                                <div v-if="subtitle || $slots.subtitle" class="card-subtitle">
                                    <slot name="subtitle">{{ subtitle }}</slot>
                                </div>
                            </slot>
                        </header>

                        <!-- Body -->
                        <div :class="bodyClasses" @click="toggleExpand">
                            <slot />
                            <div v-if="expandable" class="card-expand-indicator">
                                <span v-if="!isExpanded">▼</span>
                                <span v-else>▲</span>
                            </div>
                        </div>

                        <!-- Expanded Content -->
                        <div v-if="expandable && isExpanded" class="card-expanded-content">
                            <slot name="expanded" />
                        </div>

                        <!-- Footer -->
                        <footer v-if="$slots.footer" :class="['card-footer', footerClass]">
                            <slot name="footer" />
                        </footer>
                    </template>
                </div>
            </div>

            <!-- Back Face -->
            <div v-if="flipable" class="card-face card-face--back">
                <slot name="back" />
            </div>
        </div>
    </div>
</template>
