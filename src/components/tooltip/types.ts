// ============================================
// Tooltip Component Types
// ============================================

// Position du tooltip
export type TooltipPosition =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

// Déclencheur d'affichage
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual'

// Thème/variante
export type TooltipVariant = 'dark' | 'light' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

// Taille
export type TooltipSize = 'xs' | 'sm' | 'md' | 'lg'

// Forme de la flèche
export type TooltipArrow = 'none' | 'sm' | 'md' | 'lg'

// Animation
export type TooltipAnimation = 
  | 'fade'    // Subtle opacity transition
  | 'scale'   // Zoom effect with spring
  | 'slide'   // Directional movement
  | 'flip'    // 3D rotation
  | 'zoom'    // Scale with bounce
  | 'bounce'  // Playful movement
  | 'subtle'  // Minimal, professional
  | 'expand'  // Grow from point
  | 'none'    // No animation

// ============================================
// Props Interfaces
// ============================================

export interface TooltipDelayConfig {
  show: number
  hide: number
}

export interface TooltipProps {
  // Contenu
  content?: string
  title?: string

  // Positionnement
  position?: TooltipPosition
  offset?: number | [number, number]
  flip?: boolean              // Auto-flip si pas assez d'espace
  shift?: boolean             // Auto-shift pour rester visible

  // Apparence
  variant?: TooltipVariant
  size?: TooltipSize
  arrow?: TooltipArrow
  maxWidth?: string | number
  zIndex?: number

  // Comportement
  trigger?: TooltipTrigger | TooltipTrigger[]
  delay?: number | TooltipDelayConfig
  duration?: number           // Durée d'affichage (0 = infini)
  interactive?: boolean       // Peut-on interagir avec le tooltip?
  hideOnClick?: boolean
  closeOnEscape?: boolean

  // Animation
  animation?: TooltipAnimation
  animationDuration?: number

  // État
  disabled?: boolean
  modelValue?: boolean        // v-model pour contrôle manuel
  defaultOpen?: boolean

  // Accessibilité
  ariaLabel?: string
  ariaDescribedby?: string
  role?: 'tooltip' | 'dialog'

  // Avancé
  appendTo?: string | HTMLElement
  portal?: boolean            // Téléporter dans le body
  singleton?: boolean         // Partager une instance
}

// ============================================
// Slot Props
// ============================================

export interface TooltipSlotProps {
  isOpen: boolean
  show: () => void
  hide: () => void
  toggle: () => void
}

// ============================================
// Emits
// ============================================

export interface TooltipEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
  (e: 'before-show'): void
  (e: 'before-hide'): void
}

// ============================================
// Context (for compound components)
// ============================================

export interface TooltipContext {
  isOpen: { value: boolean }
  show: () => void
  hide: () => void
  toggle: () => void
  position: TooltipPosition
  variant: TooltipVariant
  triggerRef: { value: HTMLElement | null }
  contentRef: { value: HTMLElement | null }
}
