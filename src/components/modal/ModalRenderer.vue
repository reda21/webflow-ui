<script setup lang="ts">
import { useModal } from './useModal'
import Modal from './Modal.vue'

const { modals, close } = useModal()
</script>

<template>
    <div class="modal-renderer">
        <Modal v-for="modal in modals" :key="modal.id" v-bind="modal" @close="modal.onClose"
            @update:modelValue="(val) => !val && close(modal.id)">
            <!-- Render dynamic component if provided -->
            <component :is="modal.component" v-if="modal.component" v-bind="modal.props" />

            <!-- Render slots if provided -->
            <template v-for="(slot, name) in modal.slots" :key="name" #[name]>
                <component :is="slot" v-if="typeof slot !== 'string'" />
                <template v-else>{{ slot }}</template>
            </template>
        </Modal>
    </div>
</template>
