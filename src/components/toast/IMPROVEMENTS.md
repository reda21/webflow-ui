# Toast Component - Idées d'Amélioration

## 🎨 Visuel & Animations

- [x] **Glassmorphism** : Effet de verre dépoli par défaut (backdrop-blur)
- [x] **Barre de progression** : Indicateur visuel du temps restant avant fermeture
- [x] **Transitions directionnelles** : Animations d'entrée dépendant de la position (slide from right, left, top, bottom)
- [ ] **Empilement intelligent** : Limiter le nombre maximum de toasts affichés simultanément
- [ ] **Thèmes personnalisés** : Support de styles spécifiques via CSS variables

## ⚡ Fonctionnalités

- [x] **Multi-positions** : Support de 6 positions (`top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`)
- [x] **Severities** : Variantes visuelles (`success`, `danger`, `warning`, `info`, `contrast`)
- [x] **Actions** : Support d'un bouton d'action interactif dans le toast
- [x] **Composable `useToast`** : API simple pour déclencher des notifications de n'importe où
- [x] **Persistance** : Option `duration: 0` pour garder le toast ouvert indéfiniment

## 🔧 Technique

- [x] **ToastProvider** : Gestionnaire centralisé des notifications injecté via provide/inject
- [x] **Teleport** : (Planifié) Rendre les conteneurs de toasts à la racine du body
- [ ] **Unit Tests** : Ajouter la suite de tests unitaires Vitest
- [ ] **Pausing** : Mettre en pause le timer au survol de la souris

## ♿ Accessibilité (A11y)

- [x] **Aria-live** : Notifications annoncées automatiquement par les lecteurs d'écran
- [x] **Keyboard support** : Possibilité de fermer via le bouton de fermeture
- [ ] **Focus trap** : (Pour les toasts avec actions critiques) Gérer le focus clavier

## ✅ Améliorations Implémentées

### Core

- [x] Système de gestion global via `ToastProvider`
- [x] Composable `useToast` avec raccourcis (`toast.success()`, `toast.error()`, etc.)
- [x] Barre de progression synchronisée avec la durée
- [x] Support des 6 positions standards
- [x] Boutons d'action optionnels
