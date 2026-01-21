<script setup lang="ts">
import { Icon } from '../../../../src/index'
</script>

<template>
  <section id="icon" class="scroll-mt-24 mb-20">
    <div class="flex items-center gap-3 mb-2">
      <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
      <span class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
    </div>
    <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
      Icon
    </h1>
    <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
      Un composant puissant et flexible utilisant @iconify/vue, accédant à plus de 200,000 icônes.
    </p>

    <!-- Basic Examples -->
    <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <div class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <span class="text-xs font-medium text-slate-500">Aperçu</span>
      </div>
      <div class="bg-white dark:bg-slate-900 p-8 flex flex-wrap gap-10 items-center justify-center">
        <Icon name="heroicons:home" size="2rem" />
        <Icon name="heroicons:user-group" size="2rem" />
        <Icon name="heroicons:cog-6-tooth" size="2rem" />
        <Icon name="heroicons:bolt" size="2rem" class="text-yellow-500" />
        <Icon name="heroicons:heart" size="2rem" class="text-rose-500" />
      </div>
    </div>

    <!-- Sizes -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tailles</h3>
      <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-8 items-end justify-center">
        <div class="flex flex-col items-center gap-2">
          <Icon name="heroicons:rocket-launch" size="1rem" />
          <span class="text-[10px] text-slate-500">1rem</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="heroicons:rocket-launch" size="1.5rem" />
          <span class="text-[10px] text-slate-500">1.5rem</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="heroicons:rocket-launch" size="2rem" />
          <span class="text-[10px] text-slate-500">2rem</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="heroicons:rocket-launch" size="3rem" />
          <span class="text-[10px] text-slate-500">3rem</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="heroicons:rocket-launch" size="4rem" />
          <span class="text-[10px] text-slate-500">4rem</span>
        </div>
      </div>
    </div>

    <!-- Colors & Styling -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Couleurs & Styles</h3>
      <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-8 items-center justify-center">
        <Icon name="heroicons:check-badge" size="2.5rem" class="text-emerald-500" />
        <Icon name="heroicons:exclamation-triangle" size="2.5rem" class="text-amber-500" />
        <Icon name="heroicons:x-circle" size="2.5rem" class="text-rose-500" />
        <Icon name="heroicons:information-circle" size="2.5rem" class="text-sky-500" />
        <Icon name="heroicons:star" size="2.5rem" class="text-indigo-500" />
      </div>
    </div>

    <!-- Transformations & Animations -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Transformations & Animations</h3>
      <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-8 items-center justify-center">
        <div class="flex flex-col items-center gap-2">
          <Icon name="heroicons:arrow-right" size="2rem" rotate="45" />
          <span class="text-[10px] text-slate-500">Rotate 45°</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="heroicons:hand-thumb-up" size="2rem" flip="horizontal" />
          <span class="text-[10px] text-slate-500">Flip H</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="heroicons:arrow-path" size="2rem" spin />
          <span class="text-[10px] text-slate-500">Spin</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="lucide:loader-2" size="2rem" spin />
          <span class="text-[10px] text-slate-500">Lucide Spin</span>
        </div>
      </div>
    </div>

    <!-- Props Table -->
    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Icon Props</h3>
    <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-8">
      <table class="w-full text-sm text-left">
        <thead class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th class="py-3 px-4">Propriété</th>
            <th class="py-3 px-4">Type</th>
            <th class="py-3 px-4">Par défaut</th>
            <th class="py-3 px-4">Description</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">name</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
            <td class="py-3 px-4 font-mono text-slate-500 text-xs">-</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Le nom de l'icône (ex: "heroicons:home").</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">size</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string | number</td>
            <td class="py-3 px-4 font-mono text-slate-500 text-xs">'1.25em'</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Taille de l'icône.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">color</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
            <td class="py-3 px-4 font-mono text-slate-500 text-xs">-</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Couleur CSS directe. Préférer l'utilisation des classes Tailwind.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">spin</td>
            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
            <td class="py-3 px-4 font-mono text-slate-500 text-xs">false</td>
            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Active une animation de rotation.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Code Example -->
    <div class="bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
      <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
        <span class="text-xs font-medium text-slate-400">Exemple</span>
      </div>
      <pre class="p-4 text-sm overflow-x-auto"><code class="text-sky-400">&lt;Icon name="heroicons:home" size="2rem" class="text-indigo-500" /&gt;
&lt;Icon name="lucide:loader" spin /&gt;</code></pre>
    </div>
  </section>
</template>
