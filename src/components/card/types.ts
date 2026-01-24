// Card Component Types
// ============================================

export type CardVariant =
  | "default"
  | "outlined"
  | "ghost"
  | "glass"
  | "soft"
  | "gradient"
  | "neumorphism"
  | "bordered"
  | "elevated"
  | "minimal";
export type CardShadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";
export type CardPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface CardProps {
  /**
   * Title of the card
   */
  title?: string;
  /**
   * Subtitle of the card
   */
  subtitle?: string;
  /**
   * Variant of the card
   */
  variant?: CardVariant;
  /**
   * Shadow level of the card
   */
  shadow?: CardShadow;
  /**
   * Padding level of the card
   */
  padding?: CardPadding;
  /**
   * URL of the image to display in the header
   */
  image?: string;
  /**
   * Alt text for the card image
   */
  imageAlt?: string;
  /**
   * Whether the card should have a hover animation
   */
  hover?: boolean | "scale" | "raise" | "glow";
  /**
   * Whether the body is scrollable
   */
  scrollable?: boolean;
  /**
   * Custom classes for different sections
   */
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  imageClass?: string;
  /**
   * Loading state with skeleton
   */
  loading?: boolean;
  /**
   * Interactive mode with actions
   */
  interactive?: boolean;
  /**
   * Expandable mode with hidden content
   */
  expandable?: boolean;
  /**
   * Selectable mode with checkbox/radio
   */
  selectable?: boolean;
  /**
   * Draggable by drag & drop
   */
  draggable?: boolean;
  /**
   * Swipe support for mobile actions
   */
  swipeable?: boolean;
  /**
   * Badge or counter in corner
   */
  badge?: string | number;
  /**
   * Progress bar (0-100 or true for indeterminate)
   */
  progress?: boolean | number;
  /**
   * Rating system (0-5 stars)
   */
  rating?: number;
  /**
   * Price display with currency
   */
  price?: number;
  /**
   * Currency for price display
   */
  currency?: string;
  /**
   * Enable flip card animation
   */
  flipable?: boolean;
  /**
   * Images for carousel
   */
  images?: string[];
  /**
   * Enable swipe to dismiss
   */
  swipeToDismiss?: boolean;
  /**
   * Enable pinch to zoom on images
   */
  pinchToZoom?: boolean;
  /**
   * Enable double tap to like/favorite
   */
  doubleTapToLike?: boolean;
  /**
   * Lazy load images
   */
  lazyLoad?: boolean;
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
  /**
   * High contrast mode
   */
  highContrast?: boolean;
  /**
   * Responsive breakpoints
   */
  responsive?: boolean;
}
