import { ref, computed, watch, onMounted, onUnmounted, type Ref, nextTick } from 'vue'
import type { TooltipProps, TooltipEmits, TooltipPosition, TooltipTrigger } from './types'

// ============================================
// useTooltip Composable
// ============================================

export interface UseTooltipReturn {
  // State
  isOpen: Ref<boolean>
  
  // Methods
  show: () => void
  hide: () => void
  toggle: () => void
  
  // Refs
  triggerRef: Ref<HTMLElement | null>
  contentRef: Ref<HTMLElement | null>
  
  // Computed props for template
  triggerProps: Ref<Record<string, unknown>>
  contentStyles: Ref<Record<string, string>>
  
  // Position
  actualPosition: Ref<TooltipPosition>
}

export function useTooltip(
  props: TooltipProps,
  emit: TooltipEmits
): UseTooltipReturn {
  // ----------------------------------------
  // State
  // ----------------------------------------
  const isOpen = ref(props.defaultOpen ?? false)
  const triggerRef = ref<HTMLElement | null>(null)
  const contentRef = ref<HTMLElement | null>(null)
  const actualPosition = ref<TooltipPosition>(props.position ?? 'top')
  
  // Timers
  let showTimer: ReturnType<typeof setTimeout> | null = null
  let hideTimer: ReturnType<typeof setTimeout> | null = null
  let durationTimer: ReturnType<typeof setTimeout> | null = null
  
  // ----------------------------------------
  // Delay helpers
  // ----------------------------------------
  const getShowDelay = (): number => {
    if (typeof props.delay === 'number') return props.delay
    if (typeof props.delay === 'object') return props.delay.show
    return 0
  }
  
  const getHideDelay = (): number => {
    if (typeof props.delay === 'number') return props.delay
    if (typeof props.delay === 'object') return props.delay.hide
    return 0
  }
  
  // ----------------------------------------
  // Core methods
  // ----------------------------------------
  const clearTimers = () => {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    if (durationTimer) {
      clearTimeout(durationTimer)
      durationTimer = null
    }
  }
  
  const show = () => {
    if (props.disabled) return
    
    clearTimers()
    emit('before-show')
    
    const delay = getShowDelay()
    
    if (delay > 0) {
      showTimer = setTimeout(() => {
        isOpen.value = true
        emit('show')
        emit('update:modelValue', true)
        startDurationTimer()
      }, delay)
    } else {
      isOpen.value = true
      emit('show')
      emit('update:modelValue', true)
      startDurationTimer()
    }
  }
  
  const hide = () => {
    clearTimers()
    emit('before-hide')
    
    const delay = getHideDelay()
    
    if (delay > 0) {
      hideTimer = setTimeout(() => {
        isOpen.value = false
        emit('hide')
        emit('update:modelValue', false)
      }, delay)
    } else {
      isOpen.value = false
      emit('hide')
      emit('update:modelValue', false)
    }
  }
  
  const toggle = () => {
    if (isOpen.value) {
      hide()
    } else {
      show()
    }
  }
  
  const startDurationTimer = () => {
    if (props.duration && props.duration > 0) {
      durationTimer = setTimeout(() => {
        hide()
      }, props.duration)
    }
  }
  
  // ----------------------------------------
  // Trigger helpers
  // ----------------------------------------
  const getTriggers = (): TooltipTrigger[] => {
    if (Array.isArray(props.trigger)) return props.trigger
    return [props.trigger ?? 'hover']
  }
  
  const hasTrigger = (trigger: TooltipTrigger): boolean => {
    return getTriggers().includes(trigger)
  }
  
  // ----------------------------------------
  // Event handlers
  // ----------------------------------------
  const onMouseEnter = () => {
    if (hasTrigger('hover')) {
      show()
    }
  }
  
  const onMouseLeave = () => {
    if (hasTrigger('hover') && !props.interactive) {
      hide()
    }
  }
  
  const onContentMouseEnter = () => {
    if (hasTrigger('hover') && props.interactive) {
      clearTimers()
    }
  }
  
  const onContentMouseLeave = () => {
    if (hasTrigger('hover') && props.interactive) {
      hide()
    }
  }
  
  const onFocus = () => {
    if (hasTrigger('focus')) {
      show()
    }
  }
  
  const onBlur = () => {
    if (hasTrigger('focus')) {
      hide()
    }
  }
  
  const onClick = () => {
    if (hasTrigger('click')) {
      toggle()
    }
  }
  
  const onKeydown = (event: KeyboardEvent) => {
    if (props.closeOnEscape && event.key === 'Escape' && isOpen.value) {
      hide()
      event.preventDefault()
    }
  }
  
  const onClickOutside = (event: MouseEvent) => {
    if (!isOpen.value) return
    if (props.hideOnClick === false) return
    
    const target = event.target as Node
    const trigger = triggerRef.value
    const content = contentRef.value
    
    if (trigger?.contains(target)) return
    if (content?.contains(target)) return
    
    hide()
  }
  
  // ----------------------------------------
  // Position calculation
  // ----------------------------------------
  const calculatePosition = () => {
    if (!triggerRef.value || !contentRef.value) return
    
    if (props.flip) {
      nextTick(() => {
        const content = contentRef.value
        if (!content) return
        
        const rect = content.getBoundingClientRect()
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight
        }
        
        let newPosition = props.position ?? 'top'
        
        // Check if tooltip is outside viewport and flip
        if (newPosition.startsWith('top') && rect.top < 0) {
          newPosition = newPosition.replace('top', 'bottom') as TooltipPosition
        } else if (newPosition.startsWith('bottom') && rect.bottom > viewport.height) {
          newPosition = newPosition.replace('bottom', 'top') as TooltipPosition
        } else if (newPosition.startsWith('left') && rect.left < 0) {
          newPosition = newPosition.replace('left', 'right') as TooltipPosition
        } else if (newPosition.startsWith('right') && rect.right > viewport.width) {
          newPosition = newPosition.replace('right', 'left') as TooltipPosition
        }
        
        actualPosition.value = newPosition
      })
    }
  }
  
  // ----------------------------------------
  // Computed properties for template
  // ----------------------------------------
  const triggerProps = computed(() => {
    const attrs: Record<string, unknown> = {
      'aria-describedby': isOpen.value ? 'tooltip-content' : undefined
    }
    
    if (hasTrigger('hover')) {
      attrs.onMouseenter = onMouseEnter
      attrs.onMouseleave = onMouseLeave
    }
    
    if (hasTrigger('focus')) {
      attrs.onFocus = onFocus
      attrs.onBlur = onBlur
    }
    
    if (hasTrigger('click')) {
      attrs.onClick = onClick
    }
    
    return attrs
  })
  
  const contentStyles = computed(() => {
    const styles: Record<string, string> = {}
    
    if (props.maxWidth) {
      styles.maxWidth = typeof props.maxWidth === 'number' 
        ? `${props.maxWidth}px` 
        : props.maxWidth
    }
    
    if (props.zIndex) {
      styles.zIndex = String(props.zIndex)
    }
    
    if (props.animationDuration) {
      styles['--tooltip-animation-duration'] = `${props.animationDuration}ms`
    }
    
    return styles
  })
  
  // ----------------------------------------
  // Watchers
  // ----------------------------------------
  watch(() => props.modelValue, (newValue) => {
    if (newValue !== undefined) {
      isOpen.value = newValue
    }
  })
  
  watch(isOpen, (newValue) => {
    if (newValue) {
      calculatePosition()
    }
  })
  
  watch(() => props.position, (newPosition) => {
    if (newPosition) {
      actualPosition.value = newPosition
    }
  })
  
  // ----------------------------------------
  // Lifecycle
  // ----------------------------------------
  onMounted(() => {
    document.addEventListener('click', onClickOutside)
    document.addEventListener('keydown', onKeydown)
    
    // Add content event listeners for interactive mode
    if (contentRef.value && props.interactive) {
      contentRef.value.addEventListener('mouseenter', onContentMouseEnter)
      contentRef.value.addEventListener('mouseleave', onContentMouseLeave)
    }
  })
  
  onUnmounted(() => {
    clearTimers()
    document.removeEventListener('click', onClickOutside)
    document.removeEventListener('keydown', onKeydown)
  })
  
  // ----------------------------------------
  // Return
  // ----------------------------------------
  return {
    isOpen,
    show,
    hide,
    toggle,
    triggerRef,
    contentRef,
    triggerProps,
    contentStyles,
    actualPosition
  }
}
