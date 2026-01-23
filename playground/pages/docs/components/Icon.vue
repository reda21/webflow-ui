<script setup lang="ts">
import { ref } from 'vue'
import { Icon, Button } from '../../../../src/index'

// Interactive playground state
const selectedSize = ref<any>('md')
const selectedMode = ref<any>('svg')
const iconName = ref('heroicons:star')
const isSpinning = ref(false)
const isPulsing = ref(false)
const isLazy = ref(false)
const showSkeleton = ref(false)
const scaleValue = ref(1)

// Copy to clipboard
const copyCode = async (code: string) => {
  await navigator.clipboard.writeText(code)
}
</script>

<template>
  <section id="icon" class="scroll-mt-24 mb-20 px-4 md:px-0">
    <div class="flex items-center gap-3 mb-2">
      <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
      <span
        class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
    </div>
    <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
      Icon
    </h1>
    <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
      Un composant puissant avec 3 modes de rendu (SVG, CSS, Sprite), lazy loading, fallback, et plus de 200,000 icônes
      via <a href="https://iconify.design/" target="_blank"
        class="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">@iconify/vue</a>.
    </p>

    <!-- Interactive Playground -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Playground Interactif</h3>
      <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <!-- Controls -->
        <div
          class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="flex flex-col gap-1">
            <span class="text-xs text-slate-500 font-mono">name</span>
            <input v-model="iconName" type="text"
              class="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs dark:text-white" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-slate-500 font-mono">size</span>
            <select v-model="selectedSize"
              class="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs dark:text-white">
              <option v-for="s in ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-slate-500 font-mono">mode</span>
            <select v-model="selectedMode"
              class="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs dark:text-white">
              <option value="svg">SVG</option>
              <option value="css">CSS</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-slate-500 font-mono">scale</span>
            <input v-model="scaleValue" type="range" min="0.5" max="2" step="0.1" class="w-full" />
          </div>
          <div class="flex items-center gap-4 col-span-2 md:col-span-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="isSpinning" class="w-4 h-4 rounded" />
              <span class="text-xs text-slate-600 dark:text-slate-300">Spin</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="isPulsing" class="w-4 h-4 rounded" />
              <span class="text-xs text-slate-600 dark:text-slate-300">Pulse</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="isLazy" class="w-4 h-4 rounded" />
              <span class="text-xs text-slate-600 dark:text-slate-300">Lazy</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="showSkeleton" class="w-4 h-4 rounded" />
              <span class="text-xs text-slate-600 dark:text-slate-300">Skeleton</span>
            </label>
          </div>
        </div>
        <!-- Preview -->
        <div class="bg-white dark:bg-slate-900 p-12 flex flex-col items-center justify-center min-h-[200px] gap-4">
          <Icon :name="iconName" :size="selectedSize" :mode="selectedMode" :spin="isSpinning" :pulse="isPulsing"
            :lazy="isLazy" :skeleton="showSkeleton" :scale="scaleValue" class="text-indigo-500" />
          <span class="text-xs text-slate-400">{{ iconName }} · {{ selectedSize }} · scale {{ scaleValue }}</span>
        </div>
      </div>
    </div>

    <!-- Mode Comparison -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Modes de Rendu</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="heroicons:photo" size="lg" class="text-indigo-500" />
            <h4 class="font-bold text-slate-900 dark:text-white">SVG Mode</h4>
          </div>
          <p class="text-xs text-slate-500 mb-4">Mode par défaut. SVG complet dans le DOM. Idéal pour gradients et
            styling complexe.</p>
          <pre
            class="text-[10px] text-sky-400 bg-slate-100 dark:bg-slate-800 p-2 rounded"><code>&lt;Icon name="..." mode="svg" /&gt;</code></pre>
        </div>
        <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="heroicons:paint-brush" size="lg" class="text-emerald-500" />
            <h4 class="font-bold text-slate-900 dark:text-white">CSS Mode</h4>
          </div>
          <p class="text-xs text-slate-500 mb-4">Utilise mask-image. DOM plus léger. Idéal pour beaucoup d'icônes
            simples.</p>
          <pre
            class="text-[10px] text-sky-400 bg-slate-100 dark:bg-slate-800 p-2 rounded"><code>&lt;Icon name="..." mode="css" /&gt;</code></pre>
        </div>
        <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="heroicons:squares-2x2" size="lg" class="text-amber-500" />
            <h4 class="font-bold text-slate-900 dark:text-white">Sprite Mode</h4>
          </div>
          <p class="text-xs text-slate-500 mb-4">Utilise SVG sprites. Performance maximale après chargement initial.</p>
          <pre
            class="text-[10px] text-sky-400 bg-slate-100 dark:bg-slate-800 p-2 rounded"><code>&lt;Icon sprite="/icons.svg" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <!-- Preset Sizes -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tailles Prédéfinies</h3>
      <div
        class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-8 items-end justify-center">
        <div v-for="s in ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="s"
          class="flex flex-col items-center gap-2">
          <Icon name="heroicons:rocket-launch" :size="s" class="text-indigo-500" />
          <span class="text-[10px] text-slate-500 font-mono">{{ s }}</span>
        </div>
      </div>
    </div>

    <!-- Animations -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Animations</h3>
      <div
        class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-12 items-center justify-center">
        <div class="flex flex-col items-center gap-3">
          <Icon name="heroicons:arrow-path" size="xl" spin class="text-indigo-500" />
          <span class="text-xs text-slate-500">spin</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <Icon name="heroicons:bell" size="xl" pulse class="text-amber-500" />
          <span class="text-xs text-slate-500">pulse</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <Icon name="heroicons:arrow-right" size="xl" :rotate="45" class="text-emerald-500" />
          <span class="text-xs text-slate-500">rotate 45°</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <Icon name="heroicons:star" size="xl" :scale="1.5" class="text-rose-500" />
          <span class="text-xs text-slate-500">scale 1.5</span>
        </div>
      </div>
    </div>

    <!-- Performance Features -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
          <h4 class="font-bold text-slate-900 dark:text-white mb-2">Lazy Loading</h4>
          <p class="text-xs text-slate-500 mb-4">Chargement différé pour les icônes hors écran avec
            IntersectionObserver.</p>
          <pre class="text-[10px] text-sky-400"><code>&lt;Icon name="..." lazy /&gt;</code></pre>
        </div>
        <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
          <h4 class="font-bold text-slate-900 dark:text-white mb-2">Fallback Icon</h4>
          <p class="text-xs text-slate-500 mb-4">Icône de secours si le chargement échoue.</p>
          <pre
            class="text-[10px] text-sky-400"><code>&lt;Icon name="..." fallback="heroicons:question-mark-circle" /&gt;</code></pre>
        </div>
        <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
          <h4 class="font-bold text-slate-900 dark:text-white mb-2">Skeleton Loading</h4>
          <p class="text-xs text-slate-500 mb-4">Placeholder animé pendant le chargement.</p>
          <pre class="text-[10px] text-sky-400"><code>&lt;Icon name="..." skeleton /&gt;</code></pre>
        </div>
        <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
          <h4 class="font-bold text-slate-900 dark:text-white mb-2">Icon Caching</h4>
          <p class="text-xs text-slate-500 mb-4">Les icônes chargées sont mises en cache automatiquement.</p>
          <pre class="text-[10px] text-sky-400"><code>// Automatique, pas de config nécessaire</code></pre>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">API du composant Icon</h3>
    <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-8">
      <table class="w-full text-sm text-left border-collapse">
        <thead
          class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th class="py-4 px-4">Prop</th>
            <th class="py-4 px-4">Type</th>
            <th class="py-4 px-4">Default</th>
            <th class="py-4 px-4">Description</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900/50">
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">name</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">-</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Identifiant (prefix:name)</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">mode</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">'svg' | 'css'</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">'svg'</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Mode de rendu</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">size</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">IconSize</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">'md'</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">xs, sm, md, lg, xl, 2xl, 3xl</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">scale</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">number | string</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">-</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Facteur d'échelle</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">spin</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">false</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Animation de rotation</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">pulse</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">false</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Animation de pulsation</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">lazy</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">false</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Chargement différé</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">fallback</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">-</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Icône de secours</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">skeleton</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">false</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Placeholder de chargement</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">ariaLabel</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
            <td class="py-3 px-4 font-mono text-slate-400 text-xs">-</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Label accessible</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
@reference "../../../../src/theme.css";

select,
input[type="text"] {
  @apply bg-transparent;
}

select option {
  @apply bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white;
}
</style>
