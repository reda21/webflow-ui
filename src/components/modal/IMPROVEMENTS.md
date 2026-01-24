# Modal Component - Idées d'Amélioration

## 🎨 Styles & Variantes

### Nouvelles Variantes

- [x] **Drawer / Side Panel** : Modale s'ouvrant depuis les bords (gauche, droite, haut, bas)
- [x] **Bottom Sheet** : Modale optimisée pour le mobile s'ouvrant depuis le bas avec "drag handle"
- [x] **Neumorphism** : Style avec ombres douces pour un effet de relief
- [x] **Glass** : Effet glassmorphism avec `backdrop-blur` (Déjà implémenté)
- [x] **Clean** : Variante sans bordures avec ombre portée accentuée

### Améliorations Visuelles

- [x] **Transitions Personnalisables** : Support de plusieurs types d'animations (fade, slide, zoom, bounce)
- [x] **Overlay Animé** : Gradients de couleur animés pour le fond de la modale
- [x] **Progress Bar** : Barre de progression intégrée en haut de la modale pour les processus longs
- [x] **Success/Error States** : Feedback visuel global de la modale selon le résultat d'une action

## ⚡ Fonctionnalités

### Props Additionnelles

- [x] **loading** : État de chargement global bloquant les interactions
- [x] **draggable** : Possibilité de déplacer la modale à la souris (via le header)
- [x] **resizable** : Possibilité de redimensionner la modale (handle en bas à droite)
- [x] **sticky-header/footer** : Garder le header et footer visibles pendant le scroll du body
- [x] **auto-close** : Fermeture automatique après un délai défini (prop `autoClose`)

### Comportements

- [x] **Swipe to Dismiss** : Fermeture par geste sur mobile pour les Bottom Sheets (via `swipeToDismiss`)
- [x] **Multi-step / Wizard** : Support natif pour la navigation entre plusieurs étapes (via prop `step`)
- [x] **Focus Trap** : Gestion native par Radix Vue (activé par défaut)
- [x] **Scroll Lock** : Gestion native par Radix Vue (`preventScroll` amélioré)
- [x] **Nested Modals** : Gestion de l'empilement via `provide/inject` pour le suivi de profondeur

## 🔧 Technique

### Performance

- [x] **Lazy Loading** : Chargement du contenu uniquement à l'ouverture (activé par défaut via `lazy`)
- [x] **Pre-fetching / Persistence** : Possibilité de garder le contenu en mémoire via `unmountOnClose: false`
- [x] **SSR Optimization** : Support ClientOnly et vérifications `isMounted` pour une hydratation stable avec Nuxt/Vue SSR

### Accessibilité

- [x] **ARIA Labels** : Support complet des attributs ARIA (Déjà implémenté)
- [x] **Keyboard Navigation** : Support complet de Escape et Tab (Déjà implémenté)
- [x] **Aria-live Notifications** : Annonces vocales lors des changements d'état (ouverture, fermeture, chargement, étapes) via `aria-live="polite"`

### Tests

- [ ] **Unit Tests** : Tests des émissions et des états d'ouverture
- [ ] **E2E Tests** : Tests des interactions complexes et du Focus Trap
- [ ] **Visual Regression** : Tests de non-régression sur les variantes CSS

## 📱 Responsive

- [x] **Full Screen Mobile** : Option pour passer en plein écran sur petit viewport (prop `fullscreen` ou `size: 'full'`)
- [x] **Adaptive Padding** : Ajustement automatique des marges selon la taille de l'écran (via prop `adaptivePadding`)
- [x] **Haptic Feedback** : Retour haptique lors de l'ouverture/fermeture sur mobile (via prop `haptic`, utilise `navigator.vibrate`)

## 🎭 Thèmes

- [x] **Dark Mode** : Support natif via variables CSS
- [x] **Contextual Severities** : Thèmes automatiques pour Info, Success, Warning, Danger (Icones auto)
- [x] **Custom Overlays** : Faciliter la personnalisation de l'opacité et du flou de l'overlay

## 💡 Idées Avancées

### Programmatic API

- [x] **useModal()** : Composable pour ouvrir des modales dynamiquement sans template (standardisation)
- [x] **Global Modal Store** : Gestion centralisée pour éviter les conflits de z-index

---

## ✅ Terminé

- [x] Tailles : sm, md, lg, xl, full, auto
- [x] Variantes : default, clean, glass
- [x] Intégration Radix Vue pour l'accessibilité
- [x] Support des slots : header, body, footer
- [x] Mode plein écran (fullscreen)
- [x] Fermeture via Overlay et Escape
- [x] Support du Portal (Teleport) pour éviter les problèmes de z-index
- [x] Style personnalisé via prop `ui`
- [x] Gestion de l'état `v-model` (`modelValue` et `open`)
- [x] Personnalisation des classes CSS individuelles (`headerClass`, `bodyClass`, etc.)
- [x] Contrôle du scroll du body (`preventScroll`)
- [x] Support des rôles ARIA (`dialog`, `alertdialog`)
- [x] Événements de cycle de vie (`open`, `close`, `after-enter`, `after-leave`)
- [x] Support des titres et descriptions via props ou slots
- [x] **Drawers** : Support des positions top, right, bottom, left
- [x] **Animations** : Support de scale, slide, fade, zoom, bounce
- [x] **Indicateur de chargement** : Barre de progression intégrée (déterminée ou indéterminée)
- [x] **Sévérités** : États visuels success, danger, warning, info
- [x] **Variantes d'Overlay** : Blur, dim, gradient
