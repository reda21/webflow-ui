<script setup lang="ts">
/**
 * NavLogo Component
 * 
 * A flexible logo component for the Navbar.
 * Supports different display modes: icon-only, text-only, or both.
 */
import { computed } from 'vue'
import Icon from '../icon/Icon.vue'
import type { NavLogoMode, NavLogoProps } from './types'
import './navlogo.css'

const props = withDefaults(defineProps<NavLogoProps>(), {
    mode: 'both',
    text: 'WebFlow',
    icon: '',
    isImage: false,
    alt: 'Logo',
    href: '/',
    size: 'md',
    gradientFrom: '',
    gradientTo: '',
    showIconBg: true,
    iconVariant: 'gradient',
    iconColor: 'indigo'
})

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
}>()

// Computed: Show icon
const showIcon = computed(() => props.mode === 'icon' || props.mode === 'both')
const showText = computed(() => props.mode === 'text' || props.mode === 'both')

// Computed: Has custom icon
const hasCustomIcon = computed(() => !!props.icon)

// Computed: Icon background style
const iconBgStyle = computed(() => {
    if (props.iconVariant === 'none' || !props.showIconBg) return {}

    if (props.gradientFrom && props.gradientTo) {
        return {
            background: `linear-gradient(135deg, ${props.gradientFrom}, ${props.gradientTo})`
        }
    }
    return {}
})

// Classes
const logoClasses = computed(() => [
    'navlogo',
    `navlogo--${props.size}`,
    `navlogo--${props.mode}`
])

const iconWrapperClasses = computed(() => [
    'navlogo-icon',
    {
        'navlogo-icon--gradient': props.iconVariant === 'gradient' && props.showIconBg,
        'navlogo-icon--solid': props.iconVariant === 'solid' && props.showIconBg,
        'navlogo-icon--soft': props.iconVariant === 'soft' && props.showIconBg,
        'navlogo-icon--none': props.iconVariant === 'none' || !props.showIconBg,
        [`navlogo-icon--${props.iconColor}`]: props.iconVariant !== 'gradient' && props.showIconBg
    }
])

// Handlers
const handleClick = (event: MouseEvent) => {
    emit('click', event)
}
</script>

<template>
    <a :href="href" :class="logoClasses" @click="handleClick">
        <!-- Icon -->
        <div v-if="showIcon" :class="iconWrapperClasses" :style="iconBgStyle">
            <slot name="icon">
                <!-- Custom image -->
                <img v-if="isImage && icon" :src="icon" :alt="alt" class="navlogo-img" />
                <!-- Custom icon -->
                <Icon v-else-if="hasCustomIcon" :name="icon" class="navlogo-icon-svg" />
                <!-- Default icon -->
                <svg v-else class="navlogo-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </slot>
        </div>

        <!-- Text -->
        <span v-if="showText" class="navlogo-text">
            <slot>{{ text }}</slot>
        </span>
    </a>
</template>
