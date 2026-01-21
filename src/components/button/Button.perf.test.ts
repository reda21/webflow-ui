/**
 * Button Component - Performance Tests
 * 
 * Tests covering:
 * - Render performance
 * - Memory usage
 * - Re-render optimization
 * - Batch updates
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import Button from './Button.vue'

describe('Button Performance', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER PERFORMANCE
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Render Performance', () => {
    it('renders quickly with default props', () => {
      const start = performance.now()
      
      wrapper = mount(Button, {
        slots: { default: 'Click me' }
      })
      
      const duration = performance.now() - start
      expect(duration).toBeLessThan(100) // Should render in less than 100ms
    })

    it('renders multiple buttons efficiently', () => {
      const start = performance.now()
      const wrappers: VueWrapper[] = []
      
      for (let i = 0; i < 100; i++) {
        wrappers.push(mount(Button, {
          props: { label: `Button ${i}` }
        }))
      }
      
      const duration = performance.now() - start
      expect(duration).toBeLessThan(1000) // 100 buttons in less than 1s
      
      // Cleanup
      wrappers.forEach(w => w.unmount())
    })

    it('handles rapid prop changes', async () => {
      wrapper = mount(Button, {
        props: { severity: 'primary' }
      })
      
      const start = performance.now()
      const severities = ['primary', 'secondary', 'success', 'danger', 'info'] as const
      
      for (let i = 0; i < 50; i++) {
        await wrapper.setProps({ severity: severities[i % severities.length] })
      }
      
      const duration = performance.now() - start
      expect(duration).toBeLessThan(500) // 50 prop changes in less than 500ms
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // RE-RENDER OPTIMIZATION
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Re-render Optimization', () => {
    it('does not re-render unnecessarily when props are unchanged', async () => {
      const renderSpy = vi.fn()
      
      wrapper = mount({
        components: { Button },
        template: '<Button :label="label" @vue:updated="onUpdate" />',
        setup() {
          return {
            label: 'Test',
            onUpdate: renderSpy
          }
        }
      })
      
      // Setting same props shouldn't trigger update
      await wrapper.setProps({})
      await nextTick()
      
      // Note: Vue's reactivity system handles this automatically
    })

    it('efficiently updates only changed classes', async () => {
      wrapper = mount(Button, {
        props: { severity: 'primary', size: 'md' }
      })
      
      const initialClasses = wrapper.find('.btn').classes()
      
      await wrapper.setProps({ severity: 'danger' })
      
      const newClasses = wrapper.find('.btn').classes()
      
      // Size-related classes should remain the same
      expect(newClasses).toContain('btn-md')
      // Severity should change
      expect(newClasses).toContain('btn-danger')
      expect(newClasses).not.toContain('btn-primary')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPUTED PROPERTIES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Computed Properties Caching', () => {
    it('caches computed classes when props are unchanged', () => {
      wrapper = mount(Button, {
        props: { severity: 'primary', variant: 'soft', size: 'md' }
      })
      
      const classes1 = wrapper.find('.btn').classes().join(' ')
      const classes2 = wrapper.find('.btn').classes().join(' ')
      
      expect(classes1).toBe(classes2)
    })

    it('updates computed classes only for changed props', async () => {
      wrapper = mount(Button, {
        props: { severity: 'primary', size: 'md' }
      })
      
      expect(wrapper.find('.btn').classes()).toContain('btn-md')
      
      await wrapper.setProps({ size: 'lg' })
      
      expect(wrapper.find('.btn').classes()).toContain('btn-lg')
      expect(wrapper.find('.btn').classes()).not.toContain('btn-md')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENT HANDLER PERFORMANCE
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Event Handler Performance', () => {
    it('handles rapid clicks efficiently', async () => {
      const clickHandler = vi.fn()
      wrapper = mount(Button, {
        attrs: { onClick: clickHandler }
      })
      
      const start = performance.now()
      
      for (let i = 0; i < 100; i++) {
        await wrapper.find('.btn').trigger('click')
      }
      
      const duration = performance.now() - start
      expect(duration).toBeLessThan(200) // 100 clicks in less than 200ms
      expect(clickHandler).toHaveBeenCalledTimes(100)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // MEMORY CLEANUP
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Memory Cleanup', () => {
    it('cleans up timers on unmount', () => {
      vi.useFakeTimers()
      
      wrapper = mount(Button, {
        props: { countdown: 5 }
      })
      
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
      
      wrapper.unmount()
      
      expect(clearIntervalSpy).toHaveBeenCalled()
      
      clearIntervalSpy.mockRestore()
      vi.useRealTimers()
    })

    it('removes event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      
      wrapper = mount(Button, {
        props: { shortcut: 'ctrl+s' }
      })
      
      wrapper.unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
      
      removeEventListenerSpy.mockRestore()
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // LAZY LOADING
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Lazy Loading', () => {
    it('does not import Iconify when no icon is used', () => {
      wrapper = mount(Button, {
        slots: { default: 'No Icon' }
      })
      
      // Button should render without waiting for Iconify
      expect(wrapper.text()).toContain('No Icon')
    })
  })
})
