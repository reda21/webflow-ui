# Webflow UI 🚀

Webflow UI is a modern, accessible, and high-performance Vue 3 component library built with **TypeScript**, **Tailwind CSS v4**, and **Radix Vue**. It's designed to be lightweight, easy to customize, and developer-friendly.

## 📦 Installation

Install the library using your favorite package manager:

```bash
# npm
npm install webflow-ui

# pnpm
pnpm add webflow-ui

# yarn
yarn add webflow-ui
```

## 🚀 Usage

### 1. Global Setup (Vite / Next.js)

Import the global styles in your main entry file (e.g., `main.ts` for Vite/Vue or `app/layout.tsx` for Nuxt/Next-like structures).

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "webflow-ui/style.css"; // Import styles here

createApp(App).mount("#app");
```

### 2. Using Components

You can import components directly from the package:

```vue
<script setup>
import { Button, Card, Icon } from "webflow-ui";
</script>

<template>
  <Card title="Hello World">
    <p>Welcome to Webflow UI!</p>
    <Button severity="primary">Get Started</Button>
  </Card>
</template>
```

---

## 🎨 Theme Customization

Webflow UI is built on a flexible design token system. You have multiple ways to customize the look and feel to match your brand.

### 1. Via CSS Variables (Recommended)

The library uses CSS variables for all its styles. You can override them in your root CSS file:

```css
/* your-style.css */
@import "webflow-ui/style.css";

:root {
  /* Override main colors */
  --primary: #7c3aed; /* Custom violet */
  --primary-foreground: #ffffff;

  /* Override surfacing */
  --background: #fffafa;

  /* Override radius */
  --radius-lg: 0.25rem; /* Make corners sharper */
}

/* Dark mode overrides */
.dark {
  --primary: #a78bfa;
  --background: #111111;
}
```

### 2. Using Tailwind CSS v4

If your project uses Tailwind v4, you can extend the theme directly in your `@theme` block:

```css
@theme {
  --color-primary: #7c3aed;
  --color-success: #10b981;
}
```

### 3. Accessing Tokens Programmatically

Need to access theme values in your Javascript/Typescript logic?

```ts
import { themeTokens } from "webflow-ui";

// Get the default primary color for light mode
const defaultPrimary = themeTokens.colors.primary.light; // #4f46e5
```

---

## 🛠️ Features

- ⚡ **Optimized for Tailwind v4**: Leverage the latest CSS-first features.
- ♿ **Accessible**: Built on top of Radix Vue primitives.
- 🌑 **Dark Mode**: First-class support out of the box.
- 🧩 **Modular**: Load only what you need.
- 📐 **Typed**: Full TypeScript support.

## 📄 License

MIT © [Reda21](https://github.com/reda21)
