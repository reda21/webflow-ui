import { inject } from "vue";

export interface WebmxConfig {
  toast?: {
    position?:
      | "top-right"
      | "top-left"
      | "bottom-right"
      | "bottom-left"
      | "top-center"
      | "bottom-center";
    duration?: number;
    severity?:
      | "primary"
      | "secondary"
      | "success"
      | "info"
      | "warn"
      | "warning"
      | "help"
      | "danger"
      | "contrast";
    closable?: boolean;
    progress?: boolean | { color?: string };
    orientation?: "horizontal" | "vertical";
    variant?: "soft" | "minimal" | "outlined" | "glass";
    animation?: "slide" | "fade" | "scale" | "bounce";
  };
  toaster?: {
    max?: number;
  };
}

const DEFAULT_CONFIG: WebmxConfig = {
  toast: {
    position: "top-right",
    duration: 5000,
    severity: "contrast",
    closable: true,
    progress: true,
    orientation: "horizontal",
  },
  toaster: {
    max: 5,
  },
};

export const useWebmxConfig = () => {
  return inject<WebmxConfig>("webmx-config", DEFAULT_CONFIG);
};
