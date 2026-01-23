# Modal Component Schema

## Overview

A premium, accessible dialog component built on Radix Vue primitives.

## Props

| Property              | Type                                               | Default              | Description                        |
| --------------------- | -------------------------------------------------- | -------------------- | ---------------------------------- |
| `modelValue`          | `boolean`                                          | `undefined`          | Controlled state of the modal.     |
| `defaultOpen`         | `boolean`                                          | `false`              | Uncontrolled initial state.        |
| `title`               | `string`                                           | `undefined`          | Title of the modal.                |
| `description`         | `string`                                           | `undefined`          | Secondary description/text.        |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'auto'` | `'md'`               | Maximum width of the modal.        |
| `variant`             | `'default' \| 'clean' \| 'glass'`                  | `'default'`          | Visual style of the modal.         |
| `showClose`           | `boolean`                                          | `true`               | Whether to show the close button.  |
| `closeIcon`           | `string`                                           | `'heroicons:x-mark'` | Iconify name for the close button. |
| `closeOnOutsideClick` | `boolean`                                          | `true`               | Close when clicking the overlay.   |
| `closeOnEscape`       | `boolean`                                          | `true`               | Close when pressing Escape.        |
| `preventScroll`       | `boolean`                                          | `true`               | Disable body scroll when open.     |

## Slots

- `default`: Main content (Body).
- `header`: Replace the default title/description container.
- `footer`: Action buttons at the bottom.
- `close-icon`: Custom close button content.

## Emits

- `update:modelValue`: Triggered when open state changes.
- `open`: Triggered when opened.
- `close`: Triggered when closed.
- `after-leave`: Triggered after exit animation completes.

## Accessibility Features

- **WAI-ARIA**: Implements the Dialog pattern.
- **Focus Management**: Automatically traps focus inside the modal and restores it on close.
- **Keyboard Support**: Escape key to close.
- **Screen Reader Support**: Uses `DialogTitle` and `DialogDescription` for proper labeling.
