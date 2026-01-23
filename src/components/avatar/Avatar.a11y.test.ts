/**
 * Avatar Component - Accessibility Tests
 */
import { describe, it, expect, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Avatar from './Avatar.vue'

describe('Avatar Accessibility', () => {
    let wrapper: VueWrapper

    afterEach(() => {
        if (wrapper) wrapper.unmount()
    })

    describe('ARIA Attributes', () => {
        it('applies aria-label from alt prop', () => {
            wrapper = mount(Avatar, { props: { alt: 'John Doe' } })
            expect(wrapper.attributes('aria-label')).toBe('John Doe')
        })

        it('applies custom ariaLabel over alt', () => {
            wrapper = mount(Avatar, { props: { alt: 'John Doe', ariaLabel: 'User Avatar' } })
            expect(wrapper.attributes('aria-label')).toBe('User Avatar')
        })

        it('has role="button" when interactive', () => {
            wrapper = mount(Avatar, { props: { interactive: true } })
            expect(wrapper.attributes('role')).toBe('button')
        })

        it('has tabindex="0" when interactive', () => {
            wrapper = mount(Avatar, { props: { interactive: true } })
            expect(wrapper.attributes('tabindex')).toBe('0')
        })
    })

    describe('Text Content', () => {
        it('renders initials as text content', () => {
            wrapper = mount(Avatar, { props: { alt: 'John Doe' } })
            expect(wrapper.find('.avatar-text').text()).toBe('JD')
        })

        it('is hidden when loading placeholder', () => {
            wrapper = mount(Avatar, { props: { skeleton: true } })
            expect(wrapper.find('.avatar-content').classes()).toContain('invisible')
        })
    })

    describe('Focus Management', () => {
        it('can receive focus when interactive', () => {
            wrapper = mount(Avatar, { 
                props: { interactive: true },
                attachTo: document.body 
            })
            const el = wrapper.element as HTMLElement
            el.focus()
            expect(document.activeElement).toBe(el)
        })

        it('is not focusable by default', () => {
            wrapper = mount(Avatar)
            expect(wrapper.attributes('tabindex')).toBeUndefined()
        })
    })
})
