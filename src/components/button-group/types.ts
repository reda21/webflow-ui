export type ButtonGroupDirection = 'horizontal' | 'vertical'

export interface ButtonGroupProps {
    direction?: ButtonGroupDirection
    toggle?: boolean
    multiple?: boolean
    modelValue?: any
}
