<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '../index'
import Button from '../../button/Button.vue'

const first = ref(false)
const second = ref(false)
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <Button label="Open Nested Modal Demo" severity="primary" @click="first = true" />

    <!-- First Modal -->
    <Modal 
      v-model:open="first" 
      title="First Modal" 
      description="This is the first layer of nesting."
      :ui="{ footer: 'justify-end' }"
    >
      <div class="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          You can nest another modal by clicking the button below or in the footer.
        </p>
        <Button label="Open Second Modal" severity="secondary" @click="second = true" />
      </div>

      <template #footer>
        <Button label="Close" severity="secondary" variant="outline" @click="first = false" />
        <Button label="Open Second" severity="primary" @click="second = true" />

        <!-- Second Modal (Nested) -->
        <Modal 
          v-model:open="second" 
          title="Second Modal" 
          description="This modal is nested inside the first one."
          :ui="{ footer: 'justify-end' }"
          size="sm"
        >
          <div class="p-2">
            <p>I am the second modal. My overlay should correctly dim the first modal!</p>
          </div>

          <template #footer>
            <Button label="Back to First" severity="neutral" variant="outline" @click="second = false" />
            <Button label="Close Both" severity="error" @click="() => { second = false; first = false; }" />
          </template>
        </Modal>
      </template>
    </Modal>
  </div>
</template>
