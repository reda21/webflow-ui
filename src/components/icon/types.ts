// ============================================
// Icon Component Types
// ============================================

export type IconMode = 'svg' | 'css'
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string | number
export type IconFlip = 'horizontal' | 'vertical' | 'horizontal,vertical'

export interface IconProps {
    name: string
    mode?: IconMode
    size?: IconSize
    color?: string
    rotate?: number | string
    flip?: IconFlip
    spin?: boolean
    pulse?: boolean
    // Transformations
    scale?: number | string
    // Performance
    inline?: boolean
    sprite?: string
    lazy?: boolean
    // Loading
    loading?: boolean
    skeleton?: boolean
    fallback?: string
    // Accessibility
    ariaLabel?: string
    ariaHidden?: boolean
}
