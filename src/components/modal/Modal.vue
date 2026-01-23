<script setup lang="ts">
/**
 * Modal Component
 * 
 * A premium, accessible modal component built on top of Radix Vue primitives.
 * Supports multiple sizes, variants, and smooth animations.
 */
import { computed } from 'vue'
import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from 'radix-vue'
import Button from '../button/Button.vue'
import type { ModalProps, ModalEmits } from './types'
import './modal.css'

const props = withDefaults(defineProps<ModalProps>(), {
    modelValue: undefined,
    defaultOpen: false,
    size: 'md',
    variant: 'default',
    close: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    preventScroll: true,
    role: 'dialog'
})

const emit = defineEmits<ModalEmits>()

// Handle v-model for openness
const isOpen = computed({
    get: () => props.modelValue ?? props.defaultOpen,
    set: (value) => emit('update:modelValue', value)
})

const handleOpenChange = (value: boolean) => {
    isOpen.value = value
    if (value) emit('open')
    else emit('close')
}

// Classes
const contentClasses = computed(() => [
    'modal-content',
    `modal--${props.size}`,
    `modal--${props.variant}`,
    props.contentClass
])

const overlayClasses = computed(() => [
    'modal-overlay',
    props.overlayClass
])

// Close button normalized props
const closeButtonProps = computed(() => {
    if (typeof props.close === 'object') {
        return {
            severity: 'secondary' as const,
            variant: 'ghost' as const,
            icon: 'heroicons:x-mark',
            size: 'sm' as const,
            ...props.close,
            class: ['modal-close', props.close.class]
        }
    }
    return {
        severity: 'secondary' as const,
        variant: 'ghost' as const,
        icon: 'heroicons:x-mark',
        size: 'sm' as const,
        class: 'modal-close'
    }
})

// Animation names for Vue Transition
// We use Vue's Transition for smooth entry/exit
</script>

<template>
    <DialogRoot :open="isOpen" @update:open="handleOpenChange">
        <DialogPortal>
            <!-- Overlay transition -->
            <Transition name="modal-overlay">
                <DialogOverlay v-if="isOpen" :class="overlayClasses" />
            </Transition>

            <div v-if="isOpen" class="modal-content-wrapper">
                <!-- Content transition -->
                <Transition name="modal-content" appear @after-leave="emit('after-leave')">
                    <DialogContent v-if="isOpen" :class="contentClasses" :aria-label="ariaLabel" @interact-outside="(event) => {
                        if (!closeOnOutsideClick) event.preventDefault()
                    }" @escape-key-down="(event) => {
                        if (!closeOnEscape) event.preventDefault()
                    }">
                        <!-- Header Section -->
                        <header v-if="title || description || $slots.header" :class="['modal-header', headerClass]">
                            <slot name="header">
                                <div>
                                    <DialogTitle v-if="title" class="modal-title">
                                        {{ title }}
                                    </DialogTitle>
                                    <DialogDescription v-if="description" class="modal-description">
                                        {{ description }}
                                    </DialogDescription>
                                </div>
                            </slot>
                        </header>

                        <!-- Close Button -->
                        <DialogClose v-if="close !== false" :as-child="true">
                            <slot name="close">
                                <Button v-bind="closeButtonProps" aria-label="Close" />
                            </slot>
                        </DialogClose>

                        <!-- Body Section -->
                        <div :class="['modal-body', bodyClass]">
                            <slot />
                        </div>

                        <!-- Footer Section -->
                        <footer v-if="$slots.footer" :class="['modal-footer', footerClass]">
                            <slot name="footer" />
                        </footer>
                    </DialogContent>
                </Transition>
            </div>
        </DialogPortal>
    </DialogRoot>
</template>
