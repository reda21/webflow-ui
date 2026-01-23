# Tooltip Component - Schéma de Création

Ce document définit la structure complète du composant Tooltip avec tous les éléments nécessaires à sa création.

---

## 📁 Structure du Dossier

```
tooltip/
├── SCHEMA.md           # Ce document (schéma de création)
├── IMPROVEMENTS.md     # Idées d'améliorations futures
├── types.ts            # Définitions TypeScript
├── Tooltip.vue         # Composant principal
├── TooltipTrigger.vue  # Élément déclencheur (optionnel)
├── TooltipContent.vue  # Contenu du tooltip (optionnel)
├── tooltip.css         # Styles CSS
├── index.ts            # Exports du module
├── useTooltip.ts       # Composable (logique réutilisable)
├── Tooltip.test.ts     # Tests unitaires
├── Tooltip.a11y.test.ts # Tests d'accessibilité
└── Tooltip.perf.test.ts # Tests de performance
```

---

## 📋 Types à Définir (`types.ts`)

### Types de Base

```typescript
// Position du tooltip
export type TooltipPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

// Déclencheur d'affichage
export type TooltipTrigger = "hover" | "click" | "focus" | "manual";

// Thème/variante
export type TooltipVariant =
  | "dark"
  | "light"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

// Taille
export type TooltipSize = "xs" | "sm" | "md" | "lg";

// Forme de la flèche
export type TooltipArrow = "none" | "sm" | "md" | "lg";

// Animation
export type TooltipAnimation = "fade" | "scale" | "slide" | "none";
```

### Interface Props Principale

```typescript
export interface TooltipProps {
  // Contenu
  content?: string;
  title?: string;

  // Positionnement
  position?: TooltipPosition;
  offset?: number | [number, number];
  flip?: boolean; // Auto-flip si pas assez d'espace
  shift?: boolean; // Auto-shift pour rester visible

  // Apparence
  variant?: TooltipVariant;
  size?: TooltipSize;
  arrow?: TooltipArrow;
  maxWidth?: string | number;
  zIndex?: number;

  // Comportement
  trigger?: TooltipTrigger | TooltipTrigger[];
  delay?: number | { show: number; hide: number };
  duration?: number; // Durée d'affichage (0 = infini)
  interactive?: boolean; // Peut-on interagir avec le tooltip?
  hideOnClick?: boolean;
  closeOnEscape?: boolean;

  // Animation
  animation?: TooltipAnimation;
  animationDuration?: number;

  // État
  disabled?: boolean;
  modelValue?: boolean; // v-model pour contrôle manuel
  defaultOpen?: boolean;

  // Accessibilité
  ariaLabel?: string;
  ariaDescribedby?: string;
  role?: "tooltip" | "dialog";

  // Avancé
  appendTo?: string | HTMLElement;
  portal?: boolean; // Téléporter dans le body
  singleton?: boolean; // Partager une instance
}
```

### Interface Slot Props

```typescript
export interface TooltipSlotProps {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}
```

### Interface Emits

```typescript
export interface TooltipEmits {
  "update:modelValue": [value: boolean];
  show: [];
  hide: [];
  "before-show": [];
  "before-hide": [];
}
```

---

## 🎨 Styles CSS (`tooltip.css`)

### Variables CSS

```css
:root {
  /* Couleurs */
  --tooltip-bg: var(--color-neutral-900);
  --tooltip-text: var(--color-white);
  --tooltip-border: transparent;

  /* Dimensions */
  --tooltip-padding-x: 0.75rem;
  --tooltip-padding-y: 0.5rem;
  --tooltip-border-radius: var(--radius-md);
  --tooltip-max-width: 300px;
  --tooltip-z-index: 9999;

  /* Arrow */
  --tooltip-arrow-size: 8px;

  /* Animation */
  --tooltip-animation-duration: 150ms;
  --tooltip-animation-timing: ease-out;

  /* Ombres */
  --tooltip-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Classes à Implémenter

```css
/* Structure */
.tooltip {
}
.tooltip-wrapper {
}
.tooltip-trigger {
}
.tooltip-content {
}
.tooltip-arrow {
}
.tooltip-title {
}
.tooltip-body {
}

/* Positions */
.tooltip--top {
}
.tooltip--top-start {
}
.tooltip--top-end {
}
.tooltip--bottom {
}
.tooltip--bottom-start {
}
.tooltip--bottom-end {
}
.tooltip--left {
}
.tooltip--left-start {
}
.tooltip--left-end {
}
.tooltip--right {
}
.tooltip--right-start {
}
.tooltip--right-end {
}

/* Variantes */
.tooltip--dark {
}
.tooltip--light {
}
.tooltip--primary {
}
.tooltip--success {
}
.tooltip--warning {
}
.tooltip--danger {
}
.tooltip--info {
}

/* Tailles */
.tooltip--xs {
}
.tooltip--sm {
}
.tooltip--md {
}
.tooltip--lg {
}

/* États */
.tooltip--visible {
}
.tooltip--hidden {
}
.tooltip--disabled {
}
.tooltip--interactive {
}

/* Animations */
.tooltip--fade-enter {
}
.tooltip--fade-leave {
}
.tooltip--scale-enter {
}
.tooltip--scale-leave {
}
.tooltip--slide-enter {
}
.tooltip--slide-leave {
}

/* Flèches par position */
.tooltip-arrow--top {
}
.tooltip-arrow--bottom {
}
.tooltip-arrow--left {
}
.tooltip-arrow--right {
}
```

---

## 🧩 Composant Vue (`Tooltip.vue`)

### Structure Template

```vue
<template>
  <div class="tooltip" :class="tooltipClasses">
    <!-- Trigger Element -->
    <div ref="triggerRef" class="tooltip-trigger" v-bind="triggerProps">
      <slot :is-open="isOpen" :show="show" :hide="hide" :toggle="toggle" />
    </div>

    <!-- Tooltip Content -->
    <Teleport :to="appendTo" :disabled="!portal">
      <Transition :name="animationName">
        <div
          v-if="isOpen"
          ref="contentRef"
          class="tooltip-content"
          :class="contentClasses"
          :style="contentStyles"
          role="tooltip"
          :aria-label="ariaLabel"
        >
          <!-- Arrow -->
          <div
            v-if="arrow !== 'none'"
            class="tooltip-arrow"
            :class="arrowClasses"
          />

          <!-- Title (optionnel) -->
          <div v-if="title || $slots.title" class="tooltip-title">
            <slot name="title">{{ title }}</slot>
          </div>

          <!-- Body -->
          <div class="tooltip-body">
            <slot name="content">{{ content }}</slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
```

### Script Setup

```typescript
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { TooltipProps, TooltipEmits } from './types'
import { useTooltip } from './useTooltip'

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  variant: 'dark',
  size: 'md',
  arrow: 'md',
  trigger: 'hover',
  delay: 0,
  animation: 'fade',
  animationDuration: 150,
  flip: true,
  shift: true,
  interactive: false,
  hideOnClick: true,
  closeOnEscape: true,
  portal: true,
  appendTo: 'body'
})

const emit = defineEmits<TooltipEmits>()

// Composable avec toute la logique
const {
  isOpen,
  show,
  hide,
  toggle,
  triggerRef,
  contentRef,
  triggerProps,
  contentStyles
} = useTooltip(props, emit)

// Classes computées
const tooltipClasses = computed(() => [...])
const contentClasses = computed(() => [...])
const arrowClasses = computed(() => [...])
const animationName = computed(() => `tooltip--${props.animation}`)
</script>
```

---

## 🔧 Composable (`useTooltip.ts`)

### Logique à Implémenter

```typescript
export function useTooltip(props: TooltipProps, emit: TooltipEmits) {
  // Refs
  const isOpen = ref(props.defaultOpen ?? false)
  const triggerRef = ref<HTMLElement | null>(null)
  const contentRef = ref<HTMLElement | null>(null)

  // Méthodes principales
  const show = () => { ... }
  const hide = () => { ... }
  const toggle = () => { ... }

  // Gestion des délais
  const showWithDelay = () => { ... }
  const hideWithDelay = () => { ... }

  // Positionnement (calcul dynamique)
  const calculatePosition = () => { ... }

  // Event handlers
  const onMouseEnter = () => { ... }
  const onMouseLeave = () => { ... }
  const onFocus = () => { ... }
  const onBlur = () => { ... }
  const onClick = () => { ... }
  const onKeydown = (e: KeyboardEvent) => { ... }

  // Flip & Shift logic
  const autoFlip = () => { ... }
  const autoShift = () => { ... }

  // Cleanup on unmount
  onMounted(() => { ... })
  onUnmounted(() => { ... })

  return {
    isOpen,
    show,
    hide,
    toggle,
    triggerRef,
    contentRef,
    triggerProps,
    contentStyles
  }
}
```

---

## ♿ Accessibilité (A11y)

### Exigences WCAG

| Critère   | Implémentation                      |
| --------- | ----------------------------------- |
| **4.1.2** | `role="tooltip"` sur le contenu     |
| **1.3.1** | Association via `aria-describedby`  |
| **2.1.1** | Accessible au clavier (focus)       |
| **2.1.2** | Pas de piège clavier (Escape ferme) |
| **1.4.3** | Contraste suffisant (4.5:1 minimum) |
| **2.2.1** | Délai configurable pour affichage   |

### Attributs ARIA

```html
<!-- Trigger -->
<button aria-describedby="tooltip-id" aria-expanded="true/false">
  Trigger
</button>

<!-- Tooltip -->
<div id="tooltip-id" role="tooltip" aria-hidden="false">Contenu</div>
```

---

## 🧪 Tests à Implémenter

### Tests Unitaires (`Tooltip.test.ts`)

```typescript
describe("Tooltip", () => {
  // Rendu
  it("renders trigger slot correctly");
  it("renders content when visible");
  it("hides content by default");

  // Props
  it("applies correct position class");
  it("applies correct variant class");
  it("applies correct size class");
  it("renders arrow when arrow prop is not none");
  it("respects maxWidth prop");

  // Triggers
  it("shows on hover when trigger is hover");
  it("shows on click when trigger is click");
  it("shows on focus when trigger is focus");
  it("supports multiple triggers");

  // Comportement
  it("respects delay prop");
  it("closes on Escape key");
  it("hides on click outside");
  it("stays open when interactive");

  // v-model
  it("syncs with v-model");
  it("emits update:modelValue");
});
```

### Tests A11y (`Tooltip.a11y.test.ts`)

```typescript
describe("Tooltip Accessibility", () => {
  it("has correct role attribute");
  it("has aria-describedby on trigger");
  it("is focusable");
  it("closes on Escape");
  it("meets color contrast requirements");
  it("has visible focus indicator");
});
```

### Tests Performance (`Tooltip.perf.test.ts`)

```typescript
describe("Tooltip Performance", () => {
  it("mounts within acceptable time");
  it("updates position efficiently");
  it("handles rapid show/hide without memory leaks");
});
```

---

## 📝 Utilisation Prévue

### Basique

```vue
<Tooltip content="Message d'aide">
  <button>Survolez-moi</button>
</Tooltip>
```

### Avec Position

```vue
<Tooltip content="Info" position="right">
  <Icon name="info" />
</Tooltip>
```

### Avec Variante

```vue
<Tooltip content="Attention!" variant="warning">
  <span>Texte</span>
</Tooltip>
```

### Interactif

```vue
<Tooltip interactive :delay="{ show: 100, hide: 300 }">
  <template #default>
    <button>Options</button>
  </template>
  <template #content>
    <div class="tooltip-menu">
      <a href="#">Action 1</a>
      <a href="#">Action 2</a>
    </div>
  </template>
</Tooltip>
```

### Contrôle Manuel

```vue
<Tooltip v-model="isOpen" trigger="manual">
  <button @click="isOpen = !isOpen">Toggle</button>
</Tooltip>
```

---

## 🔄 Dépendances

| Dépendance         | Usage                                          |
| ------------------ | ---------------------------------------------- |
| `@floating-ui/vue` | Positionnement intelligent (optionnel)         |
| `@vueuse/core`     | Utilitaires (onClickOutside, useEventListener) |

---

## ✅ Checklist de Création

- [ ] Créer le dossier `tooltip/`
- [ ] Créer `types.ts` avec tous les types
- [ ] Créer `tooltip.css` avec les variables et classes
- [ ] Créer `useTooltip.ts` avec la logique
- [ ] Créer `Tooltip.vue` composant principal
- [ ] Créer `index.ts` pour les exports
- [ ] Créer `Tooltip.test.ts` tests unitaires
- [ ] Créer `Tooltip.a11y.test.ts` tests accessibilité
- [ ] Créer `Tooltip.perf.test.ts` tests performance
- [ ] Créer `IMPROVEMENTS.md` pour les évolutions futures
- [ ] Ajouter export dans `src/index.ts`
- [ ] Documenter dans le playground

---

## 🚀 Évolutions Futures

Voir `IMPROVEMENTS.md` pour les idées d'améliorations :

- Tooltips groupés (singleton)
- Support HTML riche
- Thèmes personnalisés
- Animations avancées
- Support mobile (touch events)
- Intégration avec système de shortcut
