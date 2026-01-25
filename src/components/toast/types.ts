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

export interface ToastProps {
  /** Unique identifier for the toast */
  id: string | number;
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
    onClick: (event?: MouseEvent) => void;
  };
  /** Optional array of action buttons */
  actions?: Array<{
    label: string;
    onClick: (event?: MouseEvent) => void;
    icon?: string;
    color?: any;
    variant?: any;
  }>;
  /** Control the sensitivity for accessibility. foreground (user action) or background (system task) */
  type?: "foreground" | "background";
  /** Custom classes */
  class?: any;
}

export interface ToastOptions extends Omit<ToastProps, "id"> {
  id?: string | number;
  position?: ToastPosition;
}

export interface ToastState extends Required<ToastProps> {
  visible: boolean;
}
