import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    tailwindcss(),
    // Only generate types during build
    command === 'build' && dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      insertTypesEntry: true,
    }),
  ].filter(Boolean),
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  
  // Dev server configuration
  server: {
    port: 5173,
    open: true,
  },
  
  // Build configuration (library mode)
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WebMXUI',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`,
    },
    rollupOptions: {
      external: ['vue', 'primevue', 'radix-vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'main.css';
          return assetInfo.name;
        },
        globals: {
          vue: 'Vue',
          primevue: 'PrimeVue',
          'radix-vue': 'RadixVue',
        },
      },
    },
  },
}));
