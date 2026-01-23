<script setup lang="ts">
import { inject, computed, ref, onMounted } from 'vue'
import type { AvatarContext } from './types'
import Icon from '../icon/Icon.vue'

const props = withDefaults(defineProps<{
    icon?: string
    color?: string
    bgColor?: string
    delayMs?: number
}>(), {
    delayMs: 0
})

const context = inject<AvatarContext>('avatarContext')
const showFallback = ref(props.delayMs === 0)

// Delay showing fallback to prevent flash when image loads fast
onMounted(() => {
    if (props.delayMs > 0) {
        setTimeout(() => {
            showFallback.value = true
        }, props.delayMs)
    }
})

const shouldShow = computed(() => {
    if (!showFallback.value) return false
    if (!context) return true
    return context.imageError?.value || !context.imageLoaded?.value
})

const fallbackStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.color) style.color = props.color
    if (props.bgColor) style.backgroundColor = props.bgColor
    return style
})
</script>

<template>
    <span v-if="shouldShow" class="avatar-fallback" :style="fallbackStyle">
        <Icon v-if="icon" :name="icon" class="avatar-icon" />
        <slot v-else />
    </span>
</template>

<style scoped>
@reference "../../theme.css";

.avatar-fallback {
    @apply flex h-full w-full items-center justify-center font-medium uppercase text-slate-600 dark:text-slate-300;
}
</style>
