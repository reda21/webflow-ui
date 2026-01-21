export type ButtonVariant = 'soft' | 'outlined' | 'subtle' | 'ghost' | 'link'
export type ButtonSeverity =
    | 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ButtonRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type ButtonAs = 'button' | 'a' | 'input'
export type ButtonIconPos = 'left' | 'right' | 'top' | 'bottom'
export type ButtonShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'
export type ButtonRing = 'none' | '1' | '2' | '4'

export interface ButtonProps {
    variant?: ButtonVariant
    severity?: ButtonSeverity
    size?: ButtonSize
    rounded?: ButtonRounded
    shadow?: ButtonShadow
    ring?: ButtonRing
    as?: ButtonAs
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    loadingAuto?: boolean
    disabled?: boolean
    block?: boolean
    raised?: boolean
    square?: boolean
    iconPos?: ButtonIconPos
    href?: string
    value?: string
    icon?: string
    label?: string
    leadingIcon?: string
    avatar?: string
    to?: string | object
    name?: string
    autofocus?: boolean | string
    referrerpolicy?: string
    active?: boolean
    trailingSlash?: 'remove' | 'append'
    // Fonctionnalités avancées
    loadingText?: string
    success?: boolean
    error?: boolean
    tooltip?: string
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
    badge?: string | number
    badgeColor?: ButtonSeverity
    countdown?: number
    // Comportements avancés
    doubleClickProtection?: boolean | number  // true = 1000ms, number = custom ms
    longPressDelay?: number  // ms before triggering long press (default: 500)
    shortcut?: string  // keyboard shortcut (e.g., 'ctrl+s', 'alt+n')
    copyText?: string  // text to copy to clipboard on click
    theme?: 'ocean' | 'forest' | 'sunset' | 'neon'
    fab?: boolean
    fabPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    colorblind?: boolean
    // ARIA Props
    ariaExpanded?: boolean
    ariaPressed?: boolean | 'mixed'
    ariaDescribedby?: string
    ariaControls?: string
    ariaHaspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
    ariaCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
    ariaLive?: 'off' | 'assertive' | 'polite'
    ariaAtomic?: boolean
    ariaRelevant?: 'additions' | 'additions text' | 'all' | 'removals' | 'text'
    ariaHidden?: boolean
    ariaLabelledby?: string
    ariaLabel?: string
}
