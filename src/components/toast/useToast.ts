import { inject } from "vue";
import type { ToastOptions } from "./types";

export const useToast = () => {
  const toast = inject<{
    add: (options: ToastOptions) => string | number;
    remove: (id: string | number) => void;
    clear: () => void;
  }>("toast");

  if (!toast) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    /**
     * Trigger a new toast notification
     */
    add: (options: ToastOptions) => toast.add(options),

    /**
     * Remove a specific toast by its ID
     */
    remove: (id: string | number) => toast.remove(id),

    /**
     * Remove all active toasts
     */
    clear: () => toast.clear(),

    /**
     * Success toast shortcut
     */
    success: (
      title: string,
      description?: string,
      options?: Omit<ToastOptions, "severity" | "title" | "description">,
    ) => {
      return toast.add({ ...options, title, description, severity: "success" });
    },

    /**
     * Error toast shortcut
     */
    error: (
      title: string,
      description?: string,
      options?: Omit<ToastOptions, "severity" | "title" | "description">,
    ) => {
      return toast.add({ ...options, title, description, severity: "danger" });
    },

    /**
     * Info toast shortcut
     */
    info: (
      title: string,
      description?: string,
      options?: Omit<ToastOptions, "severity" | "title" | "description">,
    ) => {
      return toast.add({ ...options, title, description, severity: "info" });
    },

    /**
     * Warning toast shortcut
     */
    warning: (
      title: string,
      description?: string,
      options?: Omit<ToastOptions, "severity" | "title" | "description">,
    ) => {
      return toast.add({ ...options, title, description, severity: "warn" });
    },
  };
};
