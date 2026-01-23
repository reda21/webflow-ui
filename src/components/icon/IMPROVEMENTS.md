# Icon Component - Improvement Ideas

This document outlines potential improvements for the Icon component.

---

## 📦 Icon.vue (Main Component)

### Features

- [x] **Rendering Modes** - Support `mode: 'svg' | 'css'` for different rendering strategies
- [x] **Preset Sizes** - Add preset sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- [x] **Pulse Animation** - Add `pulse` prop for pulsing animation effect
- [x] **Inline Mode** - Add `inline` prop for text-aligned icons
- [x] **Loading State** - Show skeleton/placeholder while icon loads (`skeleton` prop)
- [x] **Fallback Icon** - Display fallback icon if primary fails to load (`fallback` prop)
- [x] **Icon Caching** - Cache loaded SVG icons in memory (global Map cache)
- [x] **Sprite Mode** - Support SVG sprite sheets for better performance (`sprite` prop)

### Transformations

- [x] **Flip** - Support horizontal, vertical, and both flip transformations
- [x] **Rotate** - Support rotation with preset values (90, 180, 270) and custom degrees
- [x] **Scale** - Add scale transformation prop (`scale` prop)

### Accessibility

- [x] **aria-label** - Support custom aria-label for meaningful icons
- [x] **aria-hidden** - Default to aria-hidden for decorative icons
- [x] **role="img"** - Auto-apply role when aria-label is provided

### Performance

- [x] **Lazy Loading** - Defer loading of off-screen icons (`lazy` prop with IntersectionObserver)
- [x] **SSR Support** - Check for client-side before rendering Iconify (`isClient` check)
- [x] **Bundle Optimization** - @iconify/vue is already tree-shakeable, external in build config

---

## 🎨 icon.css

### Improvements

- [x] **Size Variants** - CSS classes for preset sizes
- [x] **Spin Animation** - Smooth rotation animation
- [x] **Pulse Animation** - Opacity-based pulse effect
- [x] **CSS Mode Styles** - Mask-image based icon rendering
- [x] **Flip Classes** - Transform classes for flipping
- [x] **Rotate Classes** - Transform classes for common rotations
- [x] **Inline Mode** - Text-aligned icon styling
- [x] **Skeleton Loading** - Animated skeleton placeholder

---

## 📝 types.ts

### Improvements

- [x] **IconMode Type** - Define 'svg' | 'css' modes
- [x] **IconSize Type** - Preset sizes + custom values
- [x] **IconFlip Type** - Flip direction options
- [x] **IconProps Interface** - Complete props interface with all features
- [x] **Scale prop** - Added scale transformation type
- [x] **Lazy prop** - Added lazy loading type

---

## 🔧 index.ts

### Improvements

- [x] **Export Types** - Export all types for external consumers
- [x] **Export Component** - Named export of Icon component

---

## 🧪 Testing

- [x] **Unit Tests** - Added `Icon.test.ts` (modes, sizes, animations, transformations)
- [ ] **Snapshot Tests** - Visual regression for each size
- [x] **A11y Tests** - Added `Icon.a11y.test.ts` (verify aria attributes)
- [x] **Performance Tests** - Added `Icon.perf.test.ts` (measure render time for many icons)

---

## 📚 Documentation

- [x] **Interactive Playground** - Live editor for all props
- [x] **Copy-Paste Examples** - One-click copy for common patterns
- [x] **Size Comparison** - Visual comparison of all sizes
- [x] **Mode Comparison** - SVG vs CSS vs Sprite mode explanation

---

## 💡 Mode Explanation

### SVG Mode (default)

- Uses `@iconify/vue` for rendering
- Full SVG in DOM
- Best for: Gradients, complex styling, small number of icons
- Better accessibility
- Supports caching and fallback

### CSS Mode

- Uses CSS `mask-image` with Iconify API
- Icon as background mask
- Best for: Many icons, simpler styling needs
- Smaller DOM footprint
- Requires network request for icon

### Sprite Mode

- Uses SVG `<use>` element with sprite sheet
- Best for: Production with known icon set
- Fastest rendering after initial load
- Requires pre-built sprite sheet

### Usage Examples

```vue
<!-- Default SVG mode with fallback -->
<Icon name="heroicons:user" fallback="heroicons:question-mark-circle" />

<!-- With skeleton loading -->
<Icon name="heroicons:check" skeleton />

<!-- Sprite mode (requires sprite sheet) -->
<Icon name="heroicons:star" sprite="/icons/sprite.svg" />

<!-- CSS mode for many icons -->
<Icon name="heroicons:heart" mode="css" />

<!-- Lazy loading for off-screen icons -->
<Icon name="heroicons:photo" lazy />

<!-- Scale transformation -->
<Icon name="heroicons:star" :scale="1.5" />
```
