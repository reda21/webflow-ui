// Progress Component Types
// ============================================

export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressSeverity =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warn"
  | "danger"
  | "contrast";
export type ProgressVariant = "solid" | "striped" | "gradient";
export type ProgressAnimation =
  | "carousel"
  | "carousel-inverse"
  | "swing"
  | "elastic"
  | "pulse"
  | "striped"
  | "indeterminate"
  | "bounce"
  | "gradient-flow"
  | "glow"
  | "spin"
  | "flash"
  | "scan"
  | "none";
export type ProgressRounded = "none" | "sm" | "md" | "lg" | "full";
export type ProgressOrientation = "horizontal" | "vertical";
export type CircularProgressVariant = "solid" | "gradient" | "dashed";

export interface ProgressProps {
  /** Current progress value (0-100) */
  modelValue?: number | null;
  /** Legacy value prop for backward compatibility */
  value?: number | null;
  /** Maximum value (default: 100) or an array of status labels */
  max?: number | string[];
  /** Orientation of the progress bar */
  orientation?: ProgressOrientation;
  /** Invert the progress direction */
  inverted?: boolean;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Visual severity/color */
  severity?: ProgressSeverity;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Animation type */
  animation?: ProgressAnimation;
  /** Border radius */
  rounded?: ProgressRounded;
  /** Show percentage label */
  showValue?: boolean;
  /** Show status label above the bar (alias for showValue + labelPosition='top') */
  status?: boolean;
  /** Custom label format (receives value and max) */
  formatValue?: (value: number, max: number) => string;
  /** Label position */
  labelPosition?: "inside" | "outside" | "top";
  /** Indeterminate mode (ignores value) */
  indeterminate?: boolean;
  /** Buffer value for buffered progress (like video loading) */
  buffer?: number;
  /** Custom color (overrides severity) */
  color?: string;
  /** Track color */
  trackColor?: string;
  /** Additional CSS classes */
  class?: any;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Number of steps to display (stepper mode) */
  steps?: number;
  /** Show markers for each step */
  showStepMarkers?: boolean;
  /** Duration of the animation in ms (default: 500) */
  transitionDuration?: number;
  /** Label text displayed above the bar */
  label?: string;
  /** Secondary progress value (displayed behind primary) */
  secondaryValue?: number;
  /** Reverse direction (alias for inverted) */
  reverse?: boolean;
  /** Human readable text alternative for value (e.g. "50% complete") */
  ariaValuetext?: string;
  /** ID of the element describing the progress */
  ariaDescribedby?: string;
  /** Live region mode for screen reader announcements */
  ariaLive?: "off" | "polite" | "assertive";
}

export interface CircularProgressProps extends Omit<ProgressProps, "variant"> {
  /** Stroke width */
  strokeWidth?: number;
  /** Show center content */
  showCenter?: boolean;
  /** Visual variant */
  variant?: CircularProgressVariant;
  /** Start angle in degrees (default: -90) */
  startAngle?: number;
  /** End angle in degrees (default: 270) */
  endAngle?: number;
  /** Custom gradient colors (for variant="gradient") */
  gradientColors?: string[];
}

export type ProgressEmits = {
  (e: "update:modelValue", value: number | null): void;
};

export const PROGRESS_SIZES: ProgressSize[] = ["xs", "sm", "md", "lg", "xl"];
export const PROGRESS_SEVERITIES: ProgressSeverity[] = [
  "primary",
  "secondary",
  "success",
  "info",
  "warn",
  "danger",
  "contrast",
];
export const PROGRESS_VARIANTS: ProgressVariant[] = [
  "solid",
  "striped",
  "gradient",
];
export const PROGRESS_ANIMATIONS: ProgressAnimation[] = [
  "carousel",
  "carousel-inverse",
  "swing",
  "elastic",
  "pulse",
  "striped",
  "indeterminate",
  "bounce",
  "gradient-flow",
  "glow",
  "scan",
  "flash",
  "none",
];
