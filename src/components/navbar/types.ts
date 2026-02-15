/**
 * Navbar Component Types
 */

export interface NavItem {
  /** Display label for the navigation item */
  label: string;
  /** URL or route path */
  href: string;
  /** Whether this item is currently active */
  active?: boolean;
  /** Optional icon name (iconify format) */
  icon?: string;
  /** Whether to show external link indicator */
  external?: boolean;
  /** Custom badge or notification count */
  badge?: string | number;
  /** Child items for dropdown menus */
  children?: NavItem[];
  /** Whether this item opens a mega menu */
  isMegaMenu?: boolean;
  /** Mega menu content (if isMegaMenu is true) */
  megaMenuContent?: MegaMenuContent;
}

export interface MegaMenuContent {
  /** Columns configuration */
  columns?: MegaMenuColumn[];
  /** Featured item (larger) */
  featured?: NavItem;
  /** Call to action */
  cta?: {
    label: string;
    href: string;
  };
}

export interface MegaMenuColumn {
  /** Column title */
  title?: string;
  /** Items in this column */
  items: NavItem[];
}

export type NavbarVariant = "default" | "minimal" | "centered" | "expanded";
export type NavbarSize = "sm" | "md" | "lg";
export type SearchType = "button" | "input" | "modal";

export interface NavbarProps {
  /** Brand/company name displayed in the navbar */
  brandName?: string;
  /** URL the logo links to */
  logoHref?: string;
  /** Navigation items to display */
  navItems?: NavItem[];
  /** Whether to show the search button */
  showSearch?: boolean;
  /** Search input type: 'button' | 'input' | 'modal' */
  searchType?: SearchType;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Search results to display */
  searchResults?: { label: string; href: string; icon?: string }[];
  /** Whether search is loading */
  searchLoading?: boolean;
  /** Whether to show the theme toggle button */
  showThemeToggle?: boolean;
  /** Current dark mode state */
  isDark?: boolean;
  /** Call-to-action button text (hidden if empty) */
  ctaText?: string;
  /** Whether the navbar is sticky */
  sticky?: boolean;
  /** Whether to show backdrop blur effect */
  blur?: boolean;
  /** Whether the navbar is transparent (no background) */
  transparent?: boolean;
  /** Navbar variant */
  variant?: NavbarVariant;
  /** Navbar size */
  size?: NavbarSize;
  /** Shrink navbar on scroll */
  shrinkOnScroll?: boolean;
  /** Scroll threshold for shrink effect */
  shrinkThreshold?: number;
  /** Auto-detect active route */
  autoActiveRoute?: boolean;
  /** Current path for active route detection */
  currentPath?: string;
  /** User avatar URL */
  userAvatar?: string;
  /** User name */
  userName?: string;
  /** User menu items */
  userMenuItems?: { label: string; href: string; icon?: string; action?: string }[];
  /** Whether to show user menu */
  showUserMenu?: boolean;
  /** Whether to show notifications */
  showNotifications?: boolean;
  /** Notifications count */
  notificationsCount?: number;
}

export interface NavbarEmits {
  /** Emitted when the logo is clicked */
  (e: "logo-click", event: MouseEvent): void;
  /** Emitted when a navigation item is clicked */
  (e: "nav-click", item: NavItem, event: MouseEvent): void;
  /** Emitted when the search button is clicked */
  (e: "search-click", event: MouseEvent): void;
  /** Emitted when search input changes */
  (e: "search-input", query: string): void;
  /** Emitted when a search result is clicked */
  (e: "search-result-click", result: { label: string; href: string }): void;
  /** Emitted when the theme toggle button is clicked */
  (e: "theme-toggle", event: MouseEvent): void;
  /** Emitted when the CTA button is clicked */
  (e: "cta-click", event: MouseEvent): void;
  /** Emitted when mobile menu state changes */
  (e: "mobile-menu-toggle", isOpen: boolean): void;
  /** Emitted on scroll */
  (e: "scroll", scrollY: number, isScrolled: boolean): void;
  /** Emitted when user is clicked */
  (e: "user-click", event: MouseEvent): void;
  /** Emitted when a user menu item is clicked */
  (e: "user-menu-click", item: { label: string; href: string; action?: string }): void;
  /** Emitted when notifications button is clicked */
  (e: "notifications-click", event: MouseEvent): void;
}

export type NavLogoMode = "icon" | "text" | "both";

export interface NavLogoProps {
  /** Display mode: 'icon', 'text', or 'both' */
  mode?: NavLogoMode;
  /** Brand/company name */
  text?: string;
  /** Icon name (iconify format) or URL for image */
  icon?: string;
  /** Whether the icon is an image URL */
  isImage?: boolean;
  /** Alt text for image */
  alt?: string;
  /** URL the logo links to */
  href?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Custom gradient colors for icon background */
  gradientFrom?: string;
  /** Custom gradient colors for icon background */
  gradientTo?: string;
  /** Whether to show gradient background on icon */
  showIconBg?: boolean;
  /** Icon background variant */
  iconVariant?: "gradient" | "solid" | "soft" | "none";
  /** Icon background color (for solid/soft variants) */
  iconColor?: string;
}
