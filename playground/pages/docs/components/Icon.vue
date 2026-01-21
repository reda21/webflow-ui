<script setup lang="ts">
import { Icon, Button } from '../../../../src/index'
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
      Un composant puissant et flexible utilisant <a href="https://iconify.design/" target="_blank" class="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">@iconify/vue</a>, accédant à plus de 200,000 icônes provenant de plus de 150 jeux d'icônes populaires.
    </p>

    <!-- Usage Guide -->
    <div class="mb-12 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-6">
      <h3 class="text-indigo-900 dark:text-indigo-300 font-bold mb-3 flex items-center gap-2">
        <Icon name="heroicons:information-circle" class="w-5 h-5" />
        Comment l'utiliser
      </h3>
      <p class="text-sm text-indigo-800 dark:text-indigo-400/80 mb-4">
        Le composant charge les icônes à la demande. Vous n'avez pas besoin d'importer chaque icône manuellement. Il suffit d'utiliser le format <code>prefix:name</code> (ex: <code>mdi:home</code>, <code>lucide:user</code>, <code>heroicons:bolt</code>).
      </p>
      <div class="flex flex-wrap gap-4">
        <a href="https://icon-sets.iconify.design/" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          <span>Rechercher des icônes</span>
          <Icon name="heroicons:arrow-top-right-on-square" />
        </a>
      </div>
    </div>

    <!-- Basic Examples -->
    <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <div class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <span class="text-xs font-medium text-slate-500">Aperçu</span>
      </div>
      <div class="bg-white dark:bg-slate-900 p-8 flex flex-col gap-8">
        <div class="flex flex-wrap gap-10 items-center justify-center border-b border-slate-100 dark:border-slate-800 pb-8">
          <Icon name="heroicons:home" size="2rem" />
          <Icon name="heroicons:user-group" size="2rem" />
          <Icon name="heroicons:cog-6-tooth" size="2rem" />
          <Icon name="heroicons:bolt" size="2rem" class="text-yellow-500" />
          <Icon name="heroicons:heart" size="2rem" class="text-rose-500" />
        </div>
        
        <div class="flex flex-col items-center gap-4">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Iconify Set: Entypo Social</span>
          <div class="flex flex-wrap gap-10 items-center justify-center">
            <Icon name="entypo-social:facebook" size="2rem" class="text-[#1877f2]" />
            <Icon name="entypo-social:twitter" size="2rem" class="text-[#1da1f2]" />
            <Icon name="entypo-social:instagram" size="2rem" class="text-[#e4405f]" />
            <Icon name="entypo-social:github" size="2rem" class="text-[#333]" />
            <Icon name="entypo-social:linkedin" size="2rem" class="text-[#0077b5]" />
          </div>
        </div>
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

    <!-- Integration Examples -->
    <div class="mb-12">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Intégration</h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Les icônes peuvent être intégrées facilement dans d'autres composants comme les boutons via la prop <code>icon</code>.
      </p>
      <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4 items-center justify-center">
        <Button icon="heroicons:magnifying-glass">Button</Button>
        <Button icon="heroicons:rocket-launch" severity="success">Lancer</Button>
        <Button icon="heroicons:plus" severity="primary" rounded="full" />
      </div>
    </div>
    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">API du composant Icon</h3>
    <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-8">
      <table class="w-full text-sm text-left border-collapse">
        <thead class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th class="py-4 px-4">Propriété</th>
            <th class="py-4 px-4">Type</th>
            <th class="py-4 px-4">Défaut</th>
            <th class="py-4 px-4">Description</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
          <tr>
            <td class="py-4 px-4">
              <span class="inline-flex font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded">name</span>
            </td>
            <td class="py-4 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs text-nowrap">string</td>
            <td class="py-4 px-4 font-mono text-slate-400 text-xs">-</td>
            <td class="py-4 px-4 text-slate-600 dark:text-slate-400 leading-relaxed italic">
              Requis. Identifiant de l'icône au format <code>collection:name</code>.
            </td>
          </tr>
          <tr>
            <td class="py-4 px-4">
              <span class="inline-flex font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded">size</span>
            </td>
            <td class="py-4 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string | number</td>
            <td class="py-4 px-4 font-mono text-slate-500 text-xs">'1.25em'</td>
            <td class="py-4 px-4 text-slate-600 dark:text-slate-400 leading-relaxed italic">
              Définit la largeur et la hauteur. Accepte n'importe quelle unité CSS (px, rem, em, %).
            </td>
          </tr>
          <tr>
            <td class="py-4 px-4">
              <span class="inline-flex font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded">color</span>
            </td>
            <td class="py-4 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
            <td class="py-4 px-4 font-mono text-slate-500 text-xs">-</td>
            <td class="py-4 px-4 text-slate-600 dark:text-slate-400 leading-relaxed italic">
              Couleur CSS directe (ex: <code>#ff0000</code>). Par défaut, il hérite de la couleur du texte parent.
            </td>
          </tr>
          <tr>
            <td class="py-4 px-4">
              <span class="inline-flex font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded">rotate</span>
            </td>
            <td class="py-4 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">number | string</td>
            <td class="py-4 px-4 font-mono text-slate-500 text-xs">0</td>
            <td class="py-4 px-4 text-slate-600 dark:text-slate-400 leading-relaxed italic">
              Rotation en degrés (90, 180, 270).
            </td>
          </tr>
          <tr>
            <td class="py-4 px-4">
              <span class="inline-flex font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded">flip</span>
            </td>
            <td class="py-4 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
            <td class="py-4 px-4 font-mono text-slate-500 text-xs">-</td>
            <td class="py-4 px-4 text-slate-600 dark:text-slate-400 leading-relaxed italic">
              Miroir horizontal ou vertical. Valeurs possibles : <code>'horizontal'</code>, <code>'vertical'</code>, ou les deux.
            </td>
          </tr>
          <tr>
            <td class="py-4 px-4">
              <span class="inline-flex font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded">spin</span>
            </td>
            <td class="py-4 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
            <td class="py-4 px-4 font-mono text-slate-500 text-xs">false</td>
            <td class="py-4 px-4 text-slate-600 dark:text-slate-400 leading-relaxed italic">
              Applique une classe Tailwind <code>animate-spin</code> pour les icônes de chargement.
            </td>
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
