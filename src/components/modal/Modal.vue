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
    VisuallyHidden,
} from 'radix-vue'
import Button from '../button/Button.vue'
import type { ModalProps, ModalEmits } from './types'
import './modal.css'

const props = withDefaults(defineProps<ModalProps>(), {
    open: undefined,
    modelValue: undefined,
    defaultOpen: false,
    size: 'md',
    variant: 'default',
    close: true,
    overlay: true,
    modal: true,
    dismissible: true,
    scrollable: false,
    transition: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    preventScroll: true,
    role: 'dialog',
    fullscreen: false,
    portal: true,
    content: undefined
})

const emit = defineEmits<ModalEmits>()

// Handle v-model for openness
const isOpen = computed({
    get: () => props.open ?? props.modelValue ?? props.defaultOpen,
    set: (value) => {
        emit('update:modelValue', value)
        emit('update:open', value)
    }
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
    props.scrollable ? 'modal-content--scrollable' : '',
    props.fullscreen ? 'modal-content--fullscreen' : '',
    props.contentClass,
    props.ui?.content
])

const overlayClasses = computed(() => [
    'modal-overlay',
    props.overlayClass,
    props.ui?.overlay
])

const wrapperClasses = computed(() => [
    'modal-content-wrapper',
    props.scrollable ? 'modal-wrapper--scrollable' : '',
    props.ui?.wrapper
])

// Close button normalized props
const closeButtonProps = computed(() => {
    const defaultIcon = props.closeIcon || 'heroicons:x-mark'

    if (typeof props.close === 'object') {
        return {
            severity: 'secondary' as const,
            variant: 'ghost' as const,
            icon: defaultIcon,
            size: 'sm' as const,
            ...props.close,
            class: ['modal-close', props.close.class]
        }
    }
    return {
        severity: 'secondary' as const,
        variant: 'ghost' as const,
        icon: defaultIcon,
        size: 'sm' as const,
        class: 'modal-close'
    }
})

// Animation names for Vue Transition
// We use Vue's Transition for smooth entry/exit

const close = (result?: any) => {
    isOpen.value = false
    emit('close', result)
}

defineExpose({
    close
})
</script>

<template>
    <DialogRoot :open="isOpen" :modal="modal" @update:open="handleOpenChange">
        <DialogPortal :to="typeof portal === 'string' || portal instanceof HTMLElement ? portal : undefined"
            :disabled="portal === false">
            <!-- Overlay transition -->
            <Transition :name="transition ? 'modal-overlay' : ''" :css="transition">
                <DialogOverlay v-if="isOpen && overlay && modal" :class="overlayClasses" />
            </Transition>

            <div v-if="isOpen" :class="wrapperClasses">
                <!-- Content transition -->
                <Transition :name="transition ? 'modal-content' : ''" :css="transition" appear
                    @after-leave="emit('after-leave')" @after-enter="emit('after-enter')">
                    <DialogContent v-if="isOpen" :class="contentClasses" :aria-label="ariaLabel" @interact-outside="(event) => {
                        if (!dismissible) {
                            event.preventDefault()
                            emit('close-prevent')
                            return
                        }
                        if (!closeOnOutsideClick) event.preventDefault()
                    }" @escape-key-down="(event) => {
                        if (!dismissible) {
                            event.preventDefault()
                            emit('close-prevent')
                            return
                        }
                        if (!closeOnEscape) event.preventDefault()
                    }">
                        <slot name="content" :close="close">
                            <!-- Header Section -->
                            <header v-if="title || description || $slots.header || $slots.title || $slots.description"
                                :class="['modal-header', headerClass, ui?.header]">
                                <slot name="header" :close="close">
                                    <div class="flex flex-col gap-1.5 overflow-hidden">
                                        <DialogTitle v-if="title || $slots.title" :class="['modal-title', ui?.title]">
                                            <slot name="title">{{ title }}</slot>
                                        </DialogTitle>
                                        <DialogDescription v-if="description || $slots.description"
                                            :class="['modal-description', ui?.description]">
                                            <slot name="description">{{ description }}</slot>
                                        </DialogDescription>
                                    </div>

                                    <div v-if="$slots.actions" class="flex items-center gap-1.5 ml-auto">
                                        <slot name="actions" />
                                    </div>
                                </slot>
                            </header>

                            <!-- Accessibility: Ensure DialogDescription is present if not provided via props -->
                            <VisuallyHidden v-if="!description" as-child>
                                <DialogDescription class="sr-only">Modal Content</DialogDescription>
                            </VisuallyHidden>

                            <!-- Close Button -->
                            <DialogClose v-if="close !== false" :as-child="true">
                                <slot name="close" :ui="ui">
                                    <Button v-bind="closeButtonProps" aria-label="Close">
                                        <template #icon v-if="$slots['close-icon']">
                                            <slot name="close-icon" />
                                        </template>
                                    </Button>
                                </slot>
                            </DialogClose>

                            <!-- Body Section -->
                            <div :class="['modal-body', bodyClass, ui?.body]">
                                <slot name="body" :close="close">
                                    <slot :open="isOpen" />
                                </slot>
                            </div>

                            <!-- Footer Section -->
                            <footer v-if="$slots.footer" :class="['modal-footer', footerClass, ui?.footer]">
                                <slot name="footer" :close="close" />
                            </footer>
                        </slot>
                    </DialogContent>
                </Transition>
            </div>
        </DialogPortal>
    </DialogRoot>
</template>
