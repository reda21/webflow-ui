<template>
    <Button v-bind="buttonProps" :class="socialClasses" @click="$emit('click', $event)">
        <template #icon v-if="$slots.icon">
            <slot name="icon" />
        </template>
        <slot />
    </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '../button/Button.vue'
import type { ButtonProps } from '../button/types'
import type { SocialProvider } from './types'

interface Props extends Omit<ButtonProps, 'severity'> {
    provider: SocialProvider
}

const props = defineProps<Props>()
const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const buttonProps = computed(() => {
    const { provider, ...rest } = props
    return rest
})

const socialClasses = computed(() => `social-${props.provider}`)
</script>
