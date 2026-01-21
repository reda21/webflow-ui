<script setup lang="ts">
import { ref } from 'vue'
import { Button, ButtonGroup } from '../../../../src/index'

const toggleValue = ref('center')
const multiValues = ref(['bold'])
</script>

<template>
    <section id="button-group" class="scroll-mt-24 mb-20">
        <div class="flex items-center gap-3 mb-2">
            <span
                class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            ButtonGroup
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Regroupez des boutons de manière cohérente pour créer des barres d'outils, des sélections d'onglets ou des
            segments d'actions. Supporte les modes de sélection (toggle) unique et multiple.
        </p>

        <!-- Preview Section: Basic Usage -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <div class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Groupage de base</span>
            </div>
            <div class="bg-white dark:bg-slate-900 p-8 flex flex-wrap gap-8 items-start justify-center">
                <div class="flex flex-col items-center gap-4">
                    <span class="text-[10px] font-bold text-slate-400 uppercase">Horizontal (Défaut)</span>
                    <ButtonGroup>
                        <Button severity="primary" variant="outlined">Éditer</Button>
                        <Button severity="primary" variant="outlined">Copier</Button>
                        <Button severity="danger" variant="outlined">Supprimer</Button>
                    </ButtonGroup>
                </div>
                <div class="flex flex-col items-center gap-4">
                    <span class="text-[10px] font-bold text-slate-400 uppercase">Vertical</span>
                    <ButtonGroup direction="vertical">
                        <Button severity="secondary" icon="heroicons:chevron-up" square />
                        <Button severity="secondary" icon="heroicons:chevron-down" square />
                    </ButtonGroup>
                </div>
            </div>
        </div>

        <!-- Section: Toggle Mode -->
        <div class="mb-20">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Mode Toggle & Sélection</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-8">
                Utilisez la prop <code>toggle</code> pour transformer le groupe en un sélecteur d'état. Les boutons avec
                une propriété <code>value</code> deviendront interactifs.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Single Selection -->
                <div class="space-y-4">
                    <div class="flex justify-between items-end">
                        <h4 class="text-sm font-bold text-slate-700 dark:text-slate-300">Sélection Unique</h4>
                        <span class="text-xs font-mono text-indigo-500">v-model: {{ toggleValue }}</span>
                    </div>
                    <div
                        class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex justify-center">
                        <ButtonGroup v-model="toggleValue" toggle>
                            <Button value="left" icon="heroicons:bars-3-bottom-left" square />
                            <Button value="center" icon="heroicons:bars-3" square />
                            <Button value="right" icon="heroicons:bars-3-bottom-right" square />
                        </ButtonGroup>
                    </div>
                    <p class="text-xs text-slate-500 italic">Parfait pour l'alignement de texte ou des filtres
                        exclusifs.</p>
                </div>

                <!-- Multiple Selection -->
                <div class="space-y-4">
                    <div class="flex justify-between items-end">
                        <h4 class="text-sm font-bold text-slate-700 dark:text-slate-300">Sélection Multiple</h4>
                        <span class="text-xs font-mono text-indigo-500">v-model: {{ multiValues }}</span>
                    </div>
                    <div
                        class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex justify-center">
                        <ButtonGroup v-model="multiValues" toggle multiple>
                            <Button value="bold" icon="heroicons:bold" square />
                            <Button value="italic" icon="heroicons:italic" square />
                            <Button value="underline" icon="heroicons:underline" square />
                        </ButtonGroup>
                    </div>
                    <p class="text-xs text-slate-500 italic">Idéal pour les barres d'outils de formatage.</p>
                </div>
            </div>
        </div>

        <!-- Section: Design Systems Examples -->
        <div class="mb-20">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Cas d'usage concrets</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-8">
                Le ButtonGroup s'adapte à différents styles visuels pour vos interfaces.
            </p>

            <div class="space-y-8">
                <!-- Tabs Style -->
                <div
                    class="p-1 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30">
                    <div class="p-8 space-y-4">
                        <h4 class="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Style Onglets
                            (Pill)</h4>
                        <div class="flex justify-center">
                            <ButtonGroup toggle
                                class="bg-white dark:bg-slate-900 p-1 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                                <Button value="active" variant="ghost" rounded="full"
                                    class="min-w-[100px]">Actifs</Button>
                                <Button value="pending" variant="ghost" rounded="full" class="min-w-[100px]">En
                                    attente</Button>
                                <Button value="archived" variant="ghost" rounded="full"
                                    class="min-w-[100px]">Archivés</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="font-bold text-slate-900 dark:text-white">Actions de masse</span>
                        <span class="text-xs text-slate-500">3 éléments sélectionnés</span>
                    </div>
                    <ButtonGroup>
                        <Button severity="secondary" variant="outlined" icon="heroicons:arrow-path">Actualiser</Button>
                        <Button severity="secondary" variant="outlined" icon="heroicons:archive-box">Archiver</Button>
                        <Button severity="danger" variant="outlined" icon="heroicons:trash">Supprimer</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>

        <!-- Section: API -->
        <div class="scroll-mt-24 mb-16" id="api">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">API Reference</h2>

            <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                <table class="w-full text-sm text-left">
                    <thead
                        class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th class="py-3 px-4">Propriété</th>
                            <th class="py-3 px-4">Type</th>
                            <th class="py-3 px-4">Défaut</th>
                            <th class="py-3 px-4">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                direction</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">'horizontal'
                                | 'vertical'</td>
                            <td class="py-3 px-4 text-xs">'horizontal'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Orientation des boutons
                                dans le groupe.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                toggle</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Active le mode de sélection
                                interactive.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                multiple</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Autorise la sélection de
                                plusieurs boutons simultanément (si toggle est vrai).</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                modelValue</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">any | any[]
                            </td>
                            <td class="py-3 px-4 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">Valeur(s) sélectionnée(s)
                                liée(s) par <code>v-model</code>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
