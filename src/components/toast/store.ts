import { ref, reactive, watch } from "vue";
import type { ToastId, ToastPosition, ToastProps, ToastOptions } from "./types";

const STORAGE_KEY = "@webmx/toasts-persistence";

export const toastsState = ref<Record<ToastPosition, ToastProps[]>>({
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
      Object.assign(toastsState.value, parsed);
    } catch (e) {
      console.error("Failed to restore persisted toasts", e);
    }
  }

  watch(
    toastsState,
    (newState) => {
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
