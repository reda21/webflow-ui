import { ref, type Ref } from 'vue'

const groups = new Map<string, {
  active: Ref<boolean>
  timeout: ReturnType<typeof setTimeout> | null
}>()

export function useTooltipGroup(groupId: string | undefined) {
  if (!groupId) return { isGroupActive: ref(false), registerShow: () => {}, registerHide: () => {} }

  if (!groups.has(groupId)) {
    groups.set(groupId, {
      active: ref(false),
      timeout: null
    })
  }

  const groupState = groups.get(groupId)!

  const registerShow = () => {
    if (groupState.timeout) {
      clearTimeout(groupState.timeout)
      groupState.timeout = null
    }
    groupState.active.value = true
  }

  const registerHide = (delay = 0) => {
    // Keep group active for a short grace period (e.g., 500ms) to allow moving between grouped tooltips
    if (groupState.timeout) clearTimeout(groupState.timeout)
    
    groupState.timeout = setTimeout(() => {
      groupState.active.value = false
      groupState.timeout = null
    }, delay + 500)
  }

  return {
    isGroupActive: groupState.active,
    registerShow,
    registerHide
  }
}
