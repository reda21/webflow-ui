<script setup lang="ts">
import { useOverlay } from '../../composables/useOverlay'

const { overlays, _close } = useOverlay()
</script>

<template>
    <div class="overlay-provider">
        <component v-for="overlay in overlays" :key="overlay.id" :is="overlay.component" v-bind="overlay.props"
            @close="(result: any) => _close(overlay.id, result)" />
    </div>
</template>
