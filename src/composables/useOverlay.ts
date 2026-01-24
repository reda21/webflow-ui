import { type Component, shallowRef, markRaw, reactive } from "vue";

export interface OverlayInstance {
  id: string;
  component: Component;
  props: Record<string, any>;
  resolve?: (value: any) => void;
  reject?: (reason?: any) => void;
}

// Global state for overlays
const overlays = shallowRef<OverlayInstance[]>([]);

export function useOverlay() {
  /**
   * Internal method to close an overlay by ID and resolve the promise.
   */
  const _close = (id: string, result?: any) => {
    const instance = overlays.value.find((o) => o.id === id);
    if (instance) {
      if (instance.resolve) instance.resolve(result);
      overlays.value = overlays.value.filter((o) => o.id !== id);
    }
  };

  /**
   * Opens a component in the overlay layer.
   * @param component The component to render
   * @param props Props to pass to the component
   * @returns A promise that resolves when the component emits a 'close' event
   */
  const open = <T = any>(
    component: Component,
    props: Record<string, any> = {},
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2, 9);
      overlays.value = [
        ...overlays.value,
        {
          id,
          component: markRaw(component),
          props: reactive({ ...props }),
          resolve,
          reject,
        },
      ];
    });
  };

  /**
   * Creates a controller for a specific component to manage its lifecycle.
   */
  const create = (component: Component) => {
    let currentId: string | null = null;

    return {
      open: <T = any>(props: Record<string, any> = {}) => {
        const id = Math.random().toString(36).substring(2, 9);
        currentId = id;

        let resolvePromise: (value: T) => void;
        let rejectPromise: (reason?: any) => void;

        const result = new Promise<T>((res, rej) => {
          resolvePromise = res;
          rejectPromise = rej;
        });

        overlays.value = [
          ...overlays.value,
          {
            id,
            component: markRaw(component),
            props: reactive({ ...props }),
            resolve: resolvePromise!,
            reject: rejectPromise!,
          },
        ];

        return {
          result,
        };
      },
      patch: (props: Record<string, any>) => {
        if (!currentId) return;
        const instance = overlays.value.find((o) => o.id === currentId);
        if (instance) {
          // Since we used reactive() for props, we can update it directly
          Object.assign(instance.props, props);
        }
      },
      close: (result?: any) => {
        if (currentId) {
          _close(currentId, result);
        }
      },
    };
  };

  // We expose overlays and _close for the OverlayProvider
  return {
    open,
    create,
    overlays,
    _close,
  };
}
