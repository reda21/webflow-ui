import { inject } from "vue";
import type { ToastOptions } from "./types";

export const useToast = () => {
  const toast = inject<{
    add: (options: ToastOptions) => string | number;
    update: (id: string | number, options: Partial<ToastOptions>) => void;
    remove: (id: string | number) => void;
    dismiss: (id: string | number) => void;
    clear: () => void;
    isActive: (id: string | number) => boolean;
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
     * Update an existing toast
     */
    update: (id: string | number, options: Partial<ToastOptions>) =>
      toast.update(id, options),

    /**
     * Remove a specific toast by its ID
     */
    remove: (id: string | number) => toast.remove(id),

    /**
     * Alias for remove
     */
    dismiss: (id: string | number) => toast.remove(id),

    /**
     * Check if a toast is currently active
     */
    isActive: (id: string | number) => toast.isActive(id),

    /**
     * Remove all active toasts
     */
    clear: () => toast.clear(),

    /**
     * Handle a promise with a toast (loading -> success or error)
     */
    promise: <T>(
      promise: Promise<T>,
      options: {
        loading?: string;
        success?: string | ((data: T) => string);
        error?: string | ((error: any) => string);
      } & Omit<ToastOptions, "severity" | "description">,
    ) => {
      const id = toast.add({
        ...options,
        description: options.loading,
        severity: "info",
        icon: "heroicons:arrow-path",
        duration: 0, // Persist while loading
      } as ToastOptions);

      promise
        .then((data) => {
          const successDesc =
            typeof options.success === "function"
              ? options.success(data)
              : options.success;
          toast.update(id, {
            description: successDesc,
            severity: "success",
            icon: true,
            duration: 5000,
          });
        })
        .catch((err) => {
          const errorDesc =
            typeof options.error === "function"
              ? options.error(err)
              : options.error;
          toast.update(id, {
            description: errorDesc,
            severity: "danger",
            icon: true,
            duration: 5000,
          });
        });

      return promise;
    },

    /**
     * Shortcut for undoable actions
     */
    undo: (
      message: string,
      onUndo: () => void,
      options?: Omit<ToastOptions, "severity" | "description" | "action">,
    ) => {
      return toast.add({
        ...options,
        description: message,
        severity: "contrast",
        action: {
          label: "Annuler",
          onClick: onUndo,
        },
        duration: 8000,
      } as ToastOptions);
    },

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
