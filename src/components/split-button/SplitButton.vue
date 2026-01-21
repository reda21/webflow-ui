<template>
    <div class="split-btn overflow-hidden" :class="containerClasses">
        <Button v-bind="buttonProps" class="split-btn-main" @click="$emit('click', $event)">
            <slot />
        </Button>
        <Button v-bind="buttonProps" class="split-btn-trigger" @click="$emit('trigger', $event)">
            <Iconify icon="heroicons:chevron-down" class="w-4 h-4" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import Button from '../button/Button.vue'
import type { SplitButtonProps } from './types'
import './split-button.css'

const Iconify = defineAsyncComponent(() =>
    import('@iconify/vue').then(m => m.Icon)
)

const props = withDefaults(defineProps<SplitButtonProps>(), {
    rounded: 'md'
})

defineEmits<{
    click: [event: MouseEvent]
    trigger: [event: MouseEvent]
}>()

const buttonProps = computed(() => {
    const { ...rest } = props
    return rest
})

const containerClasses = computed(() => ({
    'w-full': props.block,
    [`round-${props.rounded}`]: true,
}))
</script>
