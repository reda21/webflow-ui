
import { type Component, shallowRef, markRaw } from 'vue'

export interface OverlayInstance {
  id: string
  component: Component
  props: Record<string, any>
  resolve?: (value: any) => void
  reject?: (reason?: any) => void
}

// Global state for overlays
const overlays = shallowRef<OverlayInstance[]>([])

export function useOverlay() {
  /**
   * Opens a component in the overlay layer.
   * @param component The component to render
   * @param props Props to pass to the component
   * @returns A promise that resolves when the component emits a 'close' event
   */
  const open = <T = any>(component: Component, props: Record<string, any> = {}): Promise<T> => {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2, 9)
      overlays.value = [
        ...overlays.value,
        {
          id,
          component: markRaw(component),
          props,
          resolve,
          reject
        }
      ]
    })
  }

  /**
   * Internal method to close an overlay by ID and resolve the promise.
   */
  const _close = (id: string, result?: any) => {
    const instance = overlays.value.find(o => o.id === id)
    if (instance) {
      if (instance.resolve) instance.resolve(result)
      overlays.value = overlays.value.filter(o => o.id !== id)
    }
  }

  // We expose overlays and _close for the OverlayProvider
  return {
    open,
    overlays,
    _close
  }
}
