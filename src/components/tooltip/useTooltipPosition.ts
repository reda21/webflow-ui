import { ref, computed, onMounted, onUnmounted, watch, nextTick, type Ref, type CSSProperties } from 'vue'
import type { TooltipProps, TooltipPosition } from './types'
import { useFloatingUI, type FloatingUIOptions, type Boundary } from './useFloatingUI'

interface UseTooltipPositionOptions {
    props: TooltipProps
    triggerRef: Ref<HTMLElement | null>
    contentRef: Ref<HTMLElement | null>
    isVisible: Ref<boolean>
}

export function useTooltipPosition({ props, triggerRef, contentRef, isVisible }: UseTooltipPositionOptions) {
    const positionStyles = ref<CSSProperties>({})
    let autoUpdateCleanup: (() => void) | null = null

    // ============================================
    // Floating UI Integration
    // ============================================
    const floatingOptions = computed<FloatingUIOptions>(() => {
        let offsetVal: number | { mainAxis?: number; crossAxis?: number } | undefined
        if (Array.isArray(props.offset)) {
            offsetVal = { mainAxis: props.offset[0], crossAxis: props.offset[1] }
        } else {
            offsetVal = props.offset
        }

        let boundaryVal: Boundary | 'clippingParents' | undefined
        if (props.boundary === 'clippingParents') {
            boundaryVal = 'clippingParents'
        } else if (typeof props.boundary === 'object') {
            boundaryVal = props.boundary as Boundary
        }
        
        return {
            placement: props.position,
            offset: offsetVal,
            flip: props.flip,
            shift: props.shift,
            boundary: boundaryVal,
            autoUpdate: true
        }
    })

    const floatingUI = props.floatingUI ? useFloatingUI(
        computed(() => props.virtualElement ? props.virtualElement : triggerRef.value),
        contentRef,
        floatingOptions
    ) : null

    // ============================================
    // Manual Positioning Logic
    // ============================================
    const updateManualPosition = async () => {
        if (!isVisible.value) return
        if (props.followCursor) return

        await nextTick()

        const triggerEl = props.virtualElement
            ? { getBoundingClientRect: props.virtualElement.getBoundingClientRect }
            : triggerRef.value

        const contentEl = contentRef.value

        if (!triggerEl || !contentEl) return

        const triggerRect = triggerEl.getBoundingClientRect()
        // Use offsetWidth/Height to avoid transform issues (like scale animation) causing wrong positioning
        // getBoundingClientRect() returns dimensions affected by scale transforms, whereas we want the layout dimensions
        const contentWidth = contentEl.offsetWidth
        const contentHeight = contentEl.offsetHeight
        // Simple offset handling for manual mode (just assumes number or 0)
        const offset = typeof props.offset === 'number' ? props.offset : 8 

        let top = 0
        let left = 0

        switch (props.position) {
            case 'top':
                top = triggerRect.top - contentHeight - offset
                left = triggerRect.left + (triggerRect.width - contentWidth) / 2
                break
            case 'top-start':
                top = triggerRect.top - contentHeight - offset
                left = triggerRect.left
                break
            case 'top-end':
                top = triggerRect.top - contentHeight - offset
                left = triggerRect.right - contentWidth
                break
            case 'bottom':
                top = triggerRect.bottom + offset
                left = triggerRect.left + (triggerRect.width - contentWidth) / 2
                break
            case 'bottom-start':
                top = triggerRect.bottom + offset
                left = triggerRect.left
                break
            case 'bottom-end':
                top = triggerRect.bottom + offset
                left = triggerRect.right - contentWidth
                break
            case 'left':
                top = triggerRect.top + (triggerRect.height - contentHeight) / 2
                left = triggerRect.left - contentWidth - offset
                break
            case 'left-start':
                top = triggerRect.top
                left = triggerRect.left - contentWidth - offset
                break
            case 'left-end':
                top = triggerRect.bottom - contentHeight
                left = triggerRect.left - contentWidth - offset
                break
            case 'right':
                top = triggerRect.top + (triggerRect.height - contentHeight) / 2
                left = triggerRect.right + offset
                break
            case 'right-start':
                top = triggerRect.top
                left = triggerRect.right + offset
                break
            case 'right-end':
                top = triggerRect.bottom - contentHeight
                left = triggerRect.right + offset
                break
        }

        positionStyles.value = {
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
            margin: 0,
            zIndex: props.zIndex || 9999
        }
    }

    // ============================================
    // Ancestors Scroll & Mutation Logic (Manual)
    // ============================================
    const getScrollParents = (node: Element): Element[] => {
        const parents: Element[] = []
        let current = node.parentElement
        while (current) {
            const style = window.getComputedStyle(current)
            if (['auto', 'scroll', 'overlay'].includes(style.overflow) ||
                ['auto', 'scroll', 'overlay'].includes(style.overflowX) ||
                ['auto', 'scroll', 'overlay'].includes(style.overflowY)) {
                parents.push(current)
            }
            current = current.parentElement
        }
        parents.push(document.documentElement)
        return parents
    }

    const startManualAutoUpdate = () => {
        if (!triggerRef.value) return

        // 1. Window events
        window.addEventListener('resize', updateManualPosition)
        window.addEventListener('scroll', updateManualPosition, true)

        // 2. Ancestors scroll
        const parents = getScrollParents(triggerRef.value)
        parents.forEach(p => p.addEventListener('scroll', updateManualPosition, { passive: true }))

        // 3. Mutation Observer
        const observer = new MutationObserver(updateManualPosition)
        if (triggerRef.value) observer.observe(triggerRef.value, { attributes: true, childList: true, subtree: true })
        
        autoUpdateCleanup = () => {
            window.removeEventListener('resize', updateManualPosition)
            window.removeEventListener('scroll', updateManualPosition, true)
            parents.forEach(p => p.removeEventListener('scroll', updateManualPosition))
            observer.disconnect()
        }
    }

    const startAutoUpdate = () => {
        if (props.floatingUI && floatingUI) {
            floatingUI.startAutoUpdate()
        } else {
            startManualAutoUpdate()
        }
    }

    const stopAutoUpdate = () => {
        if (props.floatingUI && floatingUI) {
            floatingUI.stopAutoUpdate()
        }
        if (autoUpdateCleanup) {
            autoUpdateCleanup()
            autoUpdateCleanup = null
        }
    }

    const updatePosition = () => {
        if (props.floatingUI && floatingUI) {
            floatingUI.updatePosition()
        } else {
            updateManualPosition()
        }
    }

    // ============================================
    // Styles Calculation
    // ============================================
    const finalStyles = computed((): CSSProperties => {
        // Follow cursor override
        if (props.followCursor && isVisible.value) {
            // Handled in Tooltip.vue (mouseX/Y) or we could move it here if we pass mouseX/Y
            // For now, Tooltip.vue handles cursor specific styles in its own computed.
            // But structurally, this composable returns the 'static' position styles.
            return {} 
        }
        
        if (props.floatingUI && floatingUI) {
            return floatingUI.floatingStyles.value
        }
        
        return positionStyles.value
    })

    return {
        tooltipStyles: finalStyles,
        updatePosition,
        startAutoUpdate,
        stopAutoUpdate
    }
}
