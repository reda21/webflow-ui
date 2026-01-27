<script setup lang="ts">
/**
 * NavLinks Component
 * 
 * A component to render a list of navigation items.
 */
import type { NavItem } from './types'
import Icon from '../icon/Icon.vue'

interface NavLinksProps {
    /** Navigation items to display */
    navItems?: NavItem[]
    /** Custom class for the nav wrapper */
    class?: string
}

withDefaults(defineProps<NavLinksProps>(), {
    navItems: () => []
})

const emit = defineEmits<{
    (e: 'nav-click', item: NavItem, event: MouseEvent): void
}>()

const handleNavClick = (item: NavItem, event: MouseEvent) => {
    emit('nav-click', item, event)
}
</script>

<template>
    <div :class="['navbar-nav', $props.class]">
        <slot>
            <a v-for="item in navItems" :key="item.label" :href="item.href"
                class="navbar-nav-item inline-flex items-center gap-2"
                :class="{ 'navbar-nav-item--active': item.active }" :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined" @click="handleNavClick(item, $event)">
                <Icon v-if="item.icon" :name="item.icon" size="sm" class="shrink-0" />
                <span>{{ item.label }}</span>
                <span v-if="item.badge" class="navbar-nav-item-badge">{{ item.badge }}</span>
                <svg v-if="item.external" class="navbar-nav-item-external" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </slot>
    </div>
</template>
