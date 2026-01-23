// ============================================
// Avatar Module Exports
// ============================================

// Components
export { default as Avatar } from './Avatar.vue'
export { default as AvatarImage } from './AvatarImage.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarGroup } from './AvatarGroup.vue'

// Composables
export { useAvatar } from './useAvatar'
export type { UseAvatarOptions, UseAvatarReturn } from './useAvatar'

// Types
export type {
    AvatarSize,
    AvatarRounded,
    AvatarColor,
    AvatarProps,
    AvatarGroupProps,
    AvatarImageProps,
    AvatarFallbackProps,
    AvatarContext,
    ChipProps,
    FallbackType
} from './types'
