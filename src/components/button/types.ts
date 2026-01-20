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
