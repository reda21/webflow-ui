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
import { ref, computed, useSlots, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
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
    mobileMenuLabel?: string;
    mobileMenuAriaLabel?: string;
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
    size: 'md',
    mobileMenuLabel: 'Toggle menu',
    mobileMenuAriaLabel: 'Mobile navigation'
})

const emit = defineEmits<NavbarEmits>()
const slots = useSlots()

const isMobileMenuOpen = ref(false)
const mobileMenuRef = ref<HTMLElement | null>(null)
const mobileMenuButtonRef = ref<HTMLButtonElement | null>(null)
const mobileMenuId = `navbar-mobile-menu-${Math.random().toString(36).slice(2, 9)}`

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

const setMobileMenuOpen = (value: boolean) => {
    if (isMobileMenuOpen.value === value) return
    isMobileMenuOpen.value = value
    emit('mobile-menu-toggle', value)
}

const handleNavClick = (item: NavItem, event: MouseEvent) => {
    setMobileMenuOpen(false)
    emit('nav-click', item, event)
}

const handleSearchClick = (event: MouseEvent) => {
    emit('search-click', event)
}

const handleThemeToggle = (event: MouseEvent) => {
    emit('theme-toggle', event)
}

const handleCtaClick = (event: MouseEvent) => {
    setMobileMenuOpen(false)
    emit('cta-click', event)
}

const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen.value)
}

const focusFirstMobileItem = () => {
    nextTick(() => {
        const firstItem = mobileMenuRef.value?.querySelector<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        firstItem?.focus()
    })
}

const handleClickOutside = (event: MouseEvent) => {
    if (!isMobileMenuOpen.value) return
    const target = event.target as Node
    if (mobileMenuRef.value?.contains(target) || mobileMenuButtonRef.value?.contains(target)) return
    setMobileMenuOpen(false)
}

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !isMobileMenuOpen.value) return
    event.stopPropagation()
    setMobileMenuOpen(false)
    mobileMenuButtonRef.value?.focus()
}

watch(isMobileMenuOpen, (isOpen) => {
    if (isOpen) {
        focusFirstMobileItem()
    }
})

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
})

// Expose methods
defineExpose({
    toggleMobileMenu,
    closeMobileMenu: () => { setMobileMenuOpen(false) },
    openMobileMenu: () => { setMobileMenuOpen(true) }
})
</script>

<template>
    <nav :class="navbarClasses">
        <div class="navbar-container">
            <div class="navbar-inner">
                <!-- Custom Layout Mode: Start / Center / End -->
                <template v-if="hasAnyCustomSlot">
                    <!-- Start Section -->
                    <div class="navbar-start">
                        <slot name="start">
                            <!-- Default: Logo -->
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

                    <!-- Center Section -->
                    <div class="navbar-center">
                        <slot name="center">
                            <!-- Default: Navigation or Default Slot Content -->
                            <NavLinks :nav-items="navItems" @nav-click="handleNavClick">
                                <slot />
                            </NavLinks>
                        </slot>
                    </div>

                    <!-- End Section -->
                    <div class="navbar-end">
                        <slot name="end">
                            <!-- Default: Actions -->
                            <div class="navbar-actions">
                                <!-- Search Button -->
                                <button v-if="showSearch" class="navbar-search-btn" @click="handleSearchClick">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span>{{ searchPlaceholder }}</span>
                                    <kbd class="navbar-search-kbd">
                                        <span class="text-xs">⌘</span>K
                                    </kbd>
                                </button>

                                <!-- Theme Toggle -->
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

                                <!-- CTA Button -->
                                <button v-if="ctaText" class="navbar-cta" @click="handleCtaClick">
                                    <slot name="cta">{{ ctaText }}</slot>
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </slot>

                        <!-- Mobile Menu Button (always shown in custom mode) -->
                        <button ref="mobileMenuButtonRef" class="navbar-mobile-btn" :aria-label="mobileMenuLabel"
                            :aria-expanded="isMobileMenuOpen" :aria-controls="mobileMenuId"
                            @click="toggleMobileMenu">
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
                </template>

                <!-- Default Layout Mode (backward compatible) -->
                <template v-else>
                    <!-- Logo -->
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

                    <!-- Desktop Navigation -->
                    <slot name="nav">
                        <NavLinks :nav-items="navItems" @nav-click="handleNavClick">
                            <slot />
                        </NavLinks>
                    </slot>

                    <!-- Right Actions -->
                    <div class="navbar-actions">
                        <!-- Search Button -->
                        <button v-if="showSearch" class="navbar-search-btn" @click="handleSearchClick">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>{{ searchPlaceholder }}</span>
                            <kbd class="navbar-search-kbd">
                                <span class="text-xs">⌘</span>K
                            </kbd>
                        </button>

                        <!-- Theme Toggle -->
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

                        <!-- CTA Button -->
                        <button v-if="ctaText" class="navbar-cta" @click="handleCtaClick">
                            <slot name="cta">{{ ctaText }}</slot>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>

                        <!-- Mobile Menu Button -->
                        <button ref="mobileMenuButtonRef" class="navbar-mobile-btn" :aria-label="mobileMenuLabel"
                            :aria-expanded="isMobileMenuOpen" :aria-controls="mobileMenuId"
                            @click="toggleMobileMenu">
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
                </template>
            </div>
        </div>

        <!-- Mobile Menu -->
        <Transition name="navbar-mobile">
            <div v-if="isMobileMenuOpen" :id="mobileMenuId" ref="mobileMenuRef" class="navbar-mobile-menu"
                role="navigation" :aria-label="mobileMenuAriaLabel">
                <div class="navbar-mobile-menu-inner">
                    <slot name="mobile">
                        <slot name="mobile-nav">
                            <slot name="mobile-nav-items">
                                <a v-for="item in navItems" :key="item.label" :href="item.href"
                                    class="navbar-mobile-nav-item"
                                    :class="{ 'navbar-mobile-nav-item--active': item.active }"
                                    :aria-current="item.active ? 'page' : undefined"
                                    :target="item.external ? '_blank' : undefined"
                                    :rel="item.external ? 'noopener noreferrer' : undefined"
                                    @click="handleNavClick(item, $event)">
                                    <Icon v-if="item.icon" :name="item.icon" size="sm" class="mr-2" />
                                    {{ item.label }}
                                    <span v-if="item.badge" class="navbar-nav-item-badge ml-auto">{{ item.badge
                                        }}</span>
                                </a>
                            </slot>
                        </slot>

                        <div v-if="ctaText" class="navbar-mobile-cta-wrapper">
                            <button class="navbar-mobile-cta" @click="handleCtaClick">
                                {{ ctaText }}
                            </button>
                        </div>
                    </slot>
                </div>
            </div>
        </Transition>
    </nav>
</template>
