# ButtonGroup Component - Idées d'Amélioration

## 🎨 Styles & Variantes

### Nouvelles Fonctionnalités

- [ ] **Spacing** : Espacement configurable entre les boutons (none, sm, md, lg)
- [ ] **Wrap** : Mode wrap pour les groupes longs
- [ ] **Align** : Alignement (start, center, end, stretch)
- [ ] **Full Width** : Option pour occuper toute la largeur

### Améliorations Visuelles

- [ ] Bordures connectées plus élégantes
- [ ] Ombres groupées (une seule ombre pour tout le groupe)
- [ ] Séparateurs visuels optionnels entre les boutons
- [ ] Effet de highlight sur le groupe complet au hover

## ⚡ Fonctionnalités

### Props Additionnelles

- [ ] `disabled` : Désactiver tout le groupe
- [ ] `loading` : État de chargement global
- [ ] `size` : Forcer une taille pour tous les enfants
- [ ] `variant` : Forcer un variant pour tous les enfants
- [ ] `severity` : Forcer une severity pour tous les enfants

### Comportements

- [ ] **Toggle Mode** : Mode radio (un seul bouton actif)
- [ ] **Checkbox Mode** : Mode checkbox (plusieurs boutons actifs)
- [ ] **Split Button** : Bouton principal + dropdown
- [ ] Keyboard navigation (flèches gauche/droite)

## 🔧 Technique

### Accessibilité

- [ ] ARIA toolbar role pour les groupes de boutons
- [ ] Navigation clavier avec tabindex
- [ ] Annonces pour les lecteurs d'écran

### API

- [ ] Slot pour personnaliser le conteneur
- [ ] Événements pour les changements d'état (toggle)
- [ ] v-model support pour toggle/checkbox modes

## 💡 Idées Avancées

### Variations

- [ ] **Segmented Control** : Style iOS/macOS
- [ ] **Tabs** : Variante onglets
- [ ] **Pagination** : Composant de pagination
- [ ] **Stepper** : Composant étapes

---

## ✅ Terminé

- [x] Direction : horizontal, vertical
- [x] Corners automatiques (first, middle, last)
- [x] Z-index pour hover/focus
- [x] Provide/inject context
