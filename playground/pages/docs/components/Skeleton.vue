<script setup lang="ts">
import { ref } from 'vue'
import { Skeleton, SkeletonGroup, Card, Button, Icon } from '@/index'

const isLoading = ref(true)
</script>

<template>
    <div class="space-y-12">
        <!-- Hero Section -->
        <section>
            <div class="flex items-center gap-3 mb-2">
                <span
                    class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
                <span
                    class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Indicateur</span>
            </div>
            <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Skeleton</h1>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Un indicateur de chargement premium utilisé pour afficher un aperçu de la mise en page avant le
                chargement des données.
                Supporte plusieurs formes et animations fluides.
            </p>
        </section>

        <!-- Basic Usage -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="space-y-6">
                <h2 class="text-2xl font-bold flex items-center gap-2">
                    <Icon name="heroicons:sparkles" class="text-indigo-500" />
                    Utilisation de Base
                </h2>
                <div
                    class="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col gap-4">
                    <Skeleton width="100%" height="20px" />
                    <Skeleton width="80%" height="20px" />
                    <Skeleton width="60%" height="20px" />
                </div>
            </div>

            <div class="space-y-6">
                <h2 class="text-2xl font-bold flex items-center gap-2">
                    <Icon name="heroicons:swatch" class="text-indigo-500" />
                    Variantes de Forme
                </h2>
                <div
                    class="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-6">
                    <div class="flex flex-col items-center gap-2">
                        <Skeleton variant="circle" width="60px" height="60px" />
                        <span class="text-xs font-bold text-slate-400">Circle</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <Skeleton variant="rounded" width="60px" height="60px" />
                        <span class="text-xs font-bold text-slate-400">Rounded</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <Skeleton variant="rectangle" width="60px" height="60px" />
                        <span class="text-xs font-bold text-slate-400">Rectangle</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tailwind Usage -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <Icon name="heroicons:command-line" class="text-indigo-500" />
                Utilisation avec Tailwind (Mobile First)
            </h2>
            <p class="text-sm text-slate-500">
                Vous pouvez utiliser les classes Tailwind directement sur le composant pour un contrôle total de la mise
                en page.
            </p>
            <div class="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div class="flex items-center gap-4">
                    <Skeleton class="h-12 w-12 rounded-full" />
                    <div class="grid gap-2">
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
            <div class="bg-slate-950 rounded-xl p-4 overflow-x-auto">
                <pre class="text-xs text-indigo-300"><code>&lt;div class="flex items-center gap-4"&gt;
  &lt;Skeleton class="h-12 w-12 rounded-full" /&gt;
  &lt;div class="grid gap-2"&gt;
    &lt;Skeleton class="h-4 w-[250px]" /&gt;
    &lt;Skeleton class="h-4 w-[200px]" /&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
            </div>
        </section>

        <!-- Advanced Styles -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <Icon name="heroicons:paint-brush" class="text-indigo-500" />
                Styles Avancés
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Color & Glow -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Couleurs & Glow</h3>
                    <div class="p-8 bg-slate-900 rounded-2xl flex flex-col gap-6">
                        <div class="flex items-center gap-4">
                            <Skeleton width="40px" height="40px" variant="circle" color="#10b981" glow />
                            <Skeleton width="150px" height="12px" color="#10b981" />
                        </div>
                        <div class="flex items-center gap-4">
                            <Skeleton width="40px" height="40px" variant="circle" color="#f43f5e" glow />
                            <Skeleton width="150px" height="12px" color="#f43f5e" />
                        </div>
                    </div>
                </div>

                <!-- Gradients -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Gradients & Custom Shine</h3>
                    <div
                        class="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col gap-6">
                        <Skeleton height="40px" gradient animation="wave" />
                        <Skeleton height="40px" gradient="linear-gradient(90deg, #f59e0b, #ea580c)" animation="wave"
                            shine-color="rgba(255,255,255,0.5)" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Skeleton Group -->
        <section class="space-y-6">
            <div class="flex items-center gap-3">
                <h2 class="text-2xl font-bold">Skeleton Group</h2>
                <span
                    class="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-600 rounded uppercase">Stagger</span>
            </div>
            <p class="text-sm text-slate-500">
                Utilisez <code class="text-indigo-500">SkeletonGroup</code> pour regrouper plusieurs squelettes et
                appliquer un effet de décalage (stagger) automatique aux animations.
            </p>
            <div class="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <SkeletonGroup>
                    <Skeleton width="100%" height="16px" />
                    <Skeleton width="90%" height="16px" />
                    <Skeleton width="70%" height="16px" />
                    <Skeleton width="40%" height="16px" />
                </SkeletonGroup>
            </div>
        </section>

        <!-- Complex Compositions -->
        <section class="space-y-8">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <Icon name="heroicons:rectangle-stack" class="text-indigo-500" />
                Compositions Complexes
            </h2>
            <p class="text-sm text-slate-500">
                Combinez plusieurs squelettes pour créer des mises en page de chargement riches et fidèles au contenu
                final.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- User Profile List -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">Profils Utilisateurs</h3>
                    <div
                        class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                        <div v-for="i in 3" :key="i" class="flex items-center gap-4">
                            <Skeleton variant="circle" width="48px" height="48px" animation="wave" />
                            <div class="flex-1 space-y-2">
                                <Skeleton width="40%" height="12px" animation="wave" />
                                <Skeleton width="70%" height="8px" animation="wave" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Data Table -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">Tableau de Données</h3>
                    <div
                        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                        <div class="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-inherit flex gap-4">
                            <Skeleton width="100px" height="10px" />
                            <Skeleton width="150px" height="10px" />
                            <Skeleton width="80px" height="10px" class="ml-auto" />
                        </div>
                        <div class="p-4 space-y-4">
                            <div v-for="i in 4" :key="i" class="flex items-center gap-4">
                                <Skeleton width="20px" height="20px" variant="rounded" />
                                <Skeleton width="120px" height="10px" />
                                <Skeleton width="180px" height="10px" />
                                <Skeleton width="50px" height="10px" class="ml-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Inferred Size Usage -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <Icon name="heroicons:arrows-pointing-out" class="text-indigo-500" />
                Taille Déduite (Inferred Size)
            </h2>
            <p class="text-sm text-slate-500">
                Si vous passez du contenu dans le slot par défaut, le squelette prendra automatiquement les dimensions
                de ce contenu tout en le masquant.
            </p>
            <div class="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div class="flex flex-col gap-6">
                    <div class="flex items-center gap-4">
                        <Skeleton animation="wave">
                            <Button size="xl">Bouton de grande taille</Button>
                        </Skeleton>
                        <span class="text-xs text-slate-400">← Déduit du bouton</span>
                    </div>
                </div>
            </div>
            <div class="bg-slate-950 rounded-xl p-4 overflow-x-auto">
                <pre class="text-xs text-indigo-300"><code>&lt;Skeleton animation="wave"&gt;
  &lt;Button size="xl"&gt;Bouton de grande taille&lt;/Button&gt;
&lt;/Skeleton&gt;</code></pre>
            </div>
        </section>

        <!-- Dynamic Example -->
        <section class="space-y-6">
            <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold">Exemple Réel</h2>
                <Button :severity="isLoading ? 'primary' : 'secondary'" size="sm" @click="isLoading = !isLoading">
                    {{ isLoading ? 'Simuler le chargement' : 'Réinitialiser' }}
                </Button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card v-for="i in 3" :key="i" class="overflow-hidden">
                    <template #image>
                        <Skeleton v-if="isLoading" height="200px" variant="rectangle" animation="wave" />
                        <img v-else src="https://picsum.photos/400/200" alt="Random image"
                            class="w-full h-[200px] object-cover" />
                    </template>

                    <div class="space-y-3">
                        <Skeleton v-if="isLoading" width="80%" height="24px" animation="wave" />
                        <h3 v-else class="text-lg font-bold">Titre de l'article #{{ i }}</h3>

                        <div v-if="isLoading" class="space-y-2">
                            <Skeleton width="100%" height="12px" animation="wave" />
                            <Skeleton width="90%" height="12px" animation="wave" />
                        </div>
                        <p v-else class="text-sm text-slate-500 line-clamp-2">
                            Ceci est un exemple de contenu chargé dynamiquement avec un placeholder premium.
                        </p>
                    </div>

                    <template #footer>
                        <Skeleton v-if="isLoading" width="100px" height="32px" radius="999px" animation="wave" />
                        <Button v-else size="sm" severity="primary">Lire la suite</Button>
                    </template>
                </Card>
            </div>
        </section>

        <!-- API Reference -->
        <section class="space-y-8">
            <h2 class="text-3xl font-bold">API Reference</h2>

            <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center gap-2">
                    <Icon name="heroicons:list-bullet" class="text-indigo-500" />
                    Propriétés (Props)
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/5 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Propriété</th>
                                <th class="px-4 py-3 font-semibold">Type</th>
                                <th class="px-4 py-3 font-semibold">Défaut</th>
                                <th class="px-4 py-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">variant</td>
                                <td class="px-4 py-3 text-slate-500">rectangle | circle | rounded | line</td>
                                <td class="px-4 py-3 text-slate-500">'rounded'</td>
                                <td class="px-4 py-3">Forme visuelle du squelette.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">animation</td>
                                <td class="px-4 py-3 text-slate-500">pulse | wave | none</td>
                                <td class="px-4 py-3 text-slate-500">'pulse'</td>
                                <td class="px-4 py-3">Effet d'animation de chargement.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">width</td>
                                <td class="px-4 py-3 text-slate-500">string | number</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Largeur personnalisée (px si nombre).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">height</td>
                                <td class="px-4 py-3 text-slate-500">string | number</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Hauteur personnalisée (px si nombre).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">radius</td>
                                <td class="px-4 py-3 text-slate-500">string | number</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Rayon de bordure personnalisé pour 'rounded'.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">as</td>
                                <td class="px-4 py-3 text-slate-500">any</td>
                                <td class="px-4 py-3 text-slate-500">'div'</td>
                                <td class="px-4 py-3">L'élément ou le composant vers lequel ce composant doit être
                                    rendu.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">loadingText</td>
                                <td class="px-4 py-3 text-slate-500">string</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Texte pour les lecteurs d'écran (annonce aria-live).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">ariaLive</td>
                                <td class="px-4 py-3 text-slate-500">'polite' | 'assertive' | 'off'</td>
                                <td class="px-4 py-3 text-slate-500">'polite'</td>
                                <td class="px-4 py-3">Mode d'annonce pour l'état de chargement.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Slots -->
            <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center gap-2">
                    <Icon name="heroicons:rectangle-group" class="text-indigo-500" />
                    Slots
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/5 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Nom</th>
                                <th class="px-4 py-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">default</td>
                                <td class="px-4 py-3">Contenu interne à rendre à l'intérieur du composant (utile
                                    avec
                                    'as').</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>
