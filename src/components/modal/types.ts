// Modal Component Types
// ============================================
import type { ButtonProps } from '../button/types'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'

export type ModalVariant = 'default' | 'clean' | 'glass'

export interface ModalProps {
  // Opening state
  modelValue?: boolean
  defaultOpen?: boolean

  // Content
  title?: string
  description?: string
  
  // Appearance
  size?: ModalSize
  variant?: ModalVariant
  close?: boolean | (ButtonProps & { class?: any })
  
  // Behavior
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  preventScroll?: boolean
  
  // Customization
  contentClass?: string
  overlayClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  
  // Accessibility
  role?: 'dialog' | 'alertdialog'
  ariaLabel?: string
}

export interface ModalEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'after-leave'): void
}
