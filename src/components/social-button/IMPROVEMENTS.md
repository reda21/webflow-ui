# SocialButton Component - Idées d'Amélioration

## 🎨 Styles & Variantes

### Nouveaux Providers

- [x] **Apple** : Sign in with Apple
- [x] **Microsoft** : Microsoft Account
- [x] **Discord** : Discord OAuth
- [x] **Slack** : Slack Connect
- [x] **Spotify** : Spotify Login
- [x] **Amazon** : Login with Amazon
- [x] **Pinterest** : Pinterest Auth
- [x] **TikTok** : TikTok Login
- [x] **PayPal** : PayPal Login
- [x] **Twitch** : Twitch OAuth

### Styles Alternatifs

- [x] **Outlined** : Version bordure uniquement (supporté via Button)
- [x] **Soft** : Version pastel/légère (supporté via Button)
- [x] **Icon Only** : Bouton rond avec icône seulement
- [x] **Pill** : Version arrondie
- [ ] **With Divider** : Texte "ou continuer avec" intégré

### Améliorations Visuelles

- [x] Icônes officielles de chaque provider (SVG via Iconify)
- [x] Hover effects personnalisés par provider
- [ ] Animations d'entrée
- [ ] Loading state avec spinner personnalisé

## ⚡ Fonctionnalités

### Props Additionnelles

- [x] `icon-only` : Afficher uniquement l'icône
- [x] `show-icon` : Toggle l'affichage de l'icône
- [ ] `custom-text` : Texte personnalisé (via slot par défaut)
- [ ] `compact` : Version compacte

### Comportements

- [ ] Redirect automatique vers OAuth
- [ ] Popup mode pour OAuth
- [ ] Callback handlers intégrés
- [ ] Error state avec message

## 🔧 Technique

### Performance

- [x] Lazy loading des icônes SVG (via Iconify)
- [ ] Tree-shaking des providers non utilisés

### Accessibilité

- [x] Labels descriptifs automatiques
- [x] Annonces pour les lecteurs d'écran

### Intégrations

- [ ] Support des bibliothèques OAuth (vue-auth, etc.)
- [ ] Composition API hooks (useSocialLogin)

## 💡 Idées Avancées

### Composants Dérivés

- [x] **SocialButtonGroup** : Groupe de boutons sociaux
- [ ] **SocialLoginForm** : Formulaire de login complet
- [ ] **SocialShare** : Boutons de partage

---

## ✅ Terminé

- [x] Providers : Google, Facebook, GitHub, Twitter, LinkedIn, etc (15+ providers)
- [x] Couleurs officielles par provider (CSS Variables)
- [x] Hover states (Brightness filters)
- [x] Support des icônes via slot
- [x] Extension de ButtonProps
- [x] Génération automatique des labels "Continuer avec..."
- [x] Support des variantes héritées (outlined, subtle, ghost)
