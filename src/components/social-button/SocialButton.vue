<template>
    <Button v-bind="filteredAttrs" :class="socialClasses" :icon="displayIcon" :label="displayLabel"
        :rounded="pill ? 'full' : props.rounded" @click="$emit('click', $event)"><template #icon v-if="$slots.icon">
            <slot name="icon" />
        </template>
        <slot v-if="!iconOnly && !props.label" />
    </Button>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import Button from '../button/Button.vue'
import type { ButtonProps } from '../button/types'
import type { SocialProvider } from './types'
import { PROVIDERS } from './providers'

interface Props extends Omit<ButtonProps, 'severity' | 'icon'> {
    provider: SocialProvider
    iconOnly?: boolean
    showIcon?: boolean
    pill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showIcon: true,
    iconOnly: false,
    pill: false,
    rounded: 'md'
})

defineEmits<{
    click: [event: MouseEvent]
}>()

const slots = useSlots()
const attrs = useAttrs()

// Filter out props that we handle specially or that shouldn't go to Button
const filteredAttrs = computed(() => {
    const { provider, iconOnly, showIcon, pill, ...rest } = props
    return { ...attrs, ...rest }
})

const displayIcon = computed(() => {
    if (!props.showIcon) return undefined
    return PROVIDERS[props.provider].icon
})

const displayLabel = computed(() => {
    if (props.iconOnly) return undefined
    if (props.label) return props.label
    if (slots.default) return undefined // Let slot handle it
    return `Continuer avec ${PROVIDERS[props.provider].name}`
})

const socialClasses = computed(() => [
    'social-provider',
    `social-${props.provider}`,
    props.iconOnly ? 'social-icon-only' : ''
])
</script>
