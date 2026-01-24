<script setup lang="ts">
import { computed, provide, ref, onMounted } from 'vue'
import type { AvatarSize, AvatarRounded, AvatarColor, ChipProps } from './types'
import { defineAsyncComponent } from 'vue'
const Icon = defineAsyncComponent(() => import('../icon/Icon.vue'))
import './avatar.css'

type FallbackType = 'initials' | 'icon' | 'placeholder'

const props = withDefaults(defineProps<{
    as?: any
    size?: AvatarSize
    rounded?: AvatarRounded
    color?: AvatarColor | string
    src?: string
    alt?: string
    icon?: string
    text?: string
    chip?: boolean | ChipProps
    skeleton?: boolean
    ring?: boolean | { color?: string; width?: 'sm' | 'md' | 'lg' }
    hoverEffect?: 'none' | 'scale' | 'glow' | 'lift'
    // New features
    preload?: boolean
    blurHash?: string
    ariaLabel?: string
    interactive?: boolean
    fallbackPriority?: FallbackType[]
    gradient?: boolean
    // Image props
    loading?: 'eager' | 'lazy'
    referrerpolicy?: ReferrerPolicy
    crossorigin?: '' | 'anonymous' | 'use-credentials'
    decoding?: 'async' | 'auto' | 'sync'
    height?: string | number
    width?: string | number
    sizes?: string
    srcset?: string
    usemap?: string
}>(), {
    as: 'span',
    size: 'md',
    rounded: 'full',
    loading: 'lazy',
    hoverEffect: 'none',
    interactive: false,
    gradient: false,
    fallbackPriority: () => ['initials', 'icon', 'placeholder']
})

const imageError = ref(false)
const imageLoaded = ref(false)

provide('avatarContext', {
    size: props.size,
    rounded: props.rounded,
    imageLoaded,
    imageError,
})

// Preload image if needed
onMounted(() => {
    if (props.preload && props.src) {
        const img = new Image()
        img.src = props.src
        if (props.srcset) img.srcset = props.srcset
    }
})

// Generate gradient from text/alt for consistent colors
const generateGradient = (text: string): string => {
    if (!text) return ''

    // Simple hash function
    let hash = 0
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }

    // Generate two colors from hash
    const hue1 = Math.abs(hash % 360)
    const hue2 = (hue1 + 40) % 360
    const hslToHex = (h: number, s: number, l: number) => {
        s /= 100
        l /= 100
        const c = (1 - Math.abs(2 * l - 1)) * s
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
        const m = l - c / 2
        let r = 0, g = 0, b = 0
        if (0 <= h && h < 60) { r = c; g = x; b = 0 }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0 }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c }
        else { r = c; g = 0; b = x }
        const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0')
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`
    }
    const color1 = hslToHex(hue1, 70, 60)
    const color2 = hslToHex(hue2, 70, 50)
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
}

// Compute avatar classes
const avatarClasses = computed(() => {
    const classes = [
        'avatar',
        `avatar-${props.size}`,
        `round-${props.rounded}`,
    ]

    // Color variant (only if not using gradient)
    if (!props.gradient && props.color && ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'neutral'].includes(props.color)) {
        classes.push(`avatar-${props.color}`)
    }

    // Skeleton loading
    if (props.skeleton) {
        classes.push('avatar-skeleton')
    }

    // Ring
    if (props.ring) {
        classes.push('avatar-ring')
        const ringWidth = typeof props.ring === 'object' ? props.ring.width : 'md'
        classes.push(`avatar-ring-${ringWidth || 'md'}`)
    }

    // Hover effect
    if (props.hoverEffect && props.hoverEffect !== 'none') {
        classes.push(`avatar-hover-${props.hoverEffect}`)
    }

    // Interactive (focusable)
    if (props.interactive) {
        classes.push('avatar-interactive')
    }

    return classes.filter(Boolean).join(' ')
})

// Compute chip classes
const chipClasses = computed(() => {
    if (!props.chip) return ''

    const chipConfig = typeof props.chip === 'object' ? props.chip : {}
    const position = chipConfig.position || 'top-right'
    const size = chipConfig.size || 'md'
    const color = chipConfig.color || 'success'
    const inset = chipConfig.inset || false
    const pulse = chipConfig.pulse || false

    const classes = [
        'avatar-chip-indicator',
        `avatar-chip-${position}`,
        `avatar-chip-${size}`,
    ]

    // Color
    if (['success', 'warning', 'danger', 'info', 'primary', 'neutral'].includes(color)) {
        classes.push(`avatar-chip-${color}`)
    }

    if (inset) classes.push('avatar-chip-inset')
    if (pulse) classes.push('avatar-chip-pulse')

    return classes.join(' ')
})

// Custom style for custom colors and gradients
const avatarStyle = computed(() => {
    const style: Record<string, string> = {}

    // Gradient background
    if (props.gradient && !props.src) {
        const gradientSource = props.text || props.alt || ''
        if (gradientSource) {
            const grad = generateGradient(gradientSource)
            style.background = grad
            style.backgroundImage = grad
            style.borderColor = 'transparent'
        }
    } else if (props.color && !['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'neutral'].includes(props.color)) {
        style.backgroundColor = props.color
        style.borderColor = props.color
    }

    if (typeof props.ring === 'object' && props.ring.color) {
        style['--tw-ring-color'] = props.ring.color
    }

    return style
})

// Chip custom style
const chipStyle = computed(() => {
    if (!props.chip || typeof props.chip !== 'object') return {}

    const chipConfig = props.chip as ChipProps
    if (chipConfig.color && !['success', 'warning', 'danger', 'info', 'primary', 'neutral'].includes(chipConfig.color)) {
        return { backgroundColor: chipConfig.color }
    }
    return {}
})

const handleLoad = () => {
    imageLoaded.value = true
}

const handleError = () => {
    imageError.value = true
    imageLoaded.value = false
}

// Get initials from alt or text prop
const displayInitials = computed(() => {
    if (props.text) return props.text
    if (!props.alt) return ''
    return props.alt
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
})

// Determine fallback content based on priority
const fallbackContent = computed(() => {
    if (props.src && !imageError.value) return 'image'

    for (const type of props.fallbackPriority) {
        if (type === 'initials' && displayInitials.value) return 'initials'
        if (type === 'icon' && props.icon) return 'icon'
        if (type === 'placeholder') return 'placeholder'
    }

    return 'slot'
})

// Image classes with transition
const imageClasses = computed(() => {
    return [
        'h-full w-full object-cover',
        imageLoaded.value ? 'avatar-img-loaded' : 'avatar-img-enter'
    ].join(' ')
})

// ARIA attributes
const ariaAttributes = computed(() => {
    const attrs: Record<string, string> = {}

    if (props.ariaLabel) {
        attrs['aria-label'] = props.ariaLabel
    } else if (props.alt) {
        attrs['aria-label'] = props.alt
    }

    if (props.interactive) {
        attrs.role = 'button'
        attrs.tabindex = '0'
    }

    return attrs
})
</script>

<template>
    <component :is="as" :class="avatarClasses" :style="avatarStyle" v-bind="ariaAttributes">
        <div class="avatar-content" :class="{ invisible: skeleton }">
            <!-- Blur hash placeholder -->
            <div v-if="blurHash && !imageLoaded && src" class="absolute inset-0 avatar-blurhash"
                :style="{ backgroundImage: `url(${blurHash})` }" />

            <!-- Image -->
            <template v-if="fallbackContent === 'image'">
                <img :src="src" :alt="alt" :loading="preload ? 'eager' : loading" :referrerpolicy="referrerpolicy"
                    :crossorigin="crossorigin" :decoding="decoding" :height="height" :width="width" :sizes="sizes"
                    :srcset="srcset" :usemap="usemap" :class="imageClasses" @load="handleLoad" @error="handleError" />
            </template>

            <!-- Fallback: Icon -->
            <template v-else-if="fallbackContent === 'icon'">
                <Icon :name="icon!" class="avatar-icon" />
            </template>

            <!-- Fallback: Initials -->
            <template v-else-if="fallbackContent === 'initials'">
                <span class="avatar-text uppercase font-medium" :class="{ 'text-white': gradient }">
                    {{ displayInitials }}
                </span>
            </template>

            <!-- Fallback: Placeholder icon -->
            <template v-else-if="fallbackContent === 'placeholder'">
                <Icon name="heroicons:user" class="avatar-icon" />
            </template>

            <!-- Slot fallback -->
            <slot v-else />
        </div>

        <!-- Chip indicator -->
        <span v-if="chip" :class="chipClasses" :style="chipStyle">
            <template v-if="typeof chip === 'object' && chip.text">
                {{ chip.text }}
            </template>
        </span>
    </component>
</template>
