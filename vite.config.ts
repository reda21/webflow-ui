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
    // Optimize bundle size
    minify: 'esbuild',
    target: 'esnext',
    // Enable source maps for debugging
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue', 'primevue', 'radix-vue', '@iconify/vue'],
      output: {
        // Preserve module structure for better tree-shaking
        preserveModules: false,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'main.css';
          return assetInfo.name!;
        },
        globals: {
          vue: 'Vue',
          primevue: 'PrimeVue',
          'radix-vue': 'RadixVue',
          '@iconify/vue': 'IconifyVue',
        },
        // Optimize chunk generation
        manualChunks: undefined,
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
  },
  
  // Optimizations
  optimizeDeps: {
    include: ['vue'],
    exclude: ['@iconify/vue'],
  },
}));

