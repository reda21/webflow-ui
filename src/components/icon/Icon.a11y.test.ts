/**
 * Icon Component - Accessibility Tests
 */
import { describe, it, expect, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Icon from './Icon.vue'

describe('Icon Accessibility', () => {
    let wrapper: VueWrapper

    afterEach(() => {
        if (wrapper) wrapper.unmount()
    })

    describe('ARIA Attributes', () => {
        it('applies aria-hidden by default', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:user' },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.attributes('aria-hidden')).toBe('true')
        })

        it('applies aria-label when provided', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:user', ariaLabel: 'User profile' },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.attributes('aria-label')).toBe('User profile')
        })

        it('applies role="img" when aria-label is provided', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:user', ariaLabel: 'User icon' },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.attributes('role')).toBe('img')
        })

        it('does not apply aria-hidden when aria-label is set', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:user', ariaLabel: 'Important icon' },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.attributes('aria-hidden')).toBeUndefined()
        })
    })

    describe('Decorative vs Meaningful Icons', () => {
        it('decorative icons are hidden from screen readers', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:star' },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.attributes('aria-hidden')).toBe('true')
        })

        it('meaningful icons have accessible name', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:exclamation-triangle', ariaLabel: 'Warning' },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.attributes('aria-label')).toBe('Warning')
            expect(wrapper.attributes('role')).toBe('img')
        })
    })
})
