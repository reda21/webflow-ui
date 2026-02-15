<script setup lang="ts">
import { Icon as IconifyIcon, loadIcon } from '@iconify/vue'
import { computed, ref, onMounted, watch, onUnmounted } from 'vue'
import type { IconMode, IconSize, IconFlip } from './types'
import './icon.css'

// Global icon cache
const iconCache = new Map<string, boolean>()

const props = withDefaults(defineProps<{
  name: string
  mode?: IconMode
  size?: IconSize
  color?: string
  rotate?: number | string
  flip?: IconFlip
  spin?: boolean
  pulse?: boolean
  inline?: boolean
  ariaLabel?: string
  ariaHidden?: boolean
  // New features
  fallback?: string
  loading?: boolean
  skeleton?: boolean
  sprite?: string
  // Scale transformation
  scale?: number | string
  // Lazy loading
  lazy?: boolean
}>(), {
  mode: 'css',
  size: 'md',
  ariaHidden: true,
  skeleton: false,
  lazy: false
})

// State
const isLoading = ref(props.mode === 'svg')
const hasError = ref(false)
const isVisible = ref(!props.lazy)
const isMounted = ref(false)
const iconRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// Test environment detection to avoid network icon loading in Vitest
const isTestEnv = typeof import.meta !== 'undefined' && (import.meta as any)?.env?.MODE === 'test'

// Check if icon is cached
const isCached = (iconName: string): boolean => {
  return iconCache.has(iconName)
}

// Load and cache icon
const loadAndCacheIcon = async (iconName: string) => {
  if (isTestEnv) {
    iconCache.set(iconName, true)
    isLoading.value = false
    return
  }
  if (isCached(iconName)) {
    isLoading.value = false
    return
  }

  isLoading.value = true
  hasError.value = false

  try {
    const [prefix, name] = iconName.includes(':')
      ? iconName.split(':')
      : ['mdi', iconName]

    await loadIcon(`${prefix}:${name}`)
    iconCache.set(iconName, true)
    isLoading.value = false
  } catch (error) {
    console.warn(`Icon "${iconName}" failed to load`)
    hasError.value = true
    isLoading.value = false
  }
}

// Lazy loading with IntersectionObserver
const setupLazyLoading = () => {
  if (!props.lazy || typeof IntersectionObserver === 'undefined') {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      })
    },
    { rootMargin: '50px' }
  )
}

// Compute CSS Icon URL for mask-image
const cssIconUrl = computed(() => {
  if (!props.name) return null
  const [prefix, name] = props.name.includes(':')
    ? props.name.split(':')
    : ['mdi', props.name]
  return `https://api.iconify.design/${prefix}/${name}.svg`
})

// Initialize
onMounted(async () => {
  if (isTestEnv) {
    isMounted.value = true
    return
  }
  setupLazyLoading()

  if (iconRef.value && observer) {
    observer.observe(iconRef.value)
  }

  if (!props.lazy || isVisible.value) {
    if (props.mode === 'svg') {
      await loadAndCacheIcon(props.name)
    }
  }

  // Delay isMounted to after hydration so the initial client render
  // matches the SSR placeholder (<span>), avoiding hydration mismatch
  await nextTick()
  isMounted.value = true
})

onUnmounted(() => {
  observer?.disconnect()
})

// Watch for visibility changes (lazy loading)
watch(isVisible, async (visible) => {
  if (visible && props.mode === 'svg') {
    await loadAndCacheIcon(props.name)
  }
})

// Watch for name changes
watch(() => props.name, async (newName) => {
  if (newName && props.mode === 'svg' && isVisible.value) {
    await loadAndCacheIcon(newName)
  }
})

// Determine which icon to show
const displayIcon = computed(() => {
  if (hasError.value && props.fallback) {
    return props.fallback
  }
  return props.name
})

// Compute icon classes
const iconClasses = computed(() => {
  const classes = ['icon']

  if (typeof props.size === 'string' && ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(props.size)) {
    classes.push(`icon-${props.size}`)
  }

  if (props.spin) classes.push('icon-spin')
  if (props.pulse) classes.push('icon-pulse')
  if (props.inline) classes.push('icon-inline')

  if (props.flip === 'horizontal') classes.push('icon-flip-horizontal')
  else if (props.flip === 'vertical') classes.push('icon-flip-vertical')
  else if (props.flip === 'horizontal,vertical') classes.push('icon-flip-both')

  if (props.rotate === 90 || props.rotate === '90') classes.push('icon-rotate-90')
  else if (props.rotate === 180 || props.rotate === '180') classes.push('icon-rotate-180')
  else if (props.rotate === 270 || props.rotate === '270') classes.push('icon-rotate-270')

  if (props.mode === 'css') classes.push('icon-css')

  if ((isLoading.value || props.loading) && props.skeleton) {
    classes.push('icon-skeleton')
  }

  return classes.join(' ')
})

// Compute icon styles
const iconStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (props.color) {
    styles.color = props.color
  }

  // Custom size
  if (props.size && typeof props.size !== 'string' ||
    (typeof props.size === 'string' && !['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(props.size))) {
    const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
    styles.width = sizeValue
    styles.height = sizeValue
  }

  // Custom rotate
  if (props.rotate && ![90, 180, 270, '90', '180', '270'].includes(props.rotate as any)) {
    styles.transform = `rotate(${props.rotate}deg)`
  }

  // Scale transformation
  if (props.scale) {
    const scaleValue = typeof props.scale === 'number' ? props.scale : parseFloat(props.scale)
    const existingTransform = styles.transform || ''
    styles.transform = `${existingTransform} scale(${scaleValue})`.trim()
  }

  // CSS mode mask
  if (props.mode === 'css' && cssIconUrl.value) {
    styles.maskImage = `url(${cssIconUrl.value})`
    styles.webkitMaskImage = `url(${cssIconUrl.value})`
  }

  return styles
})

// Accessibility attributes - auto-apply role="img" when aria-label is provided
const ariaAttrs = computed(() => {
  const attrs: Record<string, string | boolean> = {}

  if (props.ariaLabel) {
    attrs['aria-label'] = props.ariaLabel
    attrs.role = 'img'
  } else if (props.ariaHidden) {
    attrs['aria-hidden'] = 'true'
  }

  return attrs
})

// Size for Iconify (SVG mode)
const iconifySize = computed(() => {
  const sizeMap: Record<string, string> = {
    xs: '0.75rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem'
  }

  if (typeof props.size === 'string' && sizeMap[props.size]) {
    return sizeMap[props.size]
  }

  return typeof props.size === 'number' ? `${props.size}px` : props.size
})

// Sprite mode - build sprite URL
const spriteIcon = computed(() => {
  if (!props.sprite) return null

  const [prefix, name] = props.name.includes(':')
    ? props.name.split(':')
    : ['mdi', props.name]

  return `${props.sprite}#${prefix}-${name}`
})

// SSR-safe check
const isClient = typeof window !== 'undefined'
</script>

<template>
  <span v-bind="ariaAttrs">
    <span v-if="lazy && !isVisible" ref="iconRef" :class="iconClasses" :style="iconStyles"></span>
    <span v-else-if="(isLoading || loading) && skeleton && mode === 'svg'" :class="iconClasses"
      :style="iconStyles"></span>
    <svg v-else-if="sprite" :class="iconClasses" :style="iconStyles">
      <use :href="spriteIcon!" />
    </svg>
    <template v-else-if="mode === 'svg'">
      <IconifyIcon v-if="!isTestEnv && isMounted" :icon="displayIcon" :width="iconifySize" :height="iconifySize"
        :class="iconClasses" :style="iconStyles" />
      <span v-else :class="iconClasses" :style="iconStyles"></span>
    </template>
    <span v-else :class="iconClasses" :style="iconStyles"></span>
  </span>
</template>
