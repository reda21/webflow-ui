import { ref, computed, watch, type Ref } from 'vue'

export interface UseAvatarOptions {
    src?: string
    alt?: string
    text?: string
    retryAttempts?: number
    retryDelay?: number
}

export interface UseAvatarReturn {
    // State
    imageLoaded: Ref<boolean>
    imageError: Ref<boolean>
    isLoading: Ref<boolean>
    retryCount: Ref<number>
    
    // Computed
    initials: Ref<string>
    displayName: Ref<string>
    gradientStyle: Ref<string>
    
    // Methods
    reload: () => void
    reset: () => void
}

/**
 * Composable for advanced Avatar functionality
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useAvatar } from '@/components/avatar'
 * 
 * const { imageLoaded, initials, gradientStyle, reload } = useAvatar({
 *   src: 'https://example.com/avatar.jpg',
 *   alt: 'John Doe'
 * })
 * </script>
 * ```
 */
export function useAvatar(options: UseAvatarOptions = {}): UseAvatarReturn {
    const {
        src = '',
        alt = '',
        text = '',
        retryAttempts = 3,
        retryDelay = 1000
    } = options
    
    // State
    const imageLoaded = ref(false)
    const imageError = ref(false)
    const retryCount = ref(0)
    const currentSrc = ref(src)
    
    // Computed
    const isLoading = computed(() => !imageLoaded.value && !imageError.value && !!currentSrc.value)
    
    const initials = computed(() => {
        if (text) return text
        if (!alt) return ''
        return alt
            .split(' ')
            .map(word => word[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
    })
    
    const displayName = computed(() => alt || text || 'User')
    
    // Generate gradient from text
    const gradientStyle = computed(() => {
        const source = text || alt || ''
        if (!source) return ''
        
        let hash = 0
        for (let i = 0; i < source.length; i++) {
            const char = source.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash
        }
        
        const hue1 = Math.abs(hash % 360)
        const hue2 = (hue1 + 40) % 360
        
        return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 70%, 50%) 100%)`
    })
    
    // Methods
    const reload = () => {
        if (!src) return
        
        imageError.value = false
        imageLoaded.value = false
        retryCount.value = 0
        
        // Force reload by appending timestamp
        currentSrc.value = `${src}${src.includes('?') ? '&' : '?'}_reload=${Date.now()}`
    }
    
    const reset = () => {
        imageError.value = false
        imageLoaded.value = false
        retryCount.value = 0
        currentSrc.value = src
    }
    
    // Watch for src changes
    watch(() => src, (newSrc) => {
        currentSrc.value = newSrc
        reset()
    })
    
    return {
        imageLoaded,
        imageError,
        isLoading,
        retryCount,
        initials,
        displayName,
        gradientStyle,
        reload,
        reset
    }
}
