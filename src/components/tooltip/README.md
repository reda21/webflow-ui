# 📚 Tooltip Component Documentation

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Design Tokens & Figma](#design-tokens--figma)
- [Migration Guide](#migration-guide)
- [Best Practices](#best-practices)

---

## Installation

```typescript
import { Tooltip } from "@/components/tooltip";
// or
import Tooltip from "@/components/tooltip/Tooltip.vue";
import "@/components/tooltip/tooltip.css";
```

---

## Examples

### Basic Usage

The simplest form. The tooltip appears on hover.

```vue
<template>
  <Tooltip content="Simple message">
    <button>Hover me</button>
  </Tooltip>
</template>
```

### Positioning

Position can be customized (top, bottom, left, right, with start/end variants).

```vue
<template>
  <div class="grid">
    <Tooltip content="Tooltip Top" position="top">
      <button>Top</button>
    </Tooltip>
    <Tooltip content="Tooltip Right" position="right">
      <button>Right</button>
    </Tooltip>
    <Tooltip content="Tooltip Bottom" position="bottom">
      <button>Bottom</button>
    </Tooltip>
    <Tooltip content="Tooltip Left" position="left">
      <button>Left</button>
    </Tooltip>
  </div>
</template>
```

### Variants

Available variants: `dark`, `light`, `primary`, `success`, `warning`, `danger`, `info`, `glass`, `gradient-primary`, `gradient-sunset`.

```vue
<template>
  <div class="flex gap-4">
    <Tooltip content="Success!" variant="success">
      <button class="btn-success">Save</button>
    </Tooltip>

    <Tooltip content="Danger Zone" variant="danger">
      <button class="btn-danger">Delete</button>
    </Tooltip>

    <Tooltip content="Glassmorphism" variant="glass">
      <div class="glass-card">Glass</div>
    </Tooltip>
  </div>
</template>
```

### Interactive Content (HTML)

Enable `html` prop and `interactive` to allow users to click links inside.

```vue
<template>
  <Tooltip interactive html content="Click to <a href='/learn'>learn more</a>">
    <button>Rich Content</button>
  </Tooltip>

  <!-- Or using Slots -->
  <Tooltip interactive>
    <button>Profile</button>
    <template #content>
      <div class="user-card">
        <strong>John Doe</strong>
        <a href="/profile">View Profile</a>
      </div>
    </template>
  </Tooltip>
</template>
```

### Forms & Focus

Tooltips on inputs automatically handle focus triggers.

```vue
<template>
  <Tooltip
    content="Password must be 8+ chars"
    trigger="focus"
    placement="right"
  >
    <input type="password" placeholder="Password" />
  </Tooltip>
</template>
```

### Singleton (Group)

Share a single tooltip instance for performance when rendering lists.

```vue
<template>
  <div v-for="item in items" :key="item.id">
    <Tooltip :content="item.name" singleton group="list-group">
      <div class="item">{{ item.name }}</div>
    </Tooltip>
  </div>
</template>
```

### Directive Usage

For simple cases, use the `v-tooltip` directive.

```vue
<template>
  <button v-tooltip="'Simple tooltip'">Hover me</button>
  <button v-tooltip="{ content: 'Top tooltip', position: 'top' }">Top</button>
</template>
```

---

## Design Tokens & Figma

### Figma Integration

The Tooltip component is aligned with our **WebMX Design System**.
🔗 **[View Component in Figma](https://www.figma.com/file/example-id/WebMX-DS?node-id=tooltip)** (Placeholder)

### CSS Variables

Customize the tooltip globally or per instance using these variables:

| Variable                  | Default (Dark) | Description         |
| ------------------------- | -------------- | ------------------- |
| `--tooltip-bg`            | `#1a1a1a`      | Background color    |
| `--tooltip-text`          | `#ffffff`      | Text color          |
| `--tooltip-border`        | `transparent`  | Border color        |
| `--tooltip-border-radius` | `0.375rem`     | Border radius       |
| `--tooltip-padding-x`     | `0.75rem`      | Horizontal padding  |
| `--tooltip-padding-y`     | `0.5rem`       | Vertical padding    |
| `--tooltip-arrow-size`    | `8px`          | Size of the arrow   |
| `--tooltip-z-index`       | `9999`         | Z-Index stack value |

For custom variants, use the `.tooltip-wrapper--custom` class and set `--tooltip-custom-*` variables.

---

## Migration Guide

### Migrating from Tippy.js / VueTippy

| Feature     | Tippy.js             | WebMX Tooltip                 |
| ----------- | -------------------- | ----------------------------- |
| Component   | `<tippy>`            | `<Tooltip>`                   |
| Content     | `content="Tooltip"`  | `content="Tooltip"` (or slot) |
| Position    | `placement="top"`    | `position="top"`              |
| Trigger     | `trigger="click"`    | `trigger="click"`             |
| Animation   | `animation="scale"`  | `animation="scale"`           |
| Theme       | `theme="light"`      | `variant="light"`             |
| Interactive | `interactive={true}` | `interactive` prop            |
| Singleton   | `singleton` plugin   | `singleton` prop              |

### Migrating from Bootstrap Vue

Bootstrap tooltips use `v-b-tooltip` directive.
**Before:**

```html
<button v-b-tooltip.hover title="Tooltip content">Button</button>
```

**After:**

```html
<button v-tooltip="'Tooltip content'">Button</button>
<!-- or -->
<Tooltip content="Tooltip content"><button>Button</button></Tooltip>
```

---

## Best Practices

### Accessibility (A11y)

1.  **Keyboard Navigation**: Always ensure interactive tooltips can be dismissed with `Escape` (enabled by default).
2.  **Focus Management**: Do not trap focus unless intended. The component handles tabbing in/out of interactive tooltips automatically.
3.  **Screen Readers**: Ensure `content` or `aria-label` provides meaningful context. The component automatically links trigger and content via `aria-describedby`.
4.  **Touch**: Avoid hover-only tooltips for critical information. Use `trigger="click"` or ensure the component handles touch (long-press support is included).

### Performance

1.  **Lazy Loading**: The component uses `v-if` to mount content only when needed.
2.  **Singletons**: Use the `singleton` prop or `group` prop when rendering lists of hundreds of items (e.g., data grid cells) to reduce DOM node count and memory usage.
3.  **Virtual Elements**: Use `virtualElement` prop for positioning tooltips relative to canvas items or non-DOM coordinates.

### UX

1.  **Timing**: Default delays (show: 0ms, hide: 0ms) feel snappy. Use modest delays (show: 300ms) for detailed information to avoid "flashing" while moving the mouse.
2.  **Clutter**: Avoid tooltips on everything. Use them for icon-only buttons, truncated text, or clarifying complex terms.
3.  **Content**: Keep text concise. If you need headers and buttons, use a Popover or Modal instead (or the `interactive` mode if lightweight).
