import { ref, computed, type Ref } from 'vue'

export interface UseDrawerOptions {
    defaultOpen?: boolean
}

export interface UseDrawerReturn {
    isOpen: Ref<boolean>
    open: () => void
    close: () => void
    toggle: () => void
    setOpen: (value: boolean) => void
}

export function useDrawer(options: UseDrawerOptions = {}): UseDrawerReturn {
    const isOpen = ref(options.defaultOpen ?? false)

    const open = () => {
        isOpen.value = true
    }

    const close = () => {
        isOpen.value = false
    }

    const toggle = () => {
        isOpen.value = !isOpen.value
    }

    const setOpen = (value: boolean) => {
        isOpen.value = value
    }

    return {
        isOpen,
        open,
        close,
        toggle,
        setOpen,
    }
}

export interface UseDrawerStackReturn {
    drawers: Ref<Map<string, boolean>>
    open: (id: string) => void
    close: (id: string) => void
    toggle: (id: string) => void
    isOpen: (id: string) => boolean
    closeAll: () => void
}

export function useDrawerStack(): UseDrawerStackReturn {
    const drawers = ref(new Map<string, boolean>())

    const open = (id: string) => {
        drawers.value.set(id, true)
    }

    const close = (id: string) => {
        drawers.value.set(id, false)
    }

    const toggle = (id: string) => {
        const current = drawers.value.get(id) ?? false
        drawers.value.set(id, !current)
    }

    const isOpen = (id: string): boolean => {
        return drawers.value.get(id) ?? false
    }

    const closeAll = () => {
        drawers.value.clear()
    }

    return {
        drawers,
        open,
        close,
        toggle,
        isOpen,
        closeAll,
    }
}
