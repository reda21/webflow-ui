<script setup lang="ts">
import { Modal } from '../index'
import Button from '../../button/Button.vue'

defineProps<{
    count: number
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
    <Modal :title="`This modal was opened programmatically ${count} times`" :open="true"
        :close="{ onClick: () => emit('close', false) }" @close="emit('close', false)">
        <template #footer>
            <div class="flex gap-2 justify-end w-full">
                <Button severity="secondary" label="Dismiss" @click="emit('close', false)" />
                <Button label="Success" @click="emit('close', true)" />
            </div>
        </template>
    </Modal>
</template>
