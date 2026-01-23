// ============================================
// Avatar Component Types
// ============================================

export type AvatarSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
export type AvatarRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type AvatarColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'neutral'
export type FallbackType = 'initials' | 'icon' | 'placeholder'

// Chip/Badge indicator props
export interface ChipProps {
    inset?: boolean
    color?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'neutral' | string
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    size?: 'sm' | 'md' | 'lg'
    pulse?: boolean
    text?: string
}

// Main Avatar props
export interface AvatarProps {
    as?: string | object
    size?: AvatarSize
    rounded?: AvatarRounded
    color?: AvatarColor | string
    alt?: string
    src?: string
    icon?: string
    text?: string
    chip?: boolean | ChipProps
    skeleton?: boolean
    ring?: boolean | { color?: string; width?: 'sm' | 'md' | 'lg' }
    hoverEffect?: 'none' | 'scale' | 'glow' | 'lift'
    // New features
    preload?: boolean
    blurHash?: string
    ariaLabel?: string
    interactive?: boolean
    fallbackPriority?: FallbackType[]
    gradient?: boolean
    // Standard image attributes
    loading?: 'eager' | 'lazy'
    referrerpolicy?: ReferrerPolicy
    crossorigin?: '' | 'anonymous' | 'use-credentials'
    decoding?: 'async' | 'auto' | 'sync'
    height?: string | number
    width?: string | number
    sizes?: string
    srcset?: string
    usemap?: string
}

// AvatarGroup props
export interface AvatarGroupProps {
    size?: AvatarSize
    max?: number
    spacing?: 'tight' | 'normal' | 'loose'
    reverse?: boolean
    ring?: boolean | { color?: string }
    animated?: boolean
    overflowPlacement?: 'start' | 'end'
    orientation?: 'horizontal' | 'vertical'
}

// AvatarImage props
export interface AvatarImageProps {
    src?: string
    alt?: string
    loading?: 'eager' | 'lazy'
    srcset?: string
    sizes?: string
    crossorigin?: '' | 'anonymous' | 'use-credentials'
    referrerpolicy?: ReferrerPolicy
    objectFit?: 'cover' | 'contain' | 'fill' | 'none'
}

// AvatarFallback props  
export interface AvatarFallbackProps {
    icon?: string
    color?: string
    bgColor?: string
    delayMs?: number
}

// Avatar context (shared between components)
export interface AvatarContext {
    size: AvatarSize
    rounded: AvatarRounded
    imageLoaded: { value: boolean }
    imageError: { value: boolean }
}
