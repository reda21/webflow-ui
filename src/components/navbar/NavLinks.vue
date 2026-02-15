<script setup lang="ts">
/**
 * NavLinks Component
 * 
 * A component to render a list of navigation items with dropdown support.
 */
import { ref, computed } from 'vue'
import type { NavItem, MegaMenuContent } from './types'
import Icon from '../icon/Icon.vue'

interface NavLinksProps {
    /** Navigation items to display */
    navItems?: NavItem[]
    /** Custom class for the nav wrapper */
    class?: string
}

const props = withDefaults(defineProps<NavLinksProps>(), {
    navItems: () => []
})

const emit = defineEmits<{
    (e: 'nav-click', item: NavItem, event: MouseEvent): void
}>()

const activeDropdown = ref<string | null>(null)

const handleNavClick = (item: NavItem, event: MouseEvent) => {
    emit('nav-click', item, event)
}

const toggleDropdown = (item: NavItem) => {
    if (activeDropdown.value === item.label) {
        activeDropdown.value = null
    } else {
        activeDropdown.value = item.label
    }
}

const closeDropdown = () => {
    activeDropdown.value = null
}

const hasChildren = (item: NavItem) => {
    return item.children && item.children.length > 0
}

const isMegaMenu = (item: NavItem) => {
    return item.isMegaMenu || item.megaMenuContent
}
</script>

<template>
    <div :class="['navbar-nav', $props.class]">
        <slot>
            <div 
                v-for="item in navItems" 
                :key="item.label" 
                class="navbar-nav-item-wrapper"
                @mouseenter="hasChildren(item) && (activeDropdown = item.label)"
                @mouseleave="hasChildren(item) && (activeDropdown = null)"
            >
                <a 
                    v-if="!hasChildren(item) && !isMegaMenu(item)" 
                    :href="item.href"
                    class="navbar-nav-item inline-flex items-center gap-2"
                    :class="{ 'navbar-nav-item--active': item.active }" 
                    :target="item.external ? '_blank' : undefined"
                    :rel="item.external ? 'noopener noreferrer' : undefined" 
                    @click="handleNavClick(item, $event)"
                >
                    <Icon v-if="item.icon" :name="item.icon" size="sm" class="shrink-0" />
                    <span>{{ item.label }}</span>
                    <span v-if="item.badge" class="navbar-nav-item-badge">{{ item.badge }}</span>
                    <svg v-if="item.external" class="navbar-nav-item-external" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>

                <button 
                    v-else
                    class="navbar-nav-item navbar-nav-item--dropdown inline-flex items-center gap-2"
                    :class="{ 'navbar-nav-item--active': item.active }"
                    :aria-expanded="activeDropdown === item.label"
                    :aria-haspopup="isMegaMenu(item) ? false : 'true'"
                    @click="toggleDropdown(item)"
                >
                    <Icon v-if="item.icon" :name="item.icon" size="sm" class="shrink-0" />
                    <span>{{ item.label }}</span>
                    <span v-if="item.badge" class="navbar-nav-item-badge">{{ item.badge }}</span>
                    <svg class="navbar-nav-item-chevron" :class="{ 'navbar-nav-item-chevron--open': activeDropdown === item.label }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <!-- Dropdown Menu -->
                <div 
                    v-if="hasChildren(item) && !isMegaMenu(item)" 
                    v-show="activeDropdown === item.label"
                    class="navbar-dropdown"
                    role="menu"
                >
                    <div class="navbar-dropdown-inner">
                        <a 
                            v-for="child in item.children" 
                            :key="child.label"
                            :href="child.href"
                            class="navbar-dropdown-item"
                            :class="{ 'navbar-dropdown-item--active': child.active }"
                            :target="child.external ? '_blank' : undefined"
                            :rel="child.external ? 'noopener noreferrer' : undefined"
                            role="menuitem"
                            @click="handleNavClick(child, $event)"
                        >
                            <Icon v-if="child.icon" :name="child.icon" size="sm" class="shrink-0" />
                            <div class="navbar-dropdown-item-content">
                                <span class="navbar-dropdown-item-label">{{ child.label }}</span>
                            </div>
                            <span v-if="child.badge" class="navbar-dropdown-item-badge">{{ child.badge }}</span>
                        </a>
                    </div>
                </div>

                <!-- Mega Menu -->
                <div 
                    v-if="isMegaMenu(item)" 
                    v-show="activeDropdown === item.label"
                    class="navbar-megamenu"
                    role="menu"
                >
                    <div class="navbar-megamenu-inner">
                        <div class="navbar-megamenu-grid">
                            <div v-if="item.megaMenuContent?.columns" class="navbar-megamenu-columns">
                                <div 
                                    v-for="(column, colIndex) in item.megaMenuContent.columns" 
                                    :key="colIndex"
                                    class="navbar-megamenu-column"
                                >
                                    <h4 v-if="column.title" class="navbar-megamenu-column-title">{{ column.title }}</h4>
                                    <a 
                                        v-for="colItem in column.items" 
                                        :key="colItem.label"
                                        :href="colItem.href"
                                        class="navbar-megamenu-item"
                                        :class="{ 'navbar-megamenu-item--active': colItem.active }"
                                        role="menuitem"
                                        @click="handleNavClick(colItem, $event)"
                                    >
                                        <Icon v-if="colItem.icon" :name="colItem.icon" size="sm" class="shrink-0" />
                                        <span>{{ colItem.label }}</span>
                                        <span v-if="colItem.badge" class="navbar-megamenu-item-badge">{{ colItem.badge }}</span>
                                    </a>
                                </div>
                            </div>
                            <div v-if="item.megaMenuContent?.featured" class="navbar-megamenu-featured">
                                <a :href="item.megaMenuContent.featured.href" class="navbar-megamenu-featured-link">
                                    <div class="navbar-megamenu-featured-icon">
                                        <Icon v-if="item.megaMenuContent.featured.icon" :name="item.megaMenuContent.featured.icon" size="lg" />
                                        <svg v-else fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span class="navbar-megamenu-featured-label">{{ item.megaMenuContent.featured.label }}</span>
                                </a>
                                <a v-if="item.megaMenuContent?.cta" :href="item.megaMenuContent.cta.href" class="navbar-megamenu-cta">
                                    {{ item.megaMenuContent.cta.label }}
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </slot>
    </div>
</template>
