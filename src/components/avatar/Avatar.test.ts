/**
 * Avatar Component - Unit Tests
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Avatar from './Avatar.vue'

describe('Avatar Component', () => {
    let wrapper: VueWrapper

    afterEach(() => {
        if (wrapper) wrapper.unmount()
    })

    describe('Rendering & Props', () => {
        it('renders with default props', () => {
            wrapper = mount(Avatar)
            expect(wrapper.find('.avatar').exists()).toBe(true)
            expect(wrapper.find('.avatar-md').exists()).toBe(true)
            expect(wrapper.find('.round-full').exists()).toBe(true)
        })

        it('renders with custom size', () => {
            wrapper = mount(Avatar, { props: { size: 'xl' } })
            expect(wrapper.find('.avatar-xl').exists()).toBe(true)
        })

        it('renders with custom rounding', () => {
            wrapper = mount(Avatar, { props: { rounded: 'md' } })
            expect(wrapper.find('.round-md').exists()).toBe(true)
        })

        it('renders as different element using "as" prop', () => {
            wrapper = mount(Avatar, { props: { as: 'button' } })
            expect(wrapper.element.tagName).toBe('BUTTON')
        })
    })

    describe('Image Loading', () => {
        it('renders image when src is provided', () => {
            wrapper = mount(Avatar, { props: { src: 'https://example.com/img.jpg', alt: 'Test User' } })
            const img = wrapper.find('img')
            expect(img.exists()).toBe(true)
            expect(img.attributes('src')).toBe('https://example.com/img.jpg')
            expect(img.attributes('alt')).toBe('Test User')
        })

        it('shows skeletons when skeleton prop is true', () => {
            wrapper = mount(Avatar, { props: { skeleton: true } })
            expect(wrapper.find('.avatar-skeleton').exists()).toBe(true)
        })
    })

    describe('Fallbacks', () => {
        it('shows initials when image fails and alt is provided', async () => {
            wrapper = mount(Avatar, { props: { src: 'invalid.jpg', alt: 'John Doe' } })
            await wrapper.find('img').trigger('error')
            expect(wrapper.find('.avatar-text').text()).toBe('JD')
        })

        it('shows initials from text prop', () => {
            wrapper = mount(Avatar, { props: { text: '+5' } })
            expect(wrapper.find('.avatar-text').text()).toBe('+5')
        })

        it('shows icon when icon prop is provided and image fails', async () => {
            wrapper = mount(Avatar, { 
                props: { src: 'invalid.jpg', icon: 'heroicons:user' },
                global: { stubs: { Icon: true } }
            })
            await wrapper.find('img').trigger('error')
            expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(true)
        })
        
        it('respects fallbackPriority order', async () => {
            wrapper = mount(Avatar, {
                props: { 
                    src: 'invalid.jpg', 
                    alt: 'John Doe', 
                    icon: 'heroicons:user',
                    fallbackPriority: ['icon', 'initials'] 
                },
                global: { stubs: { Icon: true } }
            })
            await wrapper.find('img').trigger('error')
            expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(true)
            expect(wrapper.find('.avatar-text').exists()).toBe(false)
        })
    })

    describe('Gradients', () => {
        it('applies gradient background when gradient prop is true', () => {
            wrapper = mount(Avatar, { props: { alt: 'John Doe', gradient: true } })
            const style = (wrapper.element as HTMLElement).style.background
            expect(style).toContain('linear-gradient')
        })
    })

    describe('Chips', () => {
        it('renders chip when chip prop is true', () => {
            wrapper = mount(Avatar, { props: { chip: true } })
            expect(wrapper.find('.avatar-chip-indicator').exists()).toBe(true)
        })

        it('applies custom chip position and color', () => {
            wrapper = mount(Avatar, { 
                props: { 
                    chip: { position: 'bottom-left', color: 'danger', pulse: true } 
                } 
            })
            const chip = wrapper.find('.avatar-chip-indicator')
            expect(chip.classes()).toContain('avatar-chip-bottom-left')
            expect(chip.classes()).toContain('avatar-chip-danger')
            expect(chip.classes()).toContain('avatar-chip-pulse')
        })
    })

    describe('Accessibility', () => {
        it('has aria-label from alt prop', () => {
            wrapper = mount(Avatar, { props: { alt: 'Benjamin Canac' } })
            expect(wrapper.attributes('aria-label')).toBe('Benjamin Canac')
        })

        it('has role="button" and tabindex="0" when interactive', () => {
            wrapper = mount(Avatar, { props: { interactive: true } })
            expect(wrapper.attributes('role')).toBe('button')
            expect(wrapper.attributes('tabindex')).toBe('0')
            expect(wrapper.classes()).toContain('avatar-interactive')
        })
    })
})
