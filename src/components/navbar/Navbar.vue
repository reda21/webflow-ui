<script setup lang="ts">
/**
 * Navbar Component
 * 
 * A premium, responsive navigation bar with modern aesthetics.
 * Features: 
 * - Customizable sections: start, center, end
 * - Logo, navigation links, search, theme toggle, CTA
 * - Mobile responsive menu
 * - Dropdown and mega menu support
 * - Scroll behavior (shrink on scroll)
 * - Active route detection
 */
import { ref, computed, useSlots, onMounted, onUnmounted } from 'vue'
import Icon from '../icon/Icon.vue'
import NavLinks from './NavLinks.vue'
import Drawer from '../drawer/Drawer.vue'
import './navbar.css'

export interface NavItem {
    label: string;
    href: string;
    active?: boolean;
    icon?: string;
    external?: boolean;
    badge?: string | number;
    children?: NavItem[];
    isMegaMenu?: boolean;
    megaMenuContent?: {
        columns?: { title?: string; items: NavItem[] }[];
        featured?: NavItem;
        cta?: { label: string; href: string };
    };
}

export interface NavbarEmits {
    (e: "logo-click", event: MouseEvent): void;
    (e: "nav-click", item: NavItem, event: MouseEvent): void;
    (e: "search-click", event: MouseEvent): void;
    (e: "search-input", query: string): void;
    (e: "search-result-click", result: { label: string; href: string }): void;
    (e: "theme-toggle", event: MouseEvent): void;
    (e: "cta-click", event: MouseEvent): void;
    (e: "mobile-menu-toggle", isOpen: boolean): void;
    (e: "scroll", scrollY: number, isScrolled: boolean): void;
    (e: "user-click", event: MouseEvent): void;
    (e: "user-menu-click", item: { label: string; href: string; action?: string }): void;
    (e: "notifications-click", event: MouseEvent): void;
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
    shrinkOnScroll?: boolean;
    shrinkThreshold?: number;
    autoActiveRoute?: boolean;
    currentPath?: string;
    searchType?: "button" | "input" | "modal";
    searchResults?: { label: string; href: string; icon?: string }[];
    searchLoading?: boolean;
    userAvatar?: string;
    userName?: string;
    userMenuItems?: { label: string; href: string; icon?: string; action?: string }[];
    notificationsCount?: number;
    showUserMenu?: boolean;
    showNotifications?: boolean;
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
    shrinkOnScroll: false,
    shrinkThreshold: 50,
    autoActiveRoute: false,
    currentPath: '',
    searchType: 'button',
    searchResults: () => [],
    searchLoading: false,
    userAvatar: '',
    userName: '',
    userMenuItems: () => [],
    notificationsCount: 0,
    showUserMenu: false,
    showNotifications: false
})

const emit = defineEmits<NavbarEmits>()
const slots = useSlots()

const isMobileMenuOpen = ref(false)
const scrollY = ref(0)
const isScrolled = ref(false)
const searchQuery = ref('')
const isSearchOpen = ref(false)
const isUserMenuOpen = ref(false)
const isNotificationsOpen = ref(false)

// Auto active route support
const processedNavItems = computed(() => {
    if (!props.autoActiveRoute || !props.currentPath) {
        return props.navItems
    }

    return props.navItems.map(item => ({
        ...item,
        active: item.href === props.currentPath || item.href === props.currentPath + '/',
        children: item.children?.map(child => ({
            ...child,
            active: child.href === props.currentPath || child.href === props.currentPath + '/'
        }))
    }))
})

// Scroll handler
const handleScroll = () => {
    scrollY.value = window.scrollY
    isScrolled.value = scrollY.value > props.shrinkThreshold
    emit('scroll', scrollY.value, isScrolled.value)
}

// Lifecycle
onMounted(() => {
    if (props.shrinkOnScroll || props.autoActiveRoute) {
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
    }
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

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
        'navbar--transparent': props.transparent,
        'navbar--shrunk': props.shrinkOnScroll && isScrolled.value
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

const handleSearchInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    searchQuery.value = target.value
    emit('search-input', searchQuery.value)
}

const handleSearchResultClick = (result: { label: string; href: string }) => {
    isSearchOpen.value = false
    searchQuery.value = ''
    emit('search-result-click', result)
}

const toggleSearch = () => {
    if (props.searchType === 'modal') {
        isSearchOpen.value = !isSearchOpen.value
    } else {
        handleSearchClick(new MouseEvent('click'))
    }
}

const closeSearch = () => {
    isSearchOpen.value = false
    searchQuery.value = ''
}

const handleThemeToggle = (event: MouseEvent) => {
    emit('theme-toggle', event)
}

const handleCtaClick = (event: MouseEvent) => {
    isMobileMenuOpen.value = false
    emit('cta-click', event)
}

const handleUserClick = (event: MouseEvent) => {
    emit('user-click', event)
}

const handleUserMenuClick = (item: { label: string; href: string; action?: string }) => {
    isUserMenuOpen.value = false
    emit('user-menu-click', item)
}

const handleNotificationsClick = (event: MouseEvent) => {
    isNotificationsOpen.value = !isNotificationsOpen.value
    emit('notifications-click', event)
}

const closeAllMenus = () => {
    isUserMenuOpen.value = false
    isNotificationsOpen.value = false
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
                        <NavLinks :nav-items="processedNavItems" @nav-click="handleNavClick" />
                    </slot>
                </div>

                <div class="navbar-end">
                    <slot name="end">
                        <div class="navbar-actions">
                            <!-- Search Input -->
                            <div v-if="showSearch && searchType === 'input'" class="navbar-search-wrapper">
                                <div class="navbar-search-input-container">
                                    <svg class="navbar-search-input-icon" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input type="text" class="navbar-search-input" :placeholder="searchPlaceholder"
                                        v-model="searchQuery" @input="handleSearchInput" />
                                    <kbd class="navbar-search-kbd"><span class="text-xs">⌘</span>K</kbd>
                                </div>
                            </div>

                            <!-- Search Button (default) -->
                            <button v-else-if="showSearch" class="navbar-search-btn" @click="toggleSearch">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>{{ searchPlaceholder }}</span>
                                <kbd class="navbar-search-kbd"><span class="text-xs">⌘</span>K</kbd>
                            </button>

                            <!-- Notifications -->
                            <div v-if="showNotifications" class="navbar-notifications-wrapper">
                                <button class="navbar-notifications-btn" aria-label="Notifications"
                                    @click="handleNotificationsClick">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span v-if="notificationsCount > 0" class="navbar-notifications-badge">{{
                                        notificationsCount }}</span>
                                </button>
                                <div v-if="isNotificationsOpen" class="navbar-notifications-dropdown">
                                    <div class="navbar-notifications-header">
                                        <span>Notifications</span>
                                        <button class="navbar-notifications-mark-read">Mark all read</button>
                                    </div>
                                    <slot name="notifications-content">
                                        <div class="navbar-notifications-empty">No new notifications</div>
                                    </slot>
                                </div>
                            </div>

                            <!-- User Menu -->
                            <div v-if="showUserMenu" class="navbar-user-wrapper" @click.stop>
                                <button class="navbar-user-btn" @click="isUserMenuOpen = !isUserMenuOpen"
                                    :aria-expanded="isUserMenuOpen">
                                    <img v-if="userAvatar" :src="userAvatar" :alt="userName"
                                        class="navbar-user-avatar" />
                                    <div v-else class="navbar-user-avatar navbar-user-avatar--placeholder">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span v-if="userName" class="navbar-user-name">{{ userName }}</span>
                                    <svg class="navbar-user-chevron"
                                        :class="{ 'navbar-user-chevron--open': isUserMenuOpen }" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div v-if="isUserMenuOpen" class="navbar-user-dropdown" role="menu">
                                    <slot name="user-menu">
                                        <a v-for="item in userMenuItems" :key="item.label" :href="item.href"
                                            class="navbar-user-dropdown-item" role="menuitem"
                                            @click="handleUserMenuClick(item)">
                                            <Icon v-if="item.icon" :name="item.icon" size="sm" />
                                            {{ item.label }}
                                        </a>
                                    </slot>
                                </div>
                            </div>

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

        <!-- Search Modal -->
        <Teleport to="body">
            <div v-if="showSearch && searchType === 'modal' && isSearchOpen" class="navbar-search-modal-overlay"
                @click="closeSearch">
                <div class="navbar-search-modal" @click.stop role="dialog" aria-modal="true"
                    :aria-label="searchPlaceholder">
                    <div class="navbar-search-modal-header">
                        <svg class="navbar-search-modal-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" class="navbar-search-modal-input" :placeholder="searchPlaceholder"
                            v-model="searchQuery" @input="handleSearchInput" autofocus />
                        <button class="navbar-search-modal-close" @click="closeSearch">
                            <kbd>ESC</kbd>
                        </button>
                    </div>
                    <div class="navbar-search-modal-body">
                        <div v-if="searchLoading" class="navbar-search-modal-loading">
                            <div class="navbar-search-modal-spinner"></div>
                            <span>Searching...</span>
                        </div>
                        <div v-else-if="searchResults.length > 0" class="navbar-search-modal-results">
                            <button v-for="result in searchResults" :key="result.label"
                                class="navbar-search-modal-result" @click="handleSearchResultClick(result)">
                                <Icon v-if="result.icon" :name="result.icon" size="sm" />
                                <span>{{ result.label }}</span>
                            </button>
                        </div>
                        <slot name="search-content"></slot>
                    </div>
                </div>
            </div>
        </Teleport>

        <Drawer v-model="isMobileMenuOpen" placement="left" :show-pull-indicator="true" variant="default" portal="body"
            class="navbar-mobile-drawer" body-class="navbar-mobile-drawer-body"
            @close="() => emit('mobile-menu-toggle', false)">
            <div class="navbar-mobile-menu-inner">
                <slot name="mobile">
                    <slot name="mobile-nav">
                        <slot name="mobile-nav-items">
                            <a v-for="item in processedNavItems" :key="item.label" :href="item.href"
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
        </Drawer>
    </nav>
</template>
