<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { InputProps, InputEmits } from './types'

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    disabled: false,
    autofocus: false,
    readonly: false,
    required: false,
})

const emit = defineEmits<InputEmits>()

const model = computed({
    get: () => props.modelValue?.toString() ?? '',
    set: (value) => emit('update:modelValue', value),
})

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    model.value = target.value
    emit('input', event)
}

const hasLabel = computed(() => !!props.label)
const hasHint = computed(() => !!props.hint)
const hasError = computed(() => !!props.error)
</script>

<template>
    <div class="wmx-input-wrapper" :class="{ 'is-disabled': disabled, 'is-error': hasError }">
        <label v-if="hasLabel" :for="id" class="wmx-input-label">
            {{ label }}
        </label>

        <div class="wmx-input-container">
            <div v-if="iconLeft" class="wmx-input-icon is-left">
                <Icon :icon="iconLeft" />
            </div>

            <input :id="id" v-model="model" :type="type" :placeholder="placeholder" :disabled="disabled"
                :readonly="readonly" :required="required" :name="name" :autocomplete="autocomplete"
                :autofocus="autofocus" class="wmx-input-field" :class="{
                    'has-icon-left': !!iconLeft,
                    'has-icon-right': !!iconRight || hasError
                }" @input="handleInput" @focus="emit('focus', $event)" @blur="emit('blur', $event)"
                @change="emit('change', $event)" />

            <div v-if="iconRight && !hasError" class="wmx-input-icon is-right">
                <Icon :icon="iconRight" />
            </div>

            <div v-if="hasError" class="wmx-input-icon is-right is-error-icon">
                <Icon icon="mdi:alert-circle" />
            </div>
        </div>

        <p v-if="hasError" class="wmx-input-error-message">
            {{ error }}
        </p>
        <p v-else-if="hasHint" class="wmx-input-hint">
            {{ hint }}
        </p>
    </div>
</template>

<style scoped>
.wmx-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
}

.wmx-input-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-soft);
    margin-left: 0.25rem;
    transition: color 0.2s;
}

.wmx-input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.wmx-input-field {
    width: 100%;
    background: color-mix(in srgb, var(--color-bg-muted) 50%, transparent);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: var(--color-text);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
}

.wmx-input-field::placeholder {
    color: var(--color-text-muted);
}

.wmx-input-field:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.wmx-input-field.has-icon-left {
    padding-left: 2.75rem;
}

.wmx-input-field.has-icon-right {
    padding-right: 2.75rem;
}

.wmx-input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    pointer-events: none;
    font-size: 1.25rem;
    transition: color 0.2s;
}

.wmx-input-icon.is-left {
    left: 1rem;
}

.wmx-input-icon.is-right {
    right: 1rem;
}

/* Error State */
.is-error .wmx-input-label {
    color: #ef4444;
}

.is-error .wmx-input-field {
    border-color: rgba(239, 68, 68, 0.5);
}

.is-error .wmx-input-field:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.is-error-icon {
    color: #ef4444;
}

.wmx-input-error-message {
    font-size: 0.75rem;
    color: #ef4444;
    margin-left: 0.25rem;
}

/* Disabled State */
.is-disabled {
    opacity: 0.6;
}

.is-disabled .wmx-input-field {
    cursor: not-allowed;
    background: var(--color-bg-muted);
}

.is-disabled .wmx-input-label {
    cursor: not-allowed;
}

.wmx-input-hint {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-left: 0.25rem;
}

/* Dark mode adjustments if needed via global tokens */
</style>
