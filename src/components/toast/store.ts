import { ref, reactive, watch } from "vue";
import type { ToastId, ToastPosition, ToastProps, ToastOptions } from "./types";

const STORAGE_KEY = "@webmx/toasts-persistence";

export const toastsState = reactive<Record<ToastPosition, ToastProps[]>>({
  "top-right": [],
  "top-left": [],
  "bottom-right": [],
  "bottom-left": [],
  "top-center": [],
  "bottom-center": [],
});

// Persistence logic
export const initPersistence = () => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Only restore toasts that have a specific flag or are marked for persistence
      // For now, let's allow general persistence if needed, but usually it's for specific toasts
      // We'll just load them all for now if they exist
      Object.assign(toastsState, parsed);
    } catch (e) {
      console.error("Failed to restore persisted toasts", e);
    }
  }

  watch(
    toastsState,
    (newState) => {
      // We might want to filter only "important" toasts for persistence
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    },
    { deep: true },
  );
};

export const useToastsStore = () => {
  return {
    toasts: toastsState,
  };
};
