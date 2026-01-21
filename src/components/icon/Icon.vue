<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

interface Props {
  name: string
  size?: string | number
  color?: string
  rotate?: number | string
  flip?: 'horizontal' | 'vertical' | 'horizontal,vertical'
  spin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: '1.25em',
})

const iconStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.color) {
    styles.color = props.color
  }

  return styles
})
</script>

<template>
  <Icon
    :icon="name"
    :width="size"
    :height="size"
    :rotate="rotate"
    :flip="flip"
    :class="{ 'animate-spin': spin }"
    :style="iconStyles"
    class="webflow-icon"
  />
</template>

<style scoped>
.webflow-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
