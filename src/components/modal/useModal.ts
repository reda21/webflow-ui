import { reactive, h, markRaw } from "vue";
import type { ModalProps } from "./types";
import Modal from "./Modal.vue";

export interface ProgrammaticModal extends ModalProps {
  id: string;
  component?: any;
  props?: any;
  slots?: any;
  onClose?: (result?: any) => void;
}

const state = reactive({
  modals: [] as ProgrammaticModal[],
});

export const useModal = () => {
  const open = (options: Omit<ProgrammaticModal, "id"> & { id?: string }) => {
    const id = options.id || `modal-${Math.random().toString(36).slice(2, 9)}`;
    const modal: ProgrammaticModal = {
      ...options,
      id,
      modelValue: true,
      onClose: (result: any) => {
        options.onClose?.(result);
        close(id);
      },
    };

    state.modals.push(modal);
    return id;
  };

  const close = (id: string) => {
    const index = state.modals.findIndex((m) => m.id === id);
    if (index !== -1) {
      const modal = state.modals[index];
      if (modal) modal.modelValue = false;
      // Emit close result if needed or handle cleanup
      // Delay removal for transition
      setTimeout(() => {
        state.modals = state.modals.filter((m) => m.id !== id);
      }, 500);
    }
  };

  const alert = (options: Omit<ProgrammaticModal, "id"> | string) => {
    const props = typeof options === "string" ? { title: options } : options;
    return open({
      ...props,
      severity: props.severity || "info",
      icon: props.icon ?? true,
      dismissible: true,
    });
  };

  const confirm = (
    options: Omit<ProgrammaticModal, "id"> & {
      onConfirm?: () => void;
      onCancel?: () => void;
    },
  ) => {
    return open({
      ...options,
      severity: options.severity || "warning",
      icon: options.icon ?? true,
      onClose: (result) => {
        if (result === "confirm") options.onConfirm?.();
        else options.onCancel?.();
        options.onClose?.(result);
      },
    });
  };

  return {
    modals: state.modals,
    open,
    close,
    alert,
    confirm,
  };
};
