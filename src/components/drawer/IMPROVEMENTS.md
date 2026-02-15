# Drawer Component - Suggestions d'Amélioration

## Fonctionnalités Actuelles (v1)

- [x] **Placement** : Support des 4 directions (left, right, top, bottom)
- [x] **Tailles** : 6 tailles prédéfinies (xs, sm, md, lg, xl, full)
- [x] **Variantes** : 4 styles visuels (default, glass, minimal, bordered)
- [x] **Overlay** : 4 styles d'overlay (default, blur, dim, none)
- [x] **Animations** : Animations slide fluides pour chaque direction
- [x] **Accessibilité** : role="dialog", aria-modal, aria-label
- [x] **Fermeture** : Bouton close, clic overlay, touche Escape
- [x] **Scroll lock** : Verrouillage du scroll body
- [x] **Lazy rendering** : Rendu paresseux du contenu
- [x] **Slots** : header, default (body), footer
- [x] **Dark mode** : Support complet du thème sombre
- [x] **Responsive** : Pleine largeur sur mobile

## Fonctionnalités à Ajouter

### 1. Interaction Avancée

- [x] **Swipe to close** : Fermeture par glissement tactile (mobile)
- [x] **Draggable resize** : Redimensionnement par drag du bord
- [ ] **Snap points** : Points d'accrochage pour le redimensionnement (ex: 30%, 60%, 100%)
- [x] **Pull indicator** : Indicateur de drag visuel (barre en haut)

### 2. Navigation & Contenu

- [ ] **Nested drawers** : Support des drawers imbriqués (push effect)
- [ ] **Multi-step** : Navigation multi-étapes dans le drawer
- [ ] **Tabs integration** : Intégration avec un composant tabs
- [ ] **Breadcrumb** : Fil d'Ariane pour la navigation interne

### 3. Animations Avancées

- [x] **Push effect** : Pousser le contenu principal au lieu de le recouvrir (persistent mode)
- [ ] **Scale backdrop** : Effet de scale sur le contenu derrière
- [ ] **Spring physics** : Animations basées sur la physique (spring)
- [ ] **Stagger children** : Animation séquentielle des enfants à l'ouverture

### 4. Variantes Additionnelles

- [ ] **Neumorphic** : Style neumorphique
- [x] **Elevated** : Ombre portée élévée premium
- [ ] **Gradient border** : Bordure avec gradient animé
- [ ] **Frosted** : Effet verre dépoli intense

### 5. Fonctionnalités UX

- [x] **Persistent drawer** : Mode sidebar permanente (non-overlay)
- [x] **Mini mode** : Mode réduit avec icônes uniquement
- [x] **Auto-close timer** : Fermeture automatique après un délai
- [x] **Confirm on close** : Confirmation avant fermeture (données non sauvegardées)
- [x] **Loading skeleton** : Skeleton placeholder pendant le chargement

### 6. Personnalisation

- [x] **Custom transitions** : Transitions CSS personnalisables via prop
- [x] **Width/height custom** : Taille personnalisée en px/rem/%
- [ ] **Rounded corners** : Contrôle fin des coins arrondis
- [ ] **Shadow customization** : Personnalisation de l'ombre portée
- [ ] **UI prop** : Deep styling config (pattern Nuxt UI)

### 7. Accessibilité Avancée

- [ ] **Focus trap** : Piège de focus complet dans le drawer
- [x] **Focus restore** : Restauration du focus à la fermeture
- [ ] **Screen reader announcements** : Annonces personnalisées
- [x] **Reduced motion** : Respect de prefers-reduced-motion

### 8. Composants Complémentaires

- [ ] **DrawerGroup** : Gestion de plusieurs drawers simultanés
- [x] **useDrawer composable** : API composable pour ouvrir/fermer programmatiquement
- [ ] **DrawerRenderer** : Rendu déclaratif via composable (comme ModalRenderer)

### 9. Performance

- [ ] **Virtual scroll** : Virtualisation du contenu long
- [x] **Teleport optimization** : Optimisation du rendu avec Teleport
- [ ] **SSR support** : Compatibilité Server-Side Rendering complète

### 10. Intégration

- [ ] **Vue Router** : Drawer lié à une route (URL state)
- [ ] **Form integration** : Validation de formulaire avant fermeture
- [ ] **Keyboard shortcuts** : Raccourcis clavier personnalisables
