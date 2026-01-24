// Modal Component Types
// ============================================
import type { ButtonProps } from "../button/types";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full" | "auto";

export type ModalVariant = "default" | "clean" | "glass";

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
  close?: boolean | (ButtonProps & { class?: any });
  closeIcon?: string;

  overlay?: boolean;
  modal?: boolean;
  dismissible?: boolean;

  // Behavior
  scrollable?: boolean;
  transition?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  preventScroll?: boolean;

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
}
