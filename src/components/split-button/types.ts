import type { ButtonProps } from '../button/types'

export interface SplitButtonProps extends ButtonProps {
    // Additional props for SplitButton could be added here
}

export interface SplitButtonEmits {
    (e: 'click', event: MouseEvent): void
    (e: 'trigger', event: MouseEvent): void
}
