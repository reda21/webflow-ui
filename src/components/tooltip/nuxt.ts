import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@webmx/tooltip',
    configKey: 'tooltip'
  },
  defaults: {
    // Default configuration options
    prefix: 'U' // Example prefix
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Register component
    addComponent({
      name: `${options.prefix}Tooltip`,
      filePath: resolve('./Tooltip.vue'),
      global: true
    })
    
    // Register directive if needed
    // addPlugin(resolve('./plugins/tooltip-directive'))
    
    // Note: This is an example module setup. 
    // In a real monorepo, you'd publish this as a separate package.
  }
})
