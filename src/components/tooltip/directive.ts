import { createApp, type Directive, type App } from 'vue'
import Tooltip from './Tooltip.vue'
import type { TooltipProps } from './types'

// Store active instances to clean them up
const tooltipInstances = new Map<HTMLElement, App>()

export const vTooltip: Directive = {
  mounted(el: HTMLElement, binding) {
    // 1. Create container for tooltip
    const container = document.createElement('div')
    
    // 2. Prepare props based on binding value
    let props: Partial<TooltipProps> = {}
    
    if (typeof binding.value === 'string') {
      props.content = binding.value
    } else if (typeof binding.value === 'object') {
      props = { ...binding.value }
    }
    
    // Set trigger element as virtual element if needed, 
    // but better to just mount the tooltip and let it attach listeners to the EL.
    // However, Tooltip.vue expects to wrap the trigger or use a virtual element.
    // Since v-tooltip on an element IS the trigger, we need to pass the element as virtualElement
    // OR mount the Tooltip component slightly differently.
    
    // Strategy: Mount Tooltip component, pass 'el' as 'virtualElement'.
    // And 'teleport' to body.
    
    props.virtualElement = el
    props.teleport = 'body' 
    // Default trigger for directive usually implies hover, but we let Tooltip handle defaults.
    
    // 3. Create App instance
    const app = createApp(Tooltip, {
      ...props,
      // Force visible if binding arg says so? No, usually v-tooltip just configures content.
      // But we need to ensure the tooltip knows when to show.
      // The Tooltip component typically adds listeners to the triggerRef.
      // Since we are passing virtualElement, Tooltip.vue's setup will use it for positioning
      // BUT event listeners in Tooltip.vue template are on the wrapper div.
      // We need to manually forward events from EL to Tooltip exposed methods if we want strictly directive based.
      
      // ALTERNATIVE: Use a "Headless" approach where we attach listeners to 'el' here 
      // and control the Tooltip instance exposed 'show/hide'.
      
      // Let's try passing 'virtualElement' which handles positioning.
      // For triggers, we might need to attach listeners to 'el' manually in this directive 
      // and call exposed methods on the component instance.
    })
    
    // Mount to a detached container (will be teleported by Tooltip component anyway)
    // But wait, if we mount, the template of Tooltip renders...
    // <div class="wrapper"> <div ref="trigger"> <slot/> </div> <Teleport>... </Teleport> </div>
    // If we don't provide a slot, the wrapper is empty.
    // We want the 'el' to be the trigger.
    
    // This is tricky with a component-based tooltip. 
    // Simpler directive approach: 
    // Just attach listeners to `el` and create a singleton-like tooltip or mount a dedicated one.
    
    // Let's go with: Mount a Tooltip instance that is "always open" but controlled by visibility prop,
    // and we manage visibility in the directive via listeners.
    // OR simpler: Use the `useTooltip` composable logic if we extracted enough.
    
    // For now, let's just make a basic implementation that mounts the component.
    const wrapper = document.createElement('div')
    const instance = app.mount(wrapper) as any
    
    // Store for cleanup
    tooltipInstances.set(el, app)
    
    // Attach listeners to 'el' to control the tooltip instance
    // Note: This duplicates some logic from Tooltip.vue but is necessary for directive
    
    const trigger = props.trigger || 'hover'
    
    if (trigger === 'hover' || (Array.isArray(trigger) && trigger.includes('hover'))) {
      el.addEventListener('mouseenter', () => instance.show())
      el.addEventListener('mouseleave', () => instance.hide())
    }
    
    if (trigger === 'click' || (Array.isArray(trigger) && trigger.includes('click'))) {
        el.addEventListener('click', (e) => {
            e.stopPropagation()
            instance.toggle()
        })
    }
    
    if (trigger === 'focus' || (Array.isArray(trigger) && trigger.includes('focus'))) {
        el.addEventListener('focusin', () => instance.show())
        el.addEventListener('focusout', () => instance.hide())
    }
  },
  
  updated(el, binding) {
    // Handle updates if needed (re-mount or update props)
    // Complex to update root props of mounted app dynamically without a store or expose.
    // For simple usage, unmount and remount is easiest but costly.
    // Ideally we'd hold ref to props.
  },
  
  unmounted(el) {
    const app = tooltipInstances.get(el)
    if (app) {
      app.unmount()
      tooltipInstances.delete(el)
    }
  }
}
