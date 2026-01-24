# Skeleton Component - Idées d'Amélioration

## 🎨 Visuel & Animations

- [x] **Animation Wave** : Effet de balayage lumineux premium
- [x] **Couleurs personnalisables** : Permettre de changer la couleur de fond et du shine via des props
- [x] **Glow effect** : Ajouter une variante avec une lueur externe pour les thèmes sombres
- [x] **Dégradés** : Support des squelettes avec dégradés de couleurs
- [ ] **Animations de sortie** : Transition fluide (`fade-out`) lorsque le contenu réel est chargé

## ⚡ Fonctionnalités

- [x] **Prop `as`** : Permettre de rendre n'importe quel élément HTML ou composant
- [x] **Slot `default`** : Permettre d'encapsuler du contenu ou des icônes
- [x] **Alias `USkeleton`** : Compatibilité avec le style de nommage "U"
- [x] **Inferred Size** : Détecter automatiquement la taille du contenu enfant si présent
- [x] **Skeleton Group** : Composant pour gérer des listes de squelettes avec un décalage d'animation (`stagger`)

## 🔧 Technique

- [x] **Tailwind First** : Optimisé pour une utilisation directe avec les classes CSS de Tailwind
- [x] **Performance** : Utilisation de `will-change: transform` sur l'animation wave pour limiter l'usage CPU
- [x] **Unit Tests** : Ajouter la suite de tests unitaires Vitest
- [x] **Documentation interactive** : Enrichir le playground avec des compositions complexes

## ♿ Accessibilité (A11y)

- [x] **Aria-hidden** : Masqué pour les lecteurs d'écran par défaut (quand aucun texte n'est présent)
- [x] **Aria-live** : Permettre d'annoncer l'état de chargement si nécessaire
- [x] **Respect des préférences** : Stopper les animations si `prefers-reduced-motion` est actif

## ✅ Améliorations Implémentées

### Core

- [x] Système de variantes (`circle`, `rounded`, `rectangle`, `line`)
- [x] Système d'animations (`pulse`, `wave`, `none`)
- [x] Dimensionnement flexible (width, height, radius)
- [x] Rendu dynamique via prop `as`
- [x] Support des slots par défaut
