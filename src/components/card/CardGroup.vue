<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = withDefaults(defineProps<{
    items?: any[]
    columns?: number | string
    gap?: string
    virtual?: boolean
    threshold?: number
}>(), {
    columns: 3,
    gap: '1.5rem',
    virtual: false,
    threshold: 0.1
})

const containerRef = ref<HTMLElement | null>(null)
const visibleIndices = ref<Set<number>>(new Set())

let observer: IntersectionObserver | null = null

const setupObserver = () => {
    if (!props.virtual || !containerRef.value) return

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = parseInt((entry.target as HTMLElement).dataset.index || '-1')
            if (entry.isIntersecting) {
                visibleIndices.value.add(index)
            } else {
                // Keep some buffer or remove
                // visibleIndices.value.delete(index)
            }
        })
    }, {
        threshold: props.threshold,
        rootMargin: '200px' // Pre-render buffer
    })

    const children = containerRef.value.children
    for (let i = 0; i < children.length; i++) {
        if (children[i].classList.contains('card-group-item')) {
            observer.observe(children[i])
        }
    }
}

onMounted(() => {
    if (props.virtual) {
        setupObserver()
    }
})

onUnmounted(() => {
    observer?.disconnect()
})

const gridStyles = computed(() => ({
    display: 'grid',
    gridTemplateColumns: typeof props.columns === 'number'
        ? `repeat(${props.columns}, minmax(0, 1fr))`
        : props.columns,
    gap: props.gap
}))
</script>

<template>
    <div ref="containerRef" class="card-group" :style="gridStyles">
        <template v-if="items && items.length">
            <div v-for="(item, index) in items" :key="index" :data-index="index" class="card-group-item">
                <slot v-if="!virtual || visibleIndices.has(index)" :item="item" :index="index" />
                <div v-else class="card-group-placeholder" style="height: 300px;">
                    <!-- Minimal placeholder for virtualization -->
                </div>
            </div>
        </template>
        <slot v-else />
    </div>
</template>

<style scoped>
.card-group {
    width: 100%;
}

.card-group-item {
    min-height: 1px;
}
</style>
