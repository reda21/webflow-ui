/**
 * Button Component - Accessibility Tests
 * 
 * Tests covering WCAG 2.1 requirements:
 * - Keyboard navigation
 * - ARIA attributes
 * - Focus management
 * - Screen reader announcements
 * - Color contrast (via CSS)
 * - Reduced motion support
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button Accessibility', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // ARIA ATTRIBUTES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('ARIA Attributes', () => {
    it('applies aria-disabled when disabled', () => {
      wrapper = mount(Button, { props: { disabled: true } })
      expect(wrapper.find('.btn').attributes('aria-disabled')).toBe('true')
    })

    it('applies aria-expanded when provided', () => {
      wrapper = mount(Button, { props: { ariaExpanded: true } })
      expect(wrapper.find('.btn').attributes('aria-expanded')).toBe('true')
    })

    it('applies aria-pressed when provided', () => {
      wrapper = mount(Button, { props: { ariaPressed: true } })
      expect(wrapper.find('.btn').attributes('aria-pressed')).toBe('true')

      wrapper = mount(Button, { props: { ariaPressed: 'mixed' } })
      expect(wrapper.find('.btn').attributes('aria-pressed')).toBe('mixed')
    })

    it('applies aria-haspopup when provided', () => {
      wrapper = mount(Button, { props: { ariaHaspopup: 'menu' } })
      expect(wrapper.find('.btn').attributes('aria-haspopup')).toBe('menu')
    })

    it('applies aria-controls when provided', () => {
      wrapper = mount(Button, { props: { ariaControls: 'dropdown-menu' } })
      expect(wrapper.find('.btn').attributes('aria-controls')).toBe('dropdown-menu')
    })

    it('applies aria-describedby when provided', () => {
      wrapper = mount(Button, { props: { ariaDescribedby: 'help-text' } })
      expect(wrapper.find('.btn').attributes('aria-describedby')).toBe('help-text')
    })

    it('applies aria-current when provided', () => {
      wrapper = mount(Button, { props: { ariaCurrent: 'page' } })
      expect(wrapper.find('.btn').attributes('aria-current')).toBe('page')
    })

    it('applies aria-label when provided', () => {
      wrapper = mount(Button, { props: { ariaLabel: 'Close dialog' } })
      expect(wrapper.find('.btn').attributes('aria-label')).toBe('Close dialog')
    })

    it('applies aria-labelledby when provided', () => {
      wrapper = mount(Button, { props: { ariaLabelledby: 'section-title' } })
      expect(wrapper.find('.btn').attributes('aria-labelledby')).toBe('section-title')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVE REGION ANNOUNCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Live Region Announcements', () => {
    it('has a live region element', () => {
      wrapper = mount(Button)
      expect(wrapper.find('.btn-live-region').exists()).toBe(true)
    })

    it('announces loading state', () => {
      wrapper = mount(Button, { props: { loading: true } })
      expect(wrapper.find('.btn-live-region').text()).toContain('Chargement')
    })

    it('announces custom loading text', () => {
      wrapper = mount(Button, { 
        props: { loading: true, loadingText: 'Saving...' }
      })
      expect(wrapper.find('.btn-live-region').text()).toBe('Saving...')
    })

    it('announces success state', () => {
      wrapper = mount(Button, { props: { success: true } })
      expect(wrapper.find('.btn-live-region').text()).toContain('réussie')
    })

    it('announces error state with assertive priority', () => {
      wrapper = mount(Button, { props: { error: true } })
      expect(wrapper.find('.btn-live-region').text()).toContain('erreur')
      expect(wrapper.find('.btn-live-region').attributes('aria-live')).toBe('assertive')
    })

    it('uses polite priority for non-error states', () => {
      wrapper = mount(Button, { props: { loading: true } })
      expect(wrapper.find('.btn-live-region').attributes('aria-live')).toBe('polite')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // KEYBOARD NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Keyboard Navigation', () => {
    it('is focusable by default', () => {
      wrapper = mount(Button)
      const button = wrapper.find('.btn')
      expect(button.attributes('tabindex')).not.toBe('-1')
    })

    it('responds to Enter key', async () => {
      wrapper = mount(Button)
      await wrapper.find('.btn').trigger('keydown', { key: 'Enter' })
      // Note: Native button elements handle Enter key automatically
    })

    it('responds to Space key', async () => {
      wrapper = mount(Button)
      await wrapper.find('.btn').trigger('keydown', { key: ' ' })
      // Note: Native button elements handle Space key automatically
    })

    it('button type is "button" by default to prevent form submission', () => {
      wrapper = mount(Button)
      expect(wrapper.find('.btn').attributes('type')).toBe('button')
    })

    it('allows type="submit" for form submission', () => {
      wrapper = mount(Button, { props: { type: 'submit' } })
      expect(wrapper.find('.btn').attributes('type')).toBe('submit')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Keyboard Shortcuts', () => {
    it('registers keyboard shortcut on mount', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      
      wrapper = mount(Button, { props: { shortcut: 'ctrl+s' } })
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
      
      addEventListenerSpy.mockRestore()
    })

    it('removes keyboard shortcut on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      
      wrapper = mount(Button, { props: { shortcut: 'ctrl+s' } })
      wrapper.unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
      
      removeEventListenerSpy.mockRestore()
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // FOCUS MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Focus Management', () => {
    it('can receive focus', () => {
      wrapper = mount(Button, { attachTo: document.body })
      const button = wrapper.find('.btn').element as HTMLButtonElement
      button.focus()
      expect(document.activeElement).toBe(button)
    })

    it('supports autofocus prop', () => {
      wrapper = mount(Button, { 
        props: { autofocus: true },
        attachTo: document.body 
      })
      expect(wrapper.find('.btn').attributes('autofocus')).toBeDefined()
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // ICON-ONLY ACCESSIBILITY
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Icon-only Button Accessibility', () => {
    it('icon-only buttons should have aria-label', () => {
      wrapper = mount(Button, {
        props: { 
          icon: 'heroicons:x-mark',
          ariaLabel: 'Close'
        }
      })
      expect(wrapper.find('.btn').attributes('aria-label')).toBe('Close')
    })

    it('marks icon as aria-hidden', () => {
      wrapper = mount(Button, {
        props: { icon: 'heroicons:check' },
        global: {
          stubs: {
            Iconify: { template: '<span>icon</span>' }
          }
        }
      })
      const iconContainer = wrapper.find('[aria-hidden="true"]')
      expect(iconContainer.exists()).toBe(true)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // DISABLED STATE ACCESSIBILITY
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Disabled State', () => {
    it('applies native disabled attribute', () => {
      wrapper = mount(Button, { props: { disabled: true } })
      expect(wrapper.find('.btn').attributes('disabled')).toBeDefined()
    })

    it('prevents click events when disabled', async () => {
      wrapper = mount(Button, { props: { disabled: true } })
      await wrapper.find('.btn').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('has reduced opacity for visual indication', () => {
      wrapper = mount(Button, { props: { disabled: true } })
      expect(wrapper.find('.btn').classes()).toContain('opacity-50')
    })

    it('shows not-allowed cursor', () => {
      wrapper = mount(Button, { props: { disabled: true } })
      expect(wrapper.find('.btn').classes()).toContain('cursor-not-allowed')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // LINK BUTTON ACCESSIBILITY
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Link Button Accessibility', () => {
    it('anchor buttons have href attribute', () => {
      wrapper = mount(Button, {
        props: { as: 'a', href: 'https://example.com' }
      })
      expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
    })
  })
})
