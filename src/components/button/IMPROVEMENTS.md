# Button Component - Idées d'Amélioration

## 🎨 Styles & Variantes

### Nouvelles Variantes

- [ ] **Gradient** : Boutons avec dégradés colorés (ex: `from-primary to-accent`)
- [ ] **Glass** : Effet glassmorphism avec `backdrop-blur`
- [ ] **3D** : Effet de profondeur avec ombres décalées
- [ ] **Neon** : Effet lumineux/glow autour du bouton
- [ ] **Pill** : Variante avec `rounded-full` par défaut

### Améliorations Visuelles

- [ ] Animation de ripple au clic (material design)
- [ ] Transitions plus fluides entre les états (hover, active, focus)
- [ ] Support des icônes animées (rotation, pulse)
- [ ] État "success" après une action (checkmark animé)

## ⚡ Fonctionnalités

### Props Additionnelles

- [ ] `loading-text` : Texte affiché pendant le chargement
- [ ] `success` : État de succès avec animation
- [ ] `error` : État d'erreur avec feedback visuel
- [ ] `tooltip` : Tooltip intégré au survol
- [ ] `badge` : Badge/compteur sur le bouton
- [ ] `countdown` : Compte à rebours avant activation

### Comportements

- [ ] Double-click protection (éviter les soumissions multiples)
- [ ] Long press action (action différente sur pression longue)
- [ ] Keyboard shortcuts (raccourcis clavier)
- [ ] Copy to clipboard (avec feedback visuel)

## 🔧 Technique

### Performance

- [ ] Lazy loading des icônes
- [ ] Optimisation du CSS (purge des classes inutilisées)
- [ ] Réduction du bundle size

### Accessibilité

- [ ] Focus visible amélioré
- [ ] Annonces pour les lecteurs d'écran (aria-live)
- [ ] Support du mode high contrast
- [ ] Navigation clavier complète

### Tests

- [ ] Tests unitaires complets
- [ ] Tests d'accessibilité automatisés
- [ ] Tests de performance
- [ ] Documentation Storybook

## 📱 Responsive

- [ ] Tailles adaptatives selon le viewport
- [ ] Touch-friendly pour mobile (zones de tap plus grandes)
- [ ] Haptic feedback sur mobile

## 🎭 Thèmes

- [ ] Support des thèmes personnalisés via CSS variables
- [ ] Presets de couleurs (ex: "ocean", "forest", "sunset")
- [ ] Mode daltonien (couleurs accessibles)

## 💡 Idées Avancées

### Button Groups Améliorés

- [ ] Tabs intégrés
- [ ] Toggle groups (radio/checkbox)
- [ ] Split buttons (action principale + dropdown)
- [ ] Floating action buttons (FAB)

### Intégrations

- [ ] Support de vue-router (bouton comme lien)
- [ ] Intégration avec des bibliothèques d'icônes (Heroicons, Lucide)
- [ ] Composable `useButton` pour logique réutilisable

---

## ✅ Terminé

- [x] Severities : primary, secondary, success, info, warn, help, danger, contrast
- [x] Variants : soft, outlined, subtle, ghost, link
- [x] Sizes : xs, sm, md, lg, xl, 2xl
- [x] Rounded : none, xs, sm, md, lg, xl, 2xl, full
- [x] Shadow : none, sm, md, lg, xl, 2xl, inner
- [x] Ring : none, 1, 2, 4
- [x] Loading state avec spinner
- [x] Icon support avec slots
- [x] ARIA props complets
- [x] Dark mode support
