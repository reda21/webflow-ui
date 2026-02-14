<script setup lang="ts">
/**
 * Navbar Component
 * 
 * A premium, responsive navigation bar with modern aesthetics.
 * Features: 
 * - Customizable sections: start, center, end
 * - Logo, navigation links, search, theme toggle, CTA
 * - Mobile responsive menu
 */
import { ref, computed, useSlots } from 'vue'
import Icon from '../icon/Icon.vue'
import NavLinks from './NavLinks.vue'
import './navbar.css'

export interface NavItem {
    label: string;
    href: string;
    active?: boolean;
    icon?: string;
    external?: boolean;
    badge?: string | number;
}

export interface NavbarEmits {
    (e: "logo-click", event: MouseEvent): void;
    (e: "nav-click", item: NavItem, event: MouseEvent): void;
    (e: "search-click", event: MouseEvent): void;
    (e: "theme-toggle", event: MouseEvent): void;
    (e: "cta-click", event: MouseEvent): void;
    (e: "mobile-menu-toggle", isOpen: boolean): void;
}

interface NavbarProps {
    brandName?: string;
    logoHref?: string;
    navItems?: NavItem[];
    showSearch?: boolean;
    showThemeToggle?: boolean;
    isDark?: boolean;
    ctaText?: string;
    searchPlaceholder?: string;
    sticky?: boolean;
    blur?: boolean;
    transparent?: boolean;
    variant?: "default" | "minimal" | "centered" | "expanded";
    size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<NavbarProps>(), {
    brandName: 'WebFlow',
    logoHref: '/',
    navItems: () => [] as NavItem[],
    showSearch: false,
    showThemeToggle: false,
    isDark: false,
    ctaText: '',
    searchPlaceholder: 'Search...',
    sticky: false,
    blur: true,
    transparent: false,
    variant: 'default',
    size: 'md'
})

const emit = defineEmits<NavbarEmits>()
const slots = useSlots()

const isMobileMenuOpen = ref(false)

// Check if custom slots are being used
const hasCustomStart = computed(() => !!slots.start)
const hasCustomCenter = computed(() => !!slots.center)
const hasCustomEnd = computed(() => !!slots.end)
const hasAnyCustomSlot = computed(() => hasCustomStart.value || hasCustomCenter.value || hasCustomEnd.value)

// Computed classes
const navbarClasses = computed(() => [
    'navbar',
    `navbar--${props.variant}`,
    `navbar--${props.size}`,
    {
        'navbar--sticky': props.sticky,
        'navbar--blur': props.blur,
        'navbar--transparent': props.transparent
    }
])

// Handlers
const handleLogoClick = (event: MouseEvent) => {
    emit('logo-click', event)
}

const handleNavClick = (item: NavItem, event: MouseEvent) => {
    isMobileMenuOpen.value = false
    emit('nav-click', item, event)
}

const handleSearchClick = (event: MouseEvent) => {
    emit('search-click', event)
}

const handleThemeToggle = (event: MouseEvent) => {
    emit('theme-toggle', event)
}

const handleCtaClick = (event: MouseEvent) => {
    isMobileMenuOpen.value = false
    emit('cta-click', event)
}

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    emit('mobile-menu-toggle', isMobileMenuOpen.value)
}

// Expose methods
defineExpose({
    toggleMobileMenu,
    closeMobileMenu: () => { isMobileMenuOpen.value = false },
    openMobileMenu: () => { isMobileMenuOpen.value = true }
})
</script>

<template>
    <nav :class="navbarClasses">
        <div class="navbar-container">
            <div class="navbar-inner">
                <div class="navbar-start">
                    <slot name="start">
                        <div class="navbar-logo">
                            <a :href="logoHref" class="navbar-logo-link" @click="handleLogoClick">
                                <div class="navbar-logo-icon">
                                    <slot name="logo-icon">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </slot>
                                </div>
                                <span class="navbar-brand">
                                    <slot name="brand">{{ brandName }}</slot>
                                </span>
                            </a>
                        </div>
                    </slot>
                </div>

                <div class="navbar-center">
                    <slot name="center">
                        <NavLinks :nav-items="navItems" @nav-click="handleNavClick" />
                    </slot>
                </div>

                <div class="navbar-end">
                    <slot name="end">
                        <div class="navbar-actions">
                            <button v-if="showSearch" class="navbar-search-btn" @click="handleSearchClick">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>{{ searchPlaceholder }}</span>
                                <kbd class="navbar-search-kbd"><span class="text-xs">⌘</span>K</kbd>
                            </button>

                            <button v-if="showThemeToggle" class="navbar-theme-btn" aria-label="Toggle theme"
                                @click="handleThemeToggle">
                                <slot name="theme-icon">
                                    <svg v-if="isDark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <svg v-else fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                </slot>
                            </button>

                            <button v-if="ctaText" class="navbar-cta" @click="handleCtaClick">
                                <slot name="cta">{{ ctaText }}</slot>
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>

                            <button class="navbar-mobile-btn" aria-label="Toggle menu" @click="toggleMobileMenu">
                                <svg v-if="!isMobileMenuOpen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg v-else fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </slot>
                </div>
            </div>
        </div>

        <div v-show="isMobileMenuOpen" class="navbar-mobile-menu">
            <div class="navbar-mobile-menu-inner">
                <slot name="mobile">
                    <slot name="mobile-nav">
                        <slot name="mobile-nav-items">
                            <a v-for="item in navItems" :key="item.label" :href="item.href"
                                class="navbar-mobile-nav-item"
                                :class="{ 'navbar-mobile-nav-item--active': item.active }"
                                @click="handleNavClick(item, $event)">
                                <Icon v-if="item.icon" :name="item.icon" size="sm" class="mr-2" />
                                {{ item.label }}
                                <span v-if="item.badge" class="navbar-nav-item-badge ml-auto">{{ item.badge }}</span>
                            </a>
                        </slot>
                    </slot>
                    <div v-if="ctaText" class="navbar-mobile-cta-wrapper">
                        <button class="navbar-mobile-cta" @click="handleCtaClick">{{ ctaText }}</button>
                    </div>
                </slot>
            </div>
        </div>
    </nav>
</template>
