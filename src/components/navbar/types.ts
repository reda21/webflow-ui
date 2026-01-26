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
}

export interface NavbarProps {
  /** Brand/company name displayed in the navbar */
  brandName?: string;
  /** URL the logo links to */
  logoHref?: string;
  /** Navigation items to display */
  navItems?: NavItem[];
  /** Whether to show the search button */
  showSearch?: boolean;
  /** Whether to show the theme toggle button */
  showThemeToggle?: boolean;
  /** Current dark mode state */
  isDark?: boolean;
  /** Call-to-action button text (hidden if empty) */
  ctaText?: string;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Whether the navbar is sticky */
  sticky?: boolean;
  /** Whether to show backdrop blur effect */
  blur?: boolean;
  /** Whether the navbar is transparent (no background) */
  transparent?: boolean;
  /** Navbar variant */
  variant?: "default" | "minimal" | "centered" | "expanded";
  /** Navbar size */
  size?: "sm" | "md" | "lg";
}

export interface NavbarEmits {
  /** Emitted when the logo is clicked */
  (e: "logo-click", event: MouseEvent): void;
  /** Emitted when a navigation item is clicked */
  (e: "nav-click", item: NavItem, event: MouseEvent): void;
  /** Emitted when the search button is clicked */
  (e: "search-click", event: MouseEvent): void;
  /** Emitted when the theme toggle button is clicked */
  (e: "theme-toggle", event: MouseEvent): void;
  /** Emitted when the CTA button is clicked */
  (e: "cta-click", event: MouseEvent): void;
  /** Emitted when mobile menu state changes */
  (e: "mobile-menu-toggle", isOpen: boolean): void;
}
