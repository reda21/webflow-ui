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
  /** Whether to show the progress bar (default: true when duration > 0) */
  showProgress?: boolean;
  /** Whether the toast can be closed manually */
  closable?: boolean;
  /** Prevents the toast from being closed (both auto and manual) */
  preventClose?: boolean;
  /** Optional action button config */
  action?: {
    label: string;
    onClick: () => void;
  };
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
