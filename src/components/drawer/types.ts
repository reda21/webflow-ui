// Drawer Component Types
// ============================================

export type DrawerPlacement = "left" | "right" | "top" | "bottom";

export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | string;

export type DrawerVariant = "default" | "glass" | "minimal" | "bordered" | "elevated" | "neumorphic";

export type DrawerOverlay = "default" | "blur" | "dim" | "none";

export type DrawerTransition = "slide" | "fade" | "scale" | "spring";

export interface DrawerSnapPoint {
  /** Size value (px, rem, %) */
  size: string;
  /** Label for the snap point */
  label?: string;
}

export interface DrawerProps {
  /** Whether the drawer is open */
  open?: boolean;
  /** v-model binding for open state */
  modelValue?: boolean;

  /** Title text displayed in the header */
  title?: string;
  /** Description text displayed below the title */
  description?: string;

  /** Side from which the drawer slides in */
  placement?: DrawerPlacement;
  /** Width/height of the drawer (predefined or custom) */
  size?: DrawerSize;
  /** Visual variant */
  variant?: DrawerVariant;

  /** Show close button */
  closable?: boolean;
  /** Icon for the close button */
  closeIcon?: string;
  /** Close on overlay click */
  closeOnOutsideClick?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Show confirm dialog before closing */
  closeConfirm?: boolean;
  /** Confirm message for close */
  closeConfirmMessage?: string;

  /** Overlay style */
  overlay?: boolean;
  overlayVariant?: DrawerOverlay;
  /** Overlay blur amount in px */
  overlayBlur?: number | string;
  /** Overlay opacity (0–1) */
  overlayOpacity?: number;

  /** Prevent body scroll when open */
  preventScroll?: boolean;
  /** Render lazily (only mount content when first opened) */
  lazy?: boolean;
  /** Unmount content when closed */
  unmountOnClose?: boolean;

  /** Show a loading indicator */
  loading?: boolean;

  /** Custom class for the drawer panel */
  contentClass?: string;
  /** Custom class for the overlay */
  overlayClass?: string;
  /** Custom class for the header */
  headerClass?: string;
  /** Custom class for the body */
  bodyClass?: string;
  /** Custom class for the footer */
  footerClass?: string;

  /** Teleport target */
  portal?: string | boolean | HTMLElement;

  /** ARIA label */
  ariaLabel?: string;

  /** Enable swipe to close on touch devices */
  swipeToClose?: boolean;
  /** Swipe threshold in pixels */
  swipeThreshold?: number;

  /** Enable drag to resize */
  resizable?: boolean;
  /** Minimum size for resize (px) */
  minSize?: number;
  /** Maximum size for resize (px) */
  maxSize?: number;
  /** Snap points for resize */
  snapPoints?: DrawerSnapPoint[];

  /** Show pull indicator */
  showPullIndicator?: boolean;

  /** Custom transition type */
  transitionType?: DrawerTransition;
  /** Custom transition duration */
  transitionDuration?: number;

  /** Persistent mode (no overlay, stays open) */
  persistent?: boolean;
  /** Mini mode (collapsed with icons only) */
  mini?: boolean;
  /** Auto close timer (ms) */
  autoClose?: number;

  /** Restore focus on close */
  restoreFocus?: boolean;
  /** Previously focused element */
  restoreFocusTarget?: string;
}

export interface DrawerEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "update:open", value: boolean): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "after-enter"): void;
  (e: "after-leave"): void;
  (e: "resize", size: number): void;
  (e: "confirm-close"): void;
  (e: "cancel-close"): void;
}
