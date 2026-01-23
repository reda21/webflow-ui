import { ref, onMounted, onUnmounted, type Ref } from 'vue'

// Singleton instance
let singletonInstance: {
  id: string
  show: () => void
  hide: () => void
} | null = null

// Active tooltip refs
const activeTooltips = new Map<string, {
  show: () => void
  hide: () => void
  isVisible: Ref<boolean>
}>()

/**
 * Composable pour gérer un pattern singleton pour les tooltips
 * Garantit qu'un seul tooltip est visible à la fois
 */
export function useTooltipSingleton(tooltipId: string, show: () => void, hide: () => void, isVisible: Ref<boolean>) {
  onMounted(() => {
    activeTooltips.set(tooltipId, { show, hide, isVisible })
  })

  onUnmounted(() => {
    activeTooltips.delete(tooltipId)
    if (singletonInstance?.id === tooltipId) {
      singletonInstance = null
    }
  })

  const showTooltip = () => {
    // Hide current singleton if exists
    if (singletonInstance && singletonInstance.id !== tooltipId) {
      singletonInstance.hide()
    }

    // Show this tooltip
    show()
    
    // Update singleton instance
    singletonInstance = {
      id: tooltipId,
      show,
      hide
    }
  }

  const hideTooltip = () => {
    // Only hide if this is the current singleton
    if (singletonInstance?.id === tooltipId) {
      hide()
      singletonInstance = null
    }
  }

  const toggleTooltip = () => {
    if (isVisible.value) {
      hideTooltip()
    } else {
      showTooltip()
    }
  }

  return {
    show: showTooltip,
    hide: hideTooltip,
    toggle: toggleTooltip
  }
}