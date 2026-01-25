// Separator Component Types
// ============================================

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorVariant = "solid" | "dashed" | "dotted" | "gradient";
export type SeparatorSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SeparatorSeverity =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warn"
  | "danger"
  | "contrast";

export interface SeparatorProps {
  /** Orientation of the separator */
  orientation?: SeparatorOrientation;
  /** Visual variant/style */
  variant?: SeparatorVariant;
  /** Thickness of the separator */
  size?: SeparatorSize;
  /** Color severity */
  severity?: SeparatorSeverity;
  /** Custom color (overrides severity) */
  color?: string;
  /** Text or content in the middle of the separator */
  label?: string;
  /** Position of the label */
  labelPosition?: "start" | "center" | "end";
  /** Decorative (hides from screen readers) */
  decorative?: boolean;
  /** Custom margin/spacing */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  /** Additional CSS classes */
  class?: any;
}
