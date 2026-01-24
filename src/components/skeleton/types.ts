// Skeleton Component Types
// ============================================

export type SkeletonAnimation = "pulse" | "wave" | "none";
export type SkeletonVariant = "rectangle" | "circle" | "rounded" | "line";

export interface SkeletonProps {
  /**
   * The animation style
   */
  animation?: SkeletonAnimation;
  /**
   * The shape of the skeleton
   */
  variant?: SkeletonVariant;
  /**
   * Custom width
   */
  width?: string | number;
  /**
   * Custom height
   */
  height?: string | number;
  /**
   * Border radius for rounded variants
   */
  radius?: string | number;
  /**
   * Custom classes
   */
  class?: any;
  /**
   * The element or component this component should render as.
   * @default 'div'
   */
  as?: any;
  /**
   * Custom background color
   */
  color?: string;
  /**
   * Custom shine color (for wave animation)
   */
  shineColor?: string;
  /**
   * Enable outer glow effect
   */
  glow?: boolean;
  /**
   * Apply a gradient background
   */
  gradient?: string | boolean;
  /**
   * Screen reader text to announce via aria-live
   */
  loadingText?: string;
  /**
   * Aria-live mode for announcements
   * @default 'polite'
   */
  ariaLive?: "polite" | "assertive" | "off";
}
