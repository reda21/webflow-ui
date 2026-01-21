/**
 * Vitest Setup File
 * Configure global test utilities and mocks
 */
import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

// Mock Iconify component
const MockIcon = defineComponent({
  name: 'Icon',
  props: ['icon'],
  render() {
    return h('span', { class: 'iconify-mock' }, this.icon)
  }
})

// Mock @iconify/vue module
vi.mock('@iconify/vue', () => ({
  Icon: MockIcon,
}))

// Global stubs for NuxtLink and async components
config.global.stubs = {
  NuxtLink: {
    template: '<a><slot /></a>',
    props: ['to'],
  },
  // Stub the async Iconify component
  Suspense: false,
}

// Mock clipboard API if not available
if (typeof navigator !== 'undefined') {
  const clipboardMock = {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  }
  
  if (!navigator.clipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      value: clipboardMock,
      writable: true,
      configurable: true,
    })
  } else {
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
  }
}

// Mock window.matchMedia for prefers-reduced-motion and prefers-contrast
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}
