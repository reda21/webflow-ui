# Card Component

Un composant de carte premium hautement configurable avec support pour le glassmorphism, les gradients et les animations.

## Usage

```vue
<script setup>
import { Card } from "@webmx/ui";
</script>

<template>
  <Card
    title="Premium Design"
    subtitle="Built for performance"
    image="https://picsum.photos/400/200"
    variant="glass"
    hover="scale"
  >
    <p>Le contenu de votre carte ici.</p>

    <template #footer>
      <Button severity="primary">Action</Button>
    </template>
  </Card>
</template>
```

## Props

- `title`: Titre de la carte
- `subtitle`: Sous-titre
- `variant`: `default`, `outlined`, `ghost`, `glass`, `soft`, `gradient`
- `shadow`: `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`
- `padding`: `none`, `xs`, `sm`, `md`, `lg`, `xl`
- `image`: URL de l'image d'en-tête
- `hover`: `true`, `false`, `scale`, `raise`, `glow`
- `scrollable`: boolean

## Slots

- `default`: Corps de la carte
- `header`: En-tête complet
- `title`: Titre
- `subtitle`: Sous-titre
- `footer`: Pied de page
- `image`: Image de la carte
