<script setup lang="ts">
import { ref, computed } from 'vue'
import { Modal, Button, Icon } from '../../../../src/index'
import type { ModalSize, ModalVariant } from '../../../../src/components/modal/types'

// Configurator State
const isOpen = ref(false)
const selectedSize = ref<ModalSize>('md')
const selectedVariant = ref<ModalVariant>('default')
const showClose = ref(true)
const closeOnOutside = ref(true)
const modalTitle = ref('Supprimer cet élément ?')
const modalDescription = ref('Cette action est irréversible. Voulez-vous vraiment continuer ?')

const sizeOptions: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full', 'auto']
const variantOptions: ModalVariant[] = ['default', 'clean', 'glass']

// Examples state
const simpleModal = ref(false)
const formModal = ref(false)
const glassModal = ref(false)
const scrollModal = ref(false)

const handleConfirm = () => {
    alert('Confirmé !')
    isOpen.value = false
    formModal.value = false
}

// Code Preview
const modalCodeExample = computed(() => {
    let props = ` v-model="isOpen"`
    if (selectedSize.value !== 'md') props += ` size="${selectedSize.value}"`
    if (selectedVariant.value !== 'default') props += ` variant="${selectedVariant.value}"`
    if (!showClose.value) props += ` :close="false"`
    if (!closeOnOutside.value) props += ` :close-on-outside-click="false"`

    return `<Modal 
  title="${modalTitle.value}"
  description="${modalDescription.value}"${props}
>
  <p>Contenu personnalisé de la modal...</p>
  
  <template #footer>
    <Button variant="outlined" @click="isOpen = false">Annuler</Button>
    <Button severity="danger" @click="handleConfirm">Supprimer</Button>
  </template>
</Modal>`
})
</script>

<template>
    <section id="modal" class="scroll-mt-24 mb-20">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-2">
            <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Composant
            </span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                Nouveau
            </span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Modal (Dialog)
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Une fenêtre modale premium, accessible (WAI-ARIA) et hautement personnalisable.
            Parfaite pour les confirmations, les formulaires ou le contenu détaillé.
        </p>

        <!-- Interactive Configurator -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <!-- Configurator Header -->
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4">
                <!-- Size -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">size</span>
                    <select v-model="selectedSize"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in sizeOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <!-- Variant -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">variant</span>
                    <select v-model="selectedVariant"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in variantOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <!-- Controls -->
                <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input v-model="showClose" type="checkbox" class="w-4 h-4 text-indigo-600 rounded">
                        <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Bouton fermer</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input v-model="closeOnOutside" type="checkbox" class="w-4 h-4 text-indigo-600 rounded">
                        <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Clic extérieur</span>
                    </label>
                </div>
            </div>

            <!-- Content Area -->
            <div class="bg-white dark:bg-slate-900 p-12 flex flex-col items-center justify-center min-h-[200px]">
                <Button severity="primary" size="lg" raised @click="isOpen = true">
                    Ouvrir la Modal Personnalisée
                </Button>

                <p class="mt-4 text-sm text-slate-500">Cliquez pour tester votre configuration</p>

                <Modal v-model="isOpen" :title="modalTitle" :description="modalDescription" :size="selectedSize"
                    :variant="selectedVariant" :close="showClose" :close-on-outside-click="closeOnOutside">
                    <div class="space-y-4">
                        <p class="text-slate-600 dark:text-slate-400">
                            Ceci est une modal interactive générée par le configurateur ci-dessus.
                            Toutes les propriétés sont réactives.
                        </p>
                        <div
                            class="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <code class="text-xs text-indigo-600 dark:text-indigo-400">
                                size: {{ selectedSize }} | variant: {{ selectedVariant }}
                            </code>
                        </div>
                    </div>

                    <template #footer>
                        <Button variant="outlined" severity="secondary" @click="isOpen = false">Fermer</Button>
                        <Button severity="primary" @click="handleConfirm">Compris</Button>
                    </template>
                </Modal>
            </div>

            <!-- Code Preview -->
            <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>{{ modalCodeExample }}</code></pre>
            </div>
        </div>

        <!-- Examples Grid -->
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Exemples d'utilisation</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

            <!-- Simple Modal -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                        <Icon name="heroicons:information-circle" />
                    </div>
                    <h3 class="font-bold">Simple Info</h3>
                </div>
                <p class="text-sm text-slate-500">Une modal d'information basique avec un seul bouton de fermeture.</p>
                <Button severity="secondary" variant="outlined" @click="simpleModal = true">Voir l'exemple</Button>

                <Modal v-model="simpleModal" title="Note d'information" size="sm">
                    <p>La mise à jour système sera installée automatiquement à 2h du matin.</p>
                    <template #footer>
                        <Button severity="primary" block @click="simpleModal = false">OK</Button>
                    </template>
                </Modal>
            </div>

            <!-- Form Modal -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <Icon name="heroicons:user-plus" />
                    </div>
                    <h3 class="font-bold">Formulaire</h3>
                </div>
                <p class="text-sm text-slate-500">Modal contenant des champs de saisie et des actions de validation.</p>
                <Button severity="success" variant="outlined" @click="formModal = true">Ouvrir formulaire</Button>

                <Modal v-model="formModal" title="Nouvel Utilisateur" description="Ajoutez un membre à votre équipe.">
                    <div class="space-y-4 pt-2">
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-slate-500">Nom complet</label>
                            <input type="text" placeholder="ex: Jean Dupont"
                                class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-slate-500">Rôle</label>
                            <select
                                class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Développeur</option>
                                <option>Designer</option>
                                <option>Manager</option>
                            </select>
                        </div>
                    </div>
                    <template #footer>
                        <Button variant="ghost" severity="secondary" @click="formModal = false">Annuler</Button>
                        <Button severity="success" @click="handleConfirm">Créer le compte</Button>
                    </template>
                </Modal>
            </div>

            <!-- Glassmorphism Modal -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                        <Icon name="heroicons:sparkles" />
                    </div>
                    <h3 class="font-bold">Glassmorphism</h3>
                </div>
                <p class="text-sm text-slate-500">Effet de transparence et flou d'arrière-plan pour un look premium
                    ultra-moderne.</p>
                <Button severity="help" variant="outlined" @click="glassModal = true">Effet Glass</Button>

                <Modal v-model="glassModal" variant="glass" title="Design Premium">
                    <p class="text-slate-600 dark:text-slate-400">
                        L'effet glassmorphism utilise un mélange de transparence, de flou (backdrop-filter) et de
                        bordures
                        subtiles
                        pour créer de la profondeur.
                    </p>
                    <template #footer>
                        <Button severity="contrast" raised @click="glassModal = false">Magnifique</Button>
                    </template>
                </Modal>
            </div>
            <!-- Custom Close -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                        <Icon name="heroicons:cog-6-tooth" />
                    </div>
                    <h3 class="font-bold">Bouton Personnalisé</h3>
                </div>
                <p class="text-sm text-slate-500">Personnalisez le bouton de fermeture avec les props du Button.</p>
                <Button severity="warn" variant="outlined" @click="scrollModal = true">Custom Close</Button>

                <Modal v-model="scrollModal" title="Custom Settings" :close="{
                    severity: 'primary',
                    variant: 'outlined',
                    rounded: 'full',
                    class: 'top-4 right-4'
                }">
                    <p>Le bouton de fermeture ci-dessus est un composant Button entièrement configuré via la prop close.
                    </p>
                    <template #footer>
                        <Button severity="secondary" @click="scrollModal = false">Annuler</Button>
                        <Button severity="primary">Enregistrer</Button>
                    </template>
                </Modal>
            </div>
        </div>

        <!-- Section Documentation API -->
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">API</h2>

        <div class="space-y-8">
            <!-- Props -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Props</h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Propriété</th>
                                <th class="px-4 py-3 font-semibold">Type</th>
                                <th class="px-4 py-3 font-semibold">Par défaut</th>
                                <th class="px-4 py-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">title</td>
                                <td class="px-4 py-3">string</td>
                                <td class="px-4 py-3">-</td>
                                <td class="px-4 py-3">Titre de la modal.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">description</td>
                                <td class="px-4 py-3">string</td>
                                <td class="px-4 py-3">-</td>
                                <td class="px-4 py-3">Sous-titre ou description.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">size</td>
                                <td class="px-4 py-3">'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'</td>
                                <td class="px-4 py-3">'md'</td>
                                <td class="px-4 py-3">Largeur max de la modal.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">variant</td>
                                <td class="px-4 py-3">'default' | 'clean' | 'glass'</td>
                                <td class="px-4 py-3">'default'</td>
                                <td class="px-4 py-3">Style visuel général.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">close</td>
                                <td class="px-4 py-3">boolean | ButtonProps</td>
                                <td class="px-4 py-3">true</td>
                                <td class="px-4 py-3">Masque (false) ou personnalise le bouton de fermeture via les
                                    props du
                                    composant Button.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">
                                    close-on-outside-click</td>
                                <td class="px-4 py-3">boolean</td>
                                <td class="px-4 py-3">true</td>
                                <td class="px-4 py-3">Fermer en cliquant sur l'overlay.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Slots -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Slots</h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Nom</th>
                                <th class="px-4 py-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">default</td>
                                <td class="px-4 py-3">Le contenu principal de la modal (Body).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">header</td>
                                <td class="px-4 py-3">Remplace l'en-tête (titre + description).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">footer</td>
                                <td class="px-4 py-3">Contenu du bas de page (boutons d'action).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">close-icon</td>
                                <td class="px-4 py-3">Icône personnalisée pour le bouton fermer.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
