export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface AvatarProps {
  size?: AvatarSize
  rounded?: AvatarRounded
  alt?: string
  src?: string
}
