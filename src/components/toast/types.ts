// Toast Component Types
// ============================================

export type ToastSeverity =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warn"
  | "warning"
  | "help"
  | "danger"
  | "contrast";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastProviderProps {
  /** Maximum number of toasts visible at once */
  max?: number;
  /** Enable visual stacking of toasts */
  stacked?: boolean;
}

export type ToastId = string | number;
export type SwipeDirection = "up" | "down" | "left" | "right";

export interface SwipeEvent {
  direction: SwipeDirection;
  distanceX: number;
  distanceY: number;
}

export type ToastEmits = {
  close: [id: ToastId];
  "close:prevent": [id: ToastId];
  pause: [];
  resume: [];
  escapeKeyDown: [event: KeyboardEvent];
  swipeStart: [event: TouchEvent];
  swipeMove: [event: TouchEvent];
  swipeCancel: [event: TouchEvent];
  swipeEnd: [event: SwipeEvent];
  "update:open": [value: boolean];
};

export interface ToastProps {
  /** Unique identifier for the toast */
  id: ToastId;
  /** Primary message */
  title?: string;
  /** Secondary detailed message */
  description?: string;
  /** Visual severity level */
  severity?: ToastSeverity;
  /** Custom icon name */
  icon?: string | boolean;
  /** Avatar source URL */
  avatar?: string;
  /** Auto-close duration in MS. Set to 0 to disable. */
  duration?: number;
  /** Progress bar configuration. Set to false to hide. */
  progress?: boolean | { color?: string };
  /** Whether the toast can be closed manually */
  closable?: boolean;
  /** Orientation of the toast content (default: horizontal) */
  orientation?: "horizontal" | "vertical";
  /** Prevents the toast from being closed (both auto and manual) */
  preventClose?: boolean;
  /** Optional action button config */
  action?: {
    label: string;
    onClick: <T = any>(event?: MouseEvent) => T | Promise<T>;
    loading?: boolean;
    autoClose?: boolean;
    retry?: number | { attempts: number; delay?: number };
  };
  /** Optional array of action buttons */
  actions?: Array<{
    label: string;
    onClick: <T = any>(event?: MouseEvent) => T | Promise<T>;
    icon?: string;
    color?: any;
    variant?: any;
    loading?: boolean;
    autoClose?: boolean;
    retry?: number | { attempts: number; delay?: number };
  }>;
  /** Control the sensitivity for accessibility. foreground (user action) or background (system task) */
  type?: "foreground" | "background";
  /** Custom classes */
  class?: any;
  /** Visual variant of the toast */
  variant?: "soft" | "minimal" | "outlined" | "glass";
  /** Entrance animation type */
  animation?: "slide" | "fade" | "scale" | "bounce";
  /** Optional inline image with lazy loading */
  image?: string;
  /** Responsive width of the toast */
  width?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  /** Clickable link with optional preview */
  link?: {
    url: string;
    label?: string;
    target?: string;
    preview?: {
      title?: string;
      description?: string;
      image?: string;
    };
  };
}

export interface ToastOptions extends Omit<ToastProps, "id"> {
  id?: string | number;
  position?: ToastPosition;
}

export interface ToastState extends Required<ToastProps> {
  visible: boolean;
}
