# 🚀 Toast Component - Improvements & Future Enhancements

Ce document liste les améliorations potentielles et les pistes d'évolution pour le composant Toast.

---

## 📋 Table des Matières

- [Fonctionnalités à Implémenter](#fonctionnalités-à-implémenter)
- [Améliorations UX/UI](#améliorations-uxui)
- [Améliorations Techniques](#améliorations-techniques)
- [Accessibilité (A11y)](#accessibilité-a11y)
- [Performance](#performance)
- [Tests](#tests)

---

## ✨ Fonctionnalités à Implémenter

### 1. Swipe-to-Dismiss (Mobile) [DONE]

- [x] Implémenter le dismiss par swipe sur mobile/tablette
- [ ] Direction configurable (gauche, droite, haut, bas) - _Auto-détection implémentée_
- [x] Animation fluide durant le swipe avec feedback visuel
- [x] Seuil de distance configurable pour valider le dismiss

### 2. Stacking / Expand Mode [DONE]

- [x] Mode "stack" : empiler les toasts les uns sur les autres visuellement
- [x] Mode "expand on hover" : déployer la pile au survol
- [x] Animation de réorganisation lors de l'ajout/suppression

### 3. Promise API [DONE]

- [x] Implémenter le pattern loading -> success/error
- [x] Mise à jour dynamique du contenu

### 4. Actions Asynchrones [DONE]

- [x] Support des boutons avec état de chargement
- [x] Auto-fermeture après succès de l'action
- [x] Gestion des erreurs avec retry automatique

### 5. Undo Pattern [DONE]

- [x] Toast spécialisé "undo"
- [x] API simplifiée pour les actions annulables

```typescript
toast.undo("Email supprimé", () => restoreEmail());
```

### 6. Rich Content [DONE]

- [x] Support du rendu HTML dans la description
- [x] Images inline avec lazy loading
- [x] Liens cliquables avec preview

---

## 🎨 Améliorations UX/UI

### Animations [DONE]

- [x] Animation d'entrée personnalisable (slide, fade, scale, bounce)
- [x] Animation de sortie différente de l'entrée
- [x] Animation de "shake" pour attirer l'attention (auto sur persistent)
- [x] Transition fluide entre les changements de contenu

### Thèmes & Styles [DONE]

- [x] Mode "glassmorphism" optionnel (`variant="glass"`)
- [x] Support des thèmes personnalisés via CSS variables
- [x] Variant "minimal" sans background
- [x] Variant "outlined" avec bordure seulement
- [x] Dark mode automatique basé sur `prefers-color-scheme`

### Layout

- [x] Largeur responsive (xs, s, m, l, xl, full)
- [ ] Support du mode RTL (Right-to-Left)
- [ ] Position relative à un élément (ancrage)

---

## 🔧 Améliorations Techniques

### API [DONE]

- [x] Méthode `toast.update(id, options)` pour modifier un toast existant
- [x] Méthode `toast.dismiss(id)` alias de `remove`
- [x] Méthode `toast.isActive(id)` pour vérifier si un toast est visible
- [x] Événement global `onAdd` / `onRemove` (via Provider)

### State Management [DONE]

- [x] Exporter le state des toasts en tant que composable réactif (`useToastsStore`)
- [x] Persistance optionnelle (localStorage) pour les notifications importantes
- [x] Déduplication automatique basée sur `id`

### Server-Side Rendering [DONE]

- [x] Support complet de Nuxt SSR sans hydration mismatch
- [x] Defer du rendu des toasts côté client uniquement

### TypeScript [DONE]

- [x] Générics pour typer les actions personnalisées
- [ ] Inférence automatique des types d'événements
- [x] Export des types utilitaires (`ToastId`, `SwipeDirection`, etc.)

---

## ♿ Accessibilité (A11y) [PROGRESS]

### Standards WCAG

- [ ] Contraste minimum AA pour tous les thèmes
- [ ] Focus trap optionnel pour les toasts bloquants
- [x] Annonce ARIA correcte selon le type (polite vs assertive)
- [x] Support complet du clavier (Tab, Escape, Enter sur actions)

### Screen Readers

- [ ] Région live-region dédiée pour les annonces
- [ ] Pause des timers quand un screen reader est actif
- [x] Labels descriptifs pour tous les boutons

### Reduced Motion [DONE]

- [x] Respect de `prefers-reduced-motion`
- [x] Fallback sans animation pour les utilisateurs sensibles

---

## ⚡ Performance

### Optimisations

- [ ] Virtualisation pour un grand nombre de toasts (> 10)
- [ ] Lazy rendering des toasts hors viewport
- [ ] Debounce des ajouts multiples rapprochés
- [ ] Cleanup automatique des listeners et observers

### Bundle Size

- [ ] Tree-shaking optimal des sous-composants
- [ ] Séparation du CSS en fichier externe optionnel
- [ ] Lazy loading des icônes selon la sévérité utilisée

---

## 🧪 Tests

### Unit Tests

- [ ] Tests des props et leurs valeurs par défaut
- [ ] Tests des émissions d'événements
- [ ] Tests des computed properties
- [ ] Tests du timer pause/resume

### Integration Tests

- [ ] Test du provider avec plusieurs toasts
- [ ] Test de la limite max
- [ ] Test des raccourcis clavier
- [ ] Test du swipe sur mobile

### E2E Tests

- [ ] Workflow complet d'ajout/suppression
- [ ] Test des animations avec visual regression
- [ ] Test sur différentes tailles d'écran
- [ ] Test de l'accessibilité avec axe-core

### Visual Tests

- [ ] Snapshots de chaque sévérité
- [ ] Snapshots de chaque position
- [ ] Snapshots du mode dark/light
- [ ] Storybook stories pour chaque variation

---

## 📝 Documentation

### À Ajouter

- [ ] Exemples interactifs pour chaque fonctionnalité
- [ ] Guide de migration depuis d'autres librairies (vue-toastification, etc.)
- [ ] Best practices pour l'UX des notifications
- [ ] Playground Stackblitz/CodeSandbox embarqué

### À Améliorer

- [ ] Descriptions plus détaillées des props
- [ ] Exemples de code pour chaque cas d'usage
- [ ] FAQ des problèmes courants
- [ ] Changelog avec breaking changes

---

## 🗓️ Roadmap Suggérée

| Version | Fonctionnalités Clés                     |
| ------- | ---------------------------------------- |
| v1.1    | Swipe-to-dismiss, Promise API            |
| v1.2    | Stacking mode, Animations personnalisées |
| v1.3    | Rich content, Undo pattern               |
| v2.0    | Breaking: Nouvelle API, Headless mode    |

---

## 💡 Notes de Développement

- Garder la compatibilité avec Vue 3.3+
- Maintenir le support de Nuxt 3 et Vite 5
- Éviter les dépendances externes (garder le bundle léger)
- Suivre les conventions de Nuxt UI / Radix Vue pour l'API

---

_Dernière mise à jour : Janvier 2026_
