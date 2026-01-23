/**
 * Icon Component - Unit Tests
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Icon from './Icon.vue'

describe('Icon Component', () => {
    let wrapper: VueWrapper

    afterEach(() => {
        if (wrapper) wrapper.unmount()
    })

    describe('Rendering Modes', () => {
        it('renders in SVG mode by default', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:user' },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.find('.icon').exists()).toBe(true)
        })

        it('renders in CSS mode when specified', () => {
            wrapper = mount(Icon, { props: { name: 'heroicons:user', mode: 'css' } })
            expect(wrapper.find('.icon-css').exists()).toBe(true)
        })

        it('renders sprite mode when sprite prop is provided', () => {
            wrapper = mount(Icon, { props: { name: 'heroicons:star', sprite: '/icons.svg' } })
            expect(wrapper.find('svg use').exists()).toBe(true)
        })
    })

    describe('Sizes', () => {
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']

        sizes.forEach(size => {
            it(`applies ${size} size class`, () => {
                wrapper = mount(Icon, { 
                    props: { name: 'heroicons:user', size },
                    global: { stubs: { IconifyIcon: true } }
                })
                expect(wrapper.find('.icon').classes()).toContain(`icon-${size}`)
            })
        })

        it('applies custom numeric size', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:user', size: 32 },
                global: { stubs: { IconifyIcon: true } }
            })
            const style = wrapper.find('.icon').attributes('style')
            expect(style).toContain('32px')
        })
    })

    describe('Animations', () => {
        it('applies spin animation', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:arrow-path', spin: true },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.find('.icon').classes()).toContain('icon-spin')
        })

        it('applies pulse animation', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:bell', pulse: true },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.find('.icon').classes()).toContain('icon-pulse')
        })
    })

    describe('Transformations', () => {
        it('applies horizontal flip', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:arrow-right', flip: 'horizontal' },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.find('.icon').classes()).toContain('icon-flip-horizontal')
        })

        it('applies rotation', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:arrow-up', rotate: 90 },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.find('.icon').classes()).toContain('icon-rotate-90')
        })

        it('applies scale transformation', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:star', scale: 1.5 },
                global: { stubs: { IconifyIcon: true } }
            })
            const style = wrapper.find('.icon').attributes('style')
            expect(style).toContain('scale(1.5)')
        })
    })

    describe('Loading States', () => {
        it('shows skeleton when loading and skeleton prop is true', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:user', skeleton: true, loading: true },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.find('.icon-skeleton').exists()).toBe(true)
        })
    })

    describe('Inline Mode', () => {
        it('applies inline class', () => {
            wrapper = mount(Icon, { 
                props: { name: 'heroicons:user', inline: true },
                global: { stubs: { IconifyIcon: true } }
            })
            expect(wrapper.find('.icon').classes()).toContain('icon-inline')
        })
    })
})
