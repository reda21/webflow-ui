# Avatar Components - Improvement Ideas

This document outlines potential improvements for each component in the Avatar module.

---

## 📦 Avatar.vue (Main Component)

### Features

- [x] **Color Variants** - Add `color` prop with predefined themes (primary, success, warning, danger) or custom hex values for background
- [x] **Skeleton Loading State** - Add `skeleton` prop to display an animated skeleton placeholder while content loads
- [ ] **Badge Support** - Native badge integration (beyond chip) for notifications count or verification badges
- [x] **Ring/Border Customization** - Add `ring` prop to control ring color and width independently
- [x] **Hover Effects** - Built-in hover animations (scale, glow, lift) via `hoverEffect` prop
- [x] **Custom Fallback Priority** - Allow configurable fallback order: `fallbackPriority: ['initials', 'icon', 'placeholder']`
- [x] **Gradient Backgrounds** - Support gradient colors for fallback backgrounds based on initials hash

### Performance

- [x] **Lazy Loading by Default** - Make `loading="lazy"` the default for images
- [x] **Image Preloading** - Add `preload` prop for critical above-the-fold avatars
- [x] **Blur Hash** - Support blur hash placeholders during image load

### Accessibility

- [x] **ARIA Labels** - Auto-generate accessible labels from `alt` prop via `ariaLabel` prop
- [x] **Focus Ring** - Visible focus indicator when Avatar is interactive (`interactive` prop)

---

## 🖼️ AvatarImage.vue

### Features

- [x] **Transition Effects** - Smooth fade-in animation when image loads
- [x] **Retry Logic** - Auto-retry failed image loads with exponential backoff (`retryAttempts`, `retryDelay` props)
- [x] **Placeholder During Load** - Show low-res placeholder or blur while loading (`placeholder` prop)
- [x] **Object Fit Control** - Add `objectFit` prop ('cover', 'contain', 'fill')

### Props to Add

- [x] `loading` - Support eager/lazy loading
- [x] `srcset` / `sizes` - Responsive image support
- [x] `crossorigin` - CORS handling
- [x] `referrerpolicy` - Referrer policy control

---

## 👤 AvatarFallback.vue

### Features

- [x] **Icon Fallback** - Support icon prop for cases where even initials aren't appropriate
- [x] **Custom Colors** - Allow custom text/background colors for fallback
- [x] **Delay Show** - Add `delayMs` prop to prevent flash when image loads fast
- [ ] **Random Color Generation** - Generate consistent colors based on name/text hash

### Improvements

- [x] **Fix context types** - Updated to use proper `AvatarContext` type
- [x] **Icon support** - Added icon prop with Icon component integration

---

## 👥 AvatarGroup.vue

### Features

- [x] **New Size Support** - Added all sizes: `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- [x] **Reverse Order** - Add `reverse` prop to show newest/first avatars on top
- [x] **Tooltip on Overflow** - Show tooltip with names of hidden avatars on "+N" hover (`tooltipNames` prop)
- [x] **Expand on Hover/Click** - Animate to reveal all avatars on interaction (`expandable` prop)
- [x] **Custom Overflow Indicator** - Allow custom component/slot for the "+N" badge (`overflow` slot)
- [x] **Orientation** - Added `orientation: 'horizontal' | 'vertical'` support

### Props to Add

- [x] `ring` - Control ring color (to match parent background)
- [x] `animated` - Enable entrance animations for avatars
- [x] `overflowPlacement` - Position overflow indicator at 'start' or 'end'

### Bug Fixes

- [x] **Size Type Mismatch** - Fixed `AvatarSize` in `sizeClasses` to include all sizes

---

## 🎨 avatar.css

### Improvements

- [x] **CSS Custom Properties** - Added CSS variables for easy theming
- [x] **Animation Keyframes** - Added animations for loading, pulse, pop-in
- [x] **Ring Utilities** - Separate ring styles for reusability
- [x] **Color Variants** - Added all color variant classes
- [x] **Chip Positions** - Added all 4 position options for chip
- [x] **Chip Colors** - Added all color options for chip
- [x] **Hover Effects** - Added scale, glow, lift effects
- [x] **Skeleton State** - Added skeleton loading animation
- [x] **Focus States** - Added interactive focus ring styles
- [x] **Blur Hash** - Added blur hash placeholder styles

---

## 📝 types.ts

### Improvements

- [x] **Stricter Types** - Using proper HTML attribute types (ReferrerPolicy)
- [x] **ChipProps Expansion** - Complete ChipProps interface with position, size, color, pulse
- [x] **AvatarGroupProps** - Exported dedicated interface for AvatarGroup
- [x] **AvatarImageProps** - Exported dedicated interface for AvatarImage
- [x] **AvatarFallbackProps** - Exported dedicated interface for AvatarFallback
- [x] **AvatarContext** - Proper context type for component communication
- [x] **FallbackType** - Added type for fallback priority configuration

---

## 🔧 index.ts

### Improvements

- [x] **Type Exports** - Export all types for external consumers
- [x] **Composable Export** - Export `useAvatar` composable for advanced use cases

---

## 🧪 Testing Ideas

- [x] **Unit Tests** - Added `Avatar.test.ts` (loading, error, fallback, loaded)
- [ ] **Snapshot Tests** - Visual regression for each size/variant
- [x] **A11y Tests** - Added `Avatar.a11y.test.ts` (automated accessibility audits)
- [x] **Performance Tests** - Added `Avatar.perf.test.ts` (measure render performance)

---

## 📚 Documentation Ideas

- [x] **Interactive Playground** - Added to documentation page
- [x] **Copy-Paste Examples** - Added to documentation page
- [ ] **Figma Integration** - Link to design tokens
- [x] **Migration Guide** - Added to documentation page (Nuxt UI, Vuetify)
