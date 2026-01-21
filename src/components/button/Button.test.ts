/**
 * Button Component - Unit Tests
 * 
 * Comprehensive tests covering:
 * - Rendering and props
 * - Severities and variants
 * - States (loading, disabled, success, error)
 * - Icons and avatars
 * - Events (click, long-press, copy)
 * - Accessibility features
 * - Keyboard navigation
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button Component', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDERING & BASIC PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Rendering', () => {
    it('renders with default props', () => {
      wrapper = mount(Button, {
        slots: { default: 'Click me' }
      })
      expect(wrapper.text()).toContain('Click me')
      expect(wrapper.find('.btn').exists()).toBe(true)
    })

    it('renders with label prop', () => {
      wrapper = mount(Button, {
        props: { label: 'My Button' }
      })
      expect(wrapper.text()).toContain('My Button')
    })

    it('renders as different HTML elements', async () => {
      // As button (default)
      wrapper = mount(Button, { props: { as: 'button' } })
      expect(wrapper.find('button').exists()).toBe(true)

      // As anchor
      wrapper = mount(Button, { props: { as: 'a', href: '#test' } })
      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('a').attributes('href')).toBe('#test')

      // As input
      wrapper = mount(Button, { props: { as: 'input', value: 'Submit' } })
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('applies block class when block prop is true', () => {
      wrapper = mount(Button, { props: { block: true } })
      expect(wrapper.find('.btn').classes()).toContain('btn-block')
    })

    it('applies raised class when raised prop is true', () => {
      wrapper = mount(Button, { props: { raised: true } })
      expect(wrapper.find('.btn').classes()).toContain('btn-raised')
    })

    it('applies square class when square prop is true', () => {
      wrapper = mount(Button, { props: { square: true } })
      expect(wrapper.find('.btn').classes()).toContain('btn-square')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SEVERITIES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Severities', () => {
    const severities = ['primary', 'secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast'] as const

    severities.forEach(severity => {
      it(`applies ${severity} severity class`, () => {
        wrapper = mount(Button, { props: { severity } })
        if (severity !== 'primary') {
          expect(wrapper.find('.btn').classes()).toContain(`btn-${severity}`)
        }
      })
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // VARIANTS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Variants', () => {
    const variants = ['soft', 'outlined', 'subtle', 'ghost', 'link'] as const

    variants.forEach(variant => {
      it(`applies ${variant} variant class`, () => {
        wrapper = mount(Button, { props: { variant } })
        if (variant !== 'soft') {
          expect(wrapper.find('.btn').classes()).toContain(`btn-${variant}`)
        }
      })
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SIZES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

    sizes.forEach(size => {
      it(`applies ${size} size class`, () => {
        wrapper = mount(Button, { props: { size } })
        expect(wrapper.find('.btn').classes()).toContain(`btn-${size}`)
      })
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // STATES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('States', () => {
    it('shows loading spinner when loading is true', () => {
      wrapper = mount(Button, {
        props: { loading: true },
        slots: { default: 'Loading' }
      })
      expect(wrapper.find('svg.animate-spin').exists()).toBe(true)
    })

    it('displays loading text when provided', () => {
      wrapper = mount(Button, {
        props: { loading: true, loadingText: 'Please wait...' }
      })
      expect(wrapper.text()).toContain('Please wait...')
    })

    it('is disabled when disabled prop is true', () => {
      wrapper = mount(Button, { props: { disabled: true } })
      expect(wrapper.find('.btn').attributes('disabled')).toBeDefined()
    })

    it('is disabled when loading is true', () => {
      wrapper = mount(Button, { props: { loading: true } })
      expect(wrapper.find('.btn').attributes('disabled')).toBeDefined()
    })

    it('applies success state classes', () => {
      wrapper = mount(Button, { props: { success: true } })
      expect(wrapper.find('.btn').classes()).toContain('btn-is-success')
    })

    it('applies error state classes', () => {
      wrapper = mount(Button, { props: { error: true } })
      expect(wrapper.find('.btn').classes()).toContain('btn-is-error')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // ICONS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Icons', () => {
    it('renders icon when icon prop is provided', async () => {
      wrapper = mount(Button, {
        props: { icon: 'heroicons:check' },
        global: {
          stubs: {
            Iconify: { template: '<span class="iconify">icon</span>' }
          }
        }
      })
      // Check that the icon slot container exists
      expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true)
    })

    it('renders avatar when avatar prop is provided', () => {
      wrapper = mount(Button, {
        props: { avatar: 'https://example.com/avatar.jpg' }
      })
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
    })

    it('applies correct flex direction for icon positions', () => {
      const positions = {
        left: 'flex-row',
        right: 'flex-row-reverse',
        top: 'flex-col',
        bottom: 'flex-col-reverse'
      }

      Object.entries(positions).forEach(([pos, expectedClass]) => {
        wrapper = mount(Button, {
          props: { iconPos: pos as any, icon: 'test' }
        })
        expect(wrapper.find('.btn').classes()).toContain(expectedClass)
      })
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      wrapper = mount(Button)
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click when disabled', async () => {
      wrapper = mount(Button, { props: { disabled: true } })
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click when loading', async () => {
      wrapper = mount(Button, { props: { loading: true } })
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // DOUBLE-CLICK PROTECTION
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Double-click Protection', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('blocks second click with double-click protection', async () => {
      wrapper = mount(Button, {
        props: { doubleClickProtection: true }
      })
      
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
      
      // Second click should be blocked
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
      
      // After timeout, should work again
      vi.advanceTimersByTime(1001)
      await wrapper.vm.$nextTick()
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(2)
    })

    it('respects custom delay for double-click protection', async () => {
      wrapper = mount(Button, {
        props: { doubleClickProtection: 500 }
      })
      
      await wrapper.find('.btn').trigger('click')
      vi.advanceTimersByTime(400)
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
      
      vi.advanceTimersByTime(201)
      await wrapper.vm.$nextTick()
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(2)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // COPY TO CLIPBOARD
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Copy to Clipboard', () => {
    it('copies text to clipboard when copyText is provided', async () => {
      const clipboardSpy = vi.spyOn(navigator.clipboard, 'writeText')
      
      wrapper = mount(Button, {
        props: { copyText: 'Hello World' }
      })
      
      await wrapper.find('.btn').trigger('click')
      
      expect(clipboardSpy).toHaveBeenCalledWith('Hello World')
    })

    it('emits copy event with copied text', async () => {
      wrapper = mount(Button, {
        props: { copyText: 'Test text' }
      })
      
      await wrapper.find('.btn').trigger('click')
      
      expect(wrapper.emitted('copy')).toBeTruthy()
      expect(wrapper.emitted('copy')![0]).toEqual(['Test text'])
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // COUNTDOWN
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Countdown', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('disables button during countdown', () => {
      wrapper = mount(Button, {
        props: { countdown: 3 }
      })
      
      expect(wrapper.find('.btn').attributes('disabled')).toBeDefined()
    })

    it('enables button after countdown completes', async () => {
      wrapper = mount(Button, {
        props: { countdown: 2 }
      })
      
      expect(wrapper.find('.btn').attributes('disabled')).toBeDefined()
      
      vi.advanceTimersByTime(2000)
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.btn').attributes('disabled')).toBeUndefined()
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // TOOLTIP
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Tooltip', () => {
    it('renders tooltip when tooltip prop is provided', () => {
      wrapper = mount(Button, {
        props: { tooltip: 'Helpful info' }
      })
      expect(wrapper.find('.btn-tooltip').exists()).toBe(true)
      expect(wrapper.find('.btn-tooltip').text()).toBe('Helpful info')
    })

    it('applies correct tooltip position class', () => {
      const positions = ['top', 'bottom', 'left', 'right'] as const
      
      positions.forEach(position => {
        wrapper = mount(Button, {
          props: { tooltip: 'Test', tooltipPosition: position }
        })
        expect(wrapper.find('.btn-tooltip').classes()).toContain(`btn-tooltip-${position}`)
      })
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // BADGE
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Badge', () => {
    it('renders badge when badge prop is provided', () => {
      wrapper = mount(Button, {
        props: { badge: 5 }
      })
      expect(wrapper.find('.btn-badge').exists()).toBe(true)
      expect(wrapper.find('.btn-badge').text()).toBe('5')
    })

    it('renders badge with string value', () => {
      wrapper = mount(Button, {
        props: { badge: 'NEW' }
      })
      expect(wrapper.find('.btn-badge').text()).toBe('NEW')
    })

    it('applies badge color class', () => {
      wrapper = mount(Button, {
        props: { badge: 1, badgeColor: 'danger' }
      })
      expect(wrapper.find('.btn-badge').classes()).toContain('btn-badge-danger')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUNDED
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Rounded', () => {
    const roundedOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const

    roundedOptions.forEach(rounded => {
      it(`applies ${rounded} rounded class`, () => {
        wrapper = mount(Button, { props: { rounded } })
        if (rounded !== 'md') {
          expect(wrapper.find('.btn').classes()).toContain(`round-${rounded}`)
        }
      })
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SHADOW
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Shadow', () => {
    const shadowOptions = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner'] as const

    shadowOptions.forEach(shadow => {
      it(`applies ${shadow} shadow class`, () => {
        wrapper = mount(Button, { props: { shadow } })
        if (shadow !== 'none') {
          expect(wrapper.find('.btn').classes()).toContain(`shadow-${shadow}`)
        }
      })
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // RING
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Ring', () => {
    const ringOptions = ['none', '1', '2', '4'] as const

    ringOptions.forEach(ring => {
      it(`applies ${ring} ring class`, () => {
        wrapper = mount(Button, { props: { ring } })
        if (ring !== 'none') {
          expect(wrapper.find('.btn').classes()).toContain(`btn-ring-${ring}`)
        }
      })
    })
  })
})
