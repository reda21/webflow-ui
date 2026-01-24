// Modal Component Types
// ============================================
import type { ButtonProps } from "../button/types";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full" | "auto";

export type ModalVariant =
  | "default"
  | "clean"
  | "glass"
  | "bottom-sheet"
  | "neumorphic";

export type ModalSeverity =
  | "default"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type ModalPosition = "center" | "top" | "right" | "bottom" | "left";

export type ModalOverlayVariant = "default" | "blur" | "dim" | "gradient";

export type ModalAnimation = "scale" | "slide" | "fade" | "zoom" | "bounce";

export interface ModalProps {
  // Opening state
  open?: boolean;
  modelValue?: boolean;
  defaultOpen?: boolean;

  // Content
  title?: string;
  description?: string;

  // Appearance
  size?: ModalSize;
  variant?: ModalVariant;
  severity?: ModalSeverity;
  position?: ModalPosition;
  animation?: ModalAnimation;
  loading?: boolean | number;
  loadingColor?: string;
  close?: boolean | (ButtonProps & { class?: any });
  closeIcon?: string;

  overlay?: boolean;
  overlayVariant?: ModalOverlayVariant;
  overlayBlur?: number | string; // blur in px or string
  overlayOpacity?: number; // 0 to 1
  overlayColor?: string;
  modal?: boolean;
  dismissible?: boolean;
  icon?: string | boolean; // custom icon or boolean to toggle auto-icon

  // Behavior
  scrollable?: boolean;
  transition?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  preventScroll?: boolean;
  autoClose?: number; // MS delay

  // Sticky components
  stickyHeader?: boolean;
  stickyFooter?: boolean;

  // Interaction blocking
  loadingBlocking?: boolean;

  // Accessibility
  announcements?: {
    opened?: string;
    closed?: string;
    loading?: string;
    loaded?: string;
    stepChanged?: string;
  };

  // Performance & SSR
  lazy?: boolean;
  unmountOnClose?: boolean;

  // Enhancements
  id?: string;
  draggable?: boolean;
  resizable?: boolean;
  swipeToDismiss?: boolean;
  haptic?: boolean;

  // Multi-step
  step?: number | string;

  // Appearance
  adaptivePadding?: boolean;

  // Customization
  contentClass?: string;
  overlayClass?: string;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;

  /**
   * Deep styling configuration for the modal components.
   * Following the Nuxt UI and Radix Vue pattern.
   */
  ui?: {
    content?: any;
    overlay?: any;
    header?: any;
    body?: any;
    footer?: any;
    close?: any;
    wrapper?: any;
    title?: any;
    description?: any;
  };

  fullscreen?: boolean;
  portal?: string | boolean | HTMLElement;
  content?: any;

  // Accessibility
  role?: "dialog" | "alertdialog";
  ariaLabel?: string;
}

export interface ModalEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "update:open", value: boolean): void;
  (e: "open"): void;
  (e: "close", result?: any): void;
  (e: "close-prevent"): void;
  (e: "after-leave"): void;
  (e: "after-enter"): void;
  (e: "update:step", value: number | string): void;
}
