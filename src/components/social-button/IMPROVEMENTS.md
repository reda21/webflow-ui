# SocialButton Component - Idées d'Amélioration

## 🎨 Styles & Variantes

### Nouveaux Providers

- [ ] **Apple** : Sign in with Apple
- [ ] **Microsoft** : Microsoft Account
- [ ] **Discord** : Discord OAuth
- [ ] **Slack** : Slack Connect
- [ ] **Spotify** : Spotify Login
- [ ] **Amazon** : Login with Amazon
- [ ] **Pinterest** : Pinterest Auth
- [ ] **TikTok** : TikTok Login
- [ ] **PayPal** : PayPal Login
- [ ] **Twitch** : Twitch OAuth

### Styles Alternatifs

- [ ] **Outlined** : Version bordure uniquement
- [ ] **Soft** : Version pastel/légère
- [ ] **Icon Only** : Bouton rond avec icône seulement
- [ ] **Pill** : Version arrondie
- [ ] **With Divider** : Texte "ou continuer avec" intégré

### Améliorations Visuelles

- [ ] Icônes officielles de chaque provider (SVG)
- [ ] Hover effects personnalisés par provider
- [ ] Animations d'entrée
- [ ] Loading state avec spinner personnalisé

## ⚡ Fonctionnalités

### Props Additionnelles

- [ ] `icon-only` : Afficher uniquement l'icône
- [ ] `show-icon` : Toggle l'affichage de l'icône
- [ ] `custom-text` : Texte personnalisé
- [ ] `compact` : Version compacte

### Comportements

- [ ] Redirect automatique vers OAuth
- [ ] Popup mode pour OAuth
- [ ] Callback handlers intégrés
- [ ] Error state avec message

## 🔧 Technique

### Performance

- [ ] Lazy loading des icônes SVG
- [ ] Tree-shaking des providers non utilisés

### Accessibilité

- [ ] Labels descriptifs automatiques
- [ ] Annonces pour les lecteurs d'écran

### Intégrations

- [ ] Support des bibliothèques OAuth (vue-auth, etc.)
- [ ] Composition API hooks (useSocialLogin)

## 💡 Idées Avancées

### Composants Dérivés

- [ ] **SocialButtonGroup** : Groupe de boutons sociaux
- [ ] **SocialLoginForm** : Formulaire de login complet
- [ ] **SocialShare** : Boutons de partage

---

## ✅ Terminé

- [x] Providers : Google, Facebook, GitHub, Twitter, LinkedIn
- [x] Couleurs officielles par provider
- [x] Hover states
- [x] Support des icônes via slot
- [x] Extension de ButtonProps
