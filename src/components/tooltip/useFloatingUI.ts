import { ref, computed, unref, type Ref } from 'vue'
import {
  computePosition,
  flip,
  shift,
  offset as floatingOffset,
  autoUpdate,
  type Placement,
  type Middleware,
  type Boundary,
  type RootBoundary,
  type ElementContext,
  type VirtualElement
} from '@floating-ui/vue'

export type { Boundary, RootBoundary, Placement }

export interface FloatingUIOptions {
  placement?: Placement
  offset?: number | { mainAxis?: number; crossAxis?: number }
  flip?: boolean | { boundary?: Boundary | 'clippingParents'; rootBoundary?: RootBoundary; elementContext?: ElementContext }
  shift?: boolean | { boundary?: Boundary | 'clippingParents'; rootBoundary?: RootBoundary; elementContext?: ElementContext; crossAxis?: boolean }
  autoUpdate?: boolean
  boundary?: Boundary | 'clippingParents'
}

/**
 * Composable pour utiliser Floating UI avec Vue
 * Gère le positionnement intelligent des tooltips
 */
export function useFloatingUI(
  reference: Ref<HTMLElement | VirtualElement | null>,
  floating: Ref<HTMLElement | null>,
  options: FloatingUIOptions | Ref<FloatingUIOptions> | (() => FloatingUIOptions) = {}
) {
  const x = ref(0)
  const y = ref(0)
  const strategy = ref<'absolute' | 'fixed'>('fixed')
  const placement = ref<Placement>('top')
  const middlewareData = ref({})

  const defaultOptions: FloatingUIOptions = {
    placement: 'top',
    offset: 8,
    flip: true,
    shift: true,
    autoUpdate: true,
    boundary: 'clippingParents'
  }

  const mergedOptions = computed(() => {
    const opts = typeof options === 'function' ? options() : unref(options)
    return { ...defaultOptions, ...opts }
  })

  const middleware = computed<Middleware[]>(() => {
    const middlewares: Middleware[] = []

    // Offset middleware
    if (mergedOptions.value.offset !== undefined) {
      middlewares.push(floatingOffset(mergedOptions.value.offset))
    }

    // Flip middleware
    if (mergedOptions.value.flip) {
      const flipOptions = typeof mergedOptions.value.flip === 'boolean' 
        ? {} 
        : mergedOptions.value.flip
      middlewares.push(flip(flipOptions as any))
    }

    // Shift middleware
    if (mergedOptions.value.shift) {
      const shiftOptions = typeof mergedOptions.value.shift === 'boolean' 
        ? {} 
        : mergedOptions.value.shift
      middlewares.push(shift(shiftOptions as any))
    }

    return middlewares
  })

  const updatePosition = async () => {
    if (!reference.value || !floating.value) return

    try {
      const position = await computePosition(reference.value, floating.value, {
        placement: mergedOptions.value.placement,
        middleware: middleware.value,
        strategy: strategy.value
      })

      x.value = position.x
      y.value = position.y
      placement.value = position.placement
      middlewareData.value = position.middlewareData
    } catch (error) {
      console.warn('Erreur lors du calcul de position Floating UI:', error)
    }
  }

  const floatingStyles = computed(() => ({
    position: strategy.value,
    left: `${x.value}px`,
    top: `${y.value}px`,
    willChange: 'transform'
  }))

  let cleanupAutoUpdate: (() => void) | null = null

  const startAutoUpdate = () => {
    if (!mergedOptions.value.autoUpdate || !reference.value || !floating.value) return

    cleanupAutoUpdate = autoUpdate(reference.value, floating.value, updatePosition)
  }

  const stopAutoUpdate = () => {
    if (cleanupAutoUpdate) {
      cleanupAutoUpdate()
      cleanupAutoUpdate = null
    }
  }

  return {
    x,
    y,
    strategy,
    placement,
    middlewareData,
    floatingStyles,
    updatePosition,
    startAutoUpdate,
    stopAutoUpdate
  }
}