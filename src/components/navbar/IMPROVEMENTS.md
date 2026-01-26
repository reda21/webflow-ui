# Navbar Component - Améliorations Proposées

Ce document liste les améliorations potentielles pour le composant Navbar et ses sous-composants (NavLinks, NavLogo).

---

## 🎯 Haute Priorité

### 1. Support des Menus Déroulants (Dropdowns)

**Complexité**: Moyenne | **Impact**: Élevé

Ajouter le support des sous-menus pour les éléments de navigation.

```typescript
// types.ts - Extension de NavItem
export interface NavItem {
  label: string;
  href: string;
  // ... existing props
  children?: NavItem[]; // Sous-menu items
  dropdownAlign?: "left" | "right" | "center";
}
```

**À implémenter**:

- Composant `NavDropdown.vue` avec animation au hover/focus
- Support clavier (Escape pour fermer, flèches pour naviguer)
- Mega-menu optionnel pour les menus complexes

---

### 2. Intégration avec Vue Router / Nuxt

**Complexité**: Faible | **Impact**: Élevé

Actuellement, les liens utilisent des balises `<a>`. Ajouter le support natif pour `<NuxtLink>` ou `<RouterLink>`.

```typescript
// types.ts
export interface NavItem {
  // ...
  to?: RouteLocationRaw; // Pour vue-router
  href?: string; // Pour liens classiques
}

// NavbarProps
export interface NavbarProps {
  // ...
  useRouterLinks?: boolean; // Utiliser router-link au lieu de <a>
}
```

---

### 3. Composant de Recherche Intégré (Palette de Commandes)

**Complexité**: Élevée | **Impact**: Élevé

Remplacer le simple bouton de recherche par une vraie palette de commandes modal (style `Cmd+K`).

**Fonctionnalités**:

- Modal de recherche avec animation
- Raccourci clavier `Cmd/Ctrl + K`
- Historique de recherche récent
- Catégories de résultats (Pages, Actions, Documentation)
- Slot pour personnaliser les résultats

---

## 🔧 Priorité Moyenne

### 4. Système de Notifications/Badges Avancé

**Complexité**: Faible | **Impact**: Moyen

Améliorer le système de badges existant.

```typescript
export interface NavItem {
  // ...
  badge?:
    | string
    | number
    | {
        value: string | number;
        variant?: "info" | "success" | "warning" | "error";
        pulse?: boolean; // Animation pulsante pour attirer l'attention
      };
}
```

---

### 5. Prop `breakpoint` Configurable

**Complexité**: Faible | **Impact**: Moyen

Permettre de personnaliser le point de basculement mobile/desktop.

```typescript
export interface NavbarProps {
  // ...
  breakpoint?: "sm" | "md" | "lg" | "xl" | number; // Par défaut: 'lg' (1024px)
}
```

**CSS à générer dynamiquement** pour le breakpoint personnalisé.

---

### 6. Animation de Scroll (Hide on Scroll Down)

**Complexité**: Moyenne | **Impact**: Moyen

Ajouter une option pour masquer la navbar au scroll vers le bas et la réafficher au scroll vers le haut.

```typescript
export interface NavbarProps {
  // ...
  hideOnScroll?: boolean;
  scrollThreshold?: number; // Pixels avant de déclencher
}
```

---

### 7. Slot pour Actions Personnalisées dans le Menu Mobile

**Complexité**: Faible | **Impact**: Moyen

Ajouter plus de flexibilité dans le menu mobile.

```vue
<template>
  <!-- Ajouter ces slots -->
  <slot name="mobile-header" />
  <!-- En haut du menu mobile -->
  <slot name="mobile-actions" />
  <!-- Zone d'actions (réseaux sociaux, etc.) -->
  <slot name="mobile-footer" />
  <!-- Pied du menu mobile -->
</template>
```

---

### 8. Support des Groupes de Navigation

**Complexité**: Moyenne | **Impact**: Moyen

Organiser les liens en groupes avec des séparateurs.

```typescript
export interface NavGroup {
  label?: string; // Titre optionnel du groupe
  items: NavItem[];
  separator?: boolean; // Afficher un séparateur après ce groupe
}

export interface NavbarProps {
  navItems?: (NavItem | NavGroup)[];
}
```

---

## 💡 Priorité Basse (Nice to Have)

### 9. Mode Sidebar Coulissante pour Mobile

**Complexité**: Moyenne | **Impact**: Faible

Alternative au menu déroulant actuel : une sidebar qui glisse depuis le côté.

```typescript
export interface NavbarProps {
  // ...
  mobileMenuStyle?:
    | "dropdown"
    | "sidebar-left"
    | "sidebar-right"
    | "fullscreen";
}
```

---

### 10. Skeleton Loading State

**Complexité**: Faible | **Impact**: Faible

Ajouter un état de chargement pour les données asynchrones (items de navigation chargés via API).

```typescript
export interface NavbarProps {
  // ...
  loading?: boolean;
  skeletonItemCount?: number; // Nombre d'items placeholder à afficher
}
```

---

### 11. Support Multi-niveau pour le Menu Mobile

**Complexité**: Moyenne | **Impact**: Faible

Permettre la navigation dans les sous-menus sur mobile avec animations de transition entre niveaux.

---

### 12. Personnalisation des Icônes via Props

**Complexité**: Faible | **Impact**: Faible

```typescript
export interface NavbarProps {
  // ...
  icons?: {
    search?: string;
    themeLight?: string;
    themeDark?: string;
    menuOpen?: string;
    menuClose?: string;
    external?: string;
  };
}
```

---

### 13. Variantes de Couleurs Supplémentaires

**Complexité**: Faible | **Impact**: Faible

```typescript
export interface NavbarProps {
  // ...
  color?: "default" | "primary" | "secondary" | "dark" | "light";
}
```

---

### 14. Événement `scroll` et Progression de Page

**Complexité**: Moyenne | **Impact**: Faible

Ajouter une barre de progression de lecture (scroll progress) optionnelle.

```typescript
export interface NavbarProps {
  // ...
  showScrollProgress?: boolean;
  scrollProgressColor?: string;
}
```

---

## 🐛 Corrections / Améliorations Techniques

### 15. Hydration SSR Fix ✅

**Status**: Corrigé

Le composant `Icon` utilisé dans NavLinks causait des erreurs d'hydratation. Corrigé en utilisant `isMounted` au lieu de `isClient`.

---

### 16. Accessibilité (A11y)

**Complexité**: Moyenne | **Impact**: Élevé

- [ ] Ajouter `aria-expanded` sur le bouton mobile
- [ ] Ajouter `aria-current="page"` sur l'élément actif
- [ ] Support complet du clavier pour la navigation
- [ ] Focus trap dans le menu mobile
- [ ] Annonces screen reader pour les changements d'état

---

### 17. Tests Unitaires

**Complexité**: Moyenne | **Impact**: Élevé

Ajouter des tests pour :

- [ ] Rendu des différentes variantes
- [ ] Interactions (clics, toggle mobile)
- [ ] Slots personnalisés
- [ ] Responsive behavior
- [ ] Accessibilité

---

## 📊 Matrice de Priorisation

| Amélioration      | Impact    | Effort | Priorité |
| ----------------- | --------- | ------ | -------- |
| Dropdowns         | 🔥 Élevé  | Moyen  | ⭐⭐⭐   |
| Router Links      | 🔥 Élevé  | Faible | ⭐⭐⭐   |
| Palette Recherche | 🔥 Élevé  | Élevé  | ⭐⭐⭐   |
| A11y              | 🔥 Élevé  | Moyen  | ⭐⭐⭐   |
| Breakpoint Config | 🔶 Moyen  | Faible | ⭐⭐     |
| Hide on Scroll    | 🔶 Moyen  | Moyen  | ⭐⭐     |
| Badges Avancés    | 🔶 Moyen  | Faible | ⭐⭐     |
| Mobile Sidebar    | 🔷 Faible | Moyen  | ⭐       |
| Skeleton Loading  | 🔷 Faible | Faible | ⭐       |
