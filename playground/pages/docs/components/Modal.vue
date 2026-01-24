<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { Modal, Button, Icon, useModal } from '../../../../src/index'
import type { ModalSize, ModalVariant, ModalSeverity, ModalPosition, ModalOverlayVariant, ModalAnimation } from '../../../../src/components/modal/types'

// Configurator State
const isOpen = ref(false)
const selectedSize = ref<ModalSize>('md')
const selectedVariant = ref<ModalVariant>('default')
const selectedSeverity = ref<ModalSeverity>('default')
const selectedPosition = ref<ModalPosition>('center')
const selectedOverlayVariant = ref<ModalOverlayVariant>('default')
const selectedAnimation = ref<ModalAnimation>('scale')

const overlayBlur = ref(4)
const overlayOpacity = ref(0.4)
const autoClose = ref(0)

const showClose = ref(true)
const closeOnOutside = ref(true)
const isDraggable = ref(false)
const isResizable = ref(false)
const isLoading = ref<boolean | number>(false)
const isStickyHeader = ref(true)
const isStickyFooter = ref(true)
const isFullscreen = ref(false)

const modalTitle = ref('Configuration de la Modal')
const modalDescription = ref('Testez les nouvelles fonctionnalités premium du composant Modal.')

const sizeOptions: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full', 'auto']
const variantOptions: ModalVariant[] = ['default', 'clean', 'glass', 'bottom-sheet', 'neumorphic']
const severityOptions: ModalSeverity[] = ['default', 'success', 'danger', 'warning', 'info']
const positionOptions: ModalPosition[] = ['center', 'top', 'right', 'bottom', 'left']
const overlayOptions: ModalOverlayVariant[] = ['default', 'blur', 'dim', 'gradient']
const animationOptions: ModalAnimation[] = ['scale', 'slide', 'fade', 'zoom', 'bounce']

// Examples state
const simpleModal = ref(false)
const bottomSheetModal = ref(false)
const neumorphicModal = ref(false)
const wizardModal = ref(false)
const currentStep = ref(1)
const loadingModal = ref(false)
const loadingProgress = ref(0)
const draggableModal = ref(false)

const { open: openProgrammatic } = useModal()

const handleConfirm = () => {
    alert('Confirmé !')
    isOpen.value = false
}

const openDynamicModal = () => {
    openProgrammatic({
        title: 'Modal Programmatique',
        description: 'Ouverte via useModal() sans template.',
        severity: 'info',
        slots: {
            default: () => 'Ceci est une modal générée dynamiquement.',
            footer: () => h('div', { class: 'flex justify-end gap-2' }, [
                h(Button, { severity: 'secondary', onClick: () => alert('Fermé') }, () => 'OK')
            ])
        }
    })
}

const startLoading = () => {
    loadingModal.value = true
    loadingProgress.value = 0
    const interval = setInterval(() => {
        loadingProgress.value += 10
        if (loadingProgress.value >= 100) {
            clearInterval(interval)
            setTimeout(() => { loadingModal.value = false }, 500)
        }
    }, 300)
}

// Code Preview
const modalCodeExample = computed(() => {
    let props = ` v-model="isOpen"`
    if (selectedSize.value !== 'md') props += ` size="${selectedSize.value}"`
    if (selectedVariant.value !== 'default') props += ` variant="${selectedVariant.value}"`
    if (selectedSeverity.value !== 'default') props += ` severity="${selectedSeverity.value}"`
    if (selectedPosition.value !== 'center') props += ` position="${selectedPosition.value}"`
    if (selectedOverlayVariant.value !== 'default') props += ` overlay-variant="${selectedOverlayVariant.value}"`
    if (selectedAnimation.value !== 'scale') props += ` animation="${selectedAnimation.value}"`
    if (overlayBlur.value !== 4) props += ` :overlay-blur="${overlayBlur.value}"`
    if (overlayOpacity.value !== 0.4) props += ` :overlay-opacity="${overlayOpacity.value}"`
    if (autoClose.value > 0) props += ` :auto-close="${autoClose.value}"`
    if (isDraggable.value) props += ` draggable`
    if (isResizable.value) props += ` resizable`
    if (isLoading.value) props += ` :loading="${isLoading.value}"`
    if (!isStickyHeader.value) props += ` :sticky-header="false"`
    if (!isStickyFooter.value) props += ` :sticky-footer="false"`
    if (isFullscreen.value) props += ` fullscreen`
    if (!showClose.value) props += ` :close="false"`

    return `<Modal 
  title="${modalTitle.value}"${props}
>
  <p>Contenu personnalisé...</p>
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
                Premium
            </span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Modal (Dialog)
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Une fenêtre modale ultra-premium, accessible et hautement performante.
            Supporte le drag & drop, le redimensionnement, le multi-étapes et le swipe-to-dismiss.
        </p>

        <!-- Interactive Configurator -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <!-- First Row: Dropdowns -->
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div class="flex flex-col gap-1">
                    <span class="text-[10px] font-bold uppercase text-slate-400">Size</span>
                    <select v-model="selectedSize"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm">
                        <option v-for="opt in sizeOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-[10px] font-bold uppercase text-slate-400">Variant</span>
                    <select v-model="selectedVariant"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm">
                        <option v-for="opt in variantOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-[10px] font-bold uppercase text-slate-400">Severity</span>
                    <select v-model="selectedSeverity"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm">
                        <option v-for="opt in severityOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-[10px] font-bold uppercase text-slate-400">Position</span>
                    <select v-model="selectedPosition"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm">
                        <option v-for="opt in positionOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-[10px] font-bold uppercase text-slate-400">Overlay</span>
                    <select v-model="selectedOverlayVariant"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm">
                        <option v-for="opt in overlayOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-[10px] font-bold uppercase text-slate-400">Animation</span>
                    <select v-model="selectedAnimation"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm">
                        <option v-for="opt in animationOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
            </div>

            <!-- Second Row: Sliders & Numbers -->
            <div
                class="bg-white dark:bg-slate-900 px-4 py-3 border-b border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex flex-col gap-1">
                    <div class="flex justify-between">
                        <span class="text-[10px] font-bold uppercase text-slate-400">Overlay Opacity</span>
                        <span class="text-[10px] font-mono">{{ overlayOpacity }}</span>
                    </div>
                    <input v-model.number="overlayOpacity" type="range" min="0" max="1" step="0.1"
                        class="accent-indigo-500">
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex justify-between">
                        <span class="text-[10px] font-bold uppercase text-slate-400">Overlay Blur</span>
                        <span class="text-[10px] font-mono">{{ overlayBlur }}px</span>
                    </div>
                    <input v-model.number="overlayBlur" type="range" min="0" max="20" step="1"
                        class="accent-indigo-500">
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex justify-between">
                        <span class="text-[10px] font-bold uppercase text-slate-400">Auto Close (ms)</span>
                        <span class="text-[10px] font-mono">{{ autoClose || 'Off' }}</span>
                    </div>
                    <input v-model.number="autoClose" type="number" step="500"
                        class="bg-slate-50 dark:bg-slate-800 border-none rounded px-2 py-0.5 text-xs outline-none focus:ring-1 focus:ring-indigo-500">
                </div>
            </div>

            <!-- Third Row: Toggles -->
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-x-6 gap-y-2">
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input v-model="isDraggable" type="checkbox"
                        class="w-4 h-4 text-indigo-600 rounded border-slate-300">
                    <span
                        class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Draggable</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input v-model="isResizable" type="checkbox"
                        class="w-4 h-4 text-indigo-600 rounded border-slate-300">
                    <span
                        class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Resizable</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input :value="isLoading" @change="isLoading = ($event.target as HTMLInputElement).checked"
                        type="checkbox" class="w-4 h-4 text-indigo-600 rounded border-slate-300">
                    <span
                        class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Loading</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input v-model="isStickyHeader" type="checkbox"
                        class="w-4 h-4 text-indigo-600 rounded border-slate-300">
                    <span
                        class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Sticky
                        Header</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input v-model="isStickyFooter" type="checkbox"
                        class="w-4 h-4 text-indigo-600 rounded border-slate-300">
                    <span
                        class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Sticky
                        Footer</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input v-model="isFullscreen" type="checkbox"
                        class="w-4 h-4 text-indigo-600 rounded border-slate-300">
                    <span
                        class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Fullscreen</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input v-model="showClose" type="checkbox" class="w-4 h-4 text-indigo-600 rounded border-slate-300">
                    <span
                        class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Show
                        Close</span>
                </label>
            </div>

            <div class="bg-white dark:bg-slate-900 p-12 flex flex-col items-center justify-center min-h-[220px]">
                <Button severity="primary" size="lg" raised @click="isOpen = true" icon="heroicons:rocket-launch">
                    Lancer l'aperçu dynamique
                </Button>

                <Modal v-model="isOpen" :title="modalTitle" :description="modalDescription" :size="selectedSize"
                    :variant="selectedVariant" :severity="selectedSeverity" :position="selectedPosition"
                    :overlay-variant="selectedOverlayVariant" :animation="selectedAnimation" :overlay-blur="overlayBlur"
                    :overlay-opacity="overlayOpacity" :auto-close="autoClose" :draggable="isDraggable"
                    :resizable="isResizable" :loading="isLoading" :sticky-header="isStickyHeader"
                    :sticky-footer="isStickyFooter" :fullscreen="isFullscreen" :close="showClose">
                    <div class="space-y-4">
                        <p class="text-slate-600 dark:text-slate-400">
                            Ceci est le terrain de jeu ultime. Toutes les propriétés que vous changez ci-dessus sont
                            immédiatement reflétées ici.
                        </p>
                        <div
                            class="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
                            <div class="text-slate-400">Position: <span class="text-indigo-500">{{ selectedPosition
                            }}</span></div>
                            <div class="text-slate-400">Animation: <span class="text-indigo-500">{{ selectedAnimation
                            }}</span></div>
                            <div class="text-slate-400">Blur: <span class="text-indigo-500">{{ overlayBlur }}px</span>
                            </div>
                            <div class="text-slate-400">Opacity: <span class="text-indigo-500">{{ overlayOpacity
                            }}</span></div>
                        </div>
                    </div>
                    <template #footer>
                        <Button variant="outlined" severity="secondary" @click="isOpen = false">Fermer</Button>
                        <Button severity="primary" @click="isOpen = false">Enregistrer</Button>
                    </template>
                </Modal>
            </div>

            <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                <pre class="text-sm overflow-x-auto text-sky-400 font-mono"><code>{{ modalCodeExample }}</code></pre>
            </div>
        </div>

        <!-- Examples Grid -->
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Nouvelles Variantes & Comportements</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

            <!-- Bottom Sheet -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xl">
                        <Icon name="heroicons:device-phone-mobile" />
                    </div>
                    <h3 class="font-bold">Bottom Sheet</h3>
                </div>
                <p class="text-sm text-slate-500">Optimisé pour mobile : s'ouvre du bas, supporte le swipe-to-dismiss et
                    possède
                    un drag handle.</p>
                <Button severity="secondary" variant="outlined" @click="bottomSheetModal = true">Essayer
                    (Mobile-like)</Button>

                <Modal v-model="bottomSheetModal" variant="bottom-sheet" title="Menu Mobile" swipe-to-dismiss>
                    <div class="py-4 space-y-4">
                        <div v-for="i in 3" :key="i"
                            class="flex items-center gap-4 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                            <div
                                class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                <Icon :name="['heroicons:user', 'heroicons:cog', 'heroicons:bell'][i - 1]" />
                            </div>
                            <span class="font-medium">Option {{ i }}</span>
                        </div>
                    </div>
                </Modal>
            </div>

            <!-- Neumorphic -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-indigo-400 rounded-lg text-xl">
                        <Icon name="heroicons:square-3-stack-3d" />
                    </div>
                    <h3 class="font-bold">Neumorphic Style</h3>
                </div>
                <p class="text-sm text-slate-500">Un design basé sur les ombres portées pour un effet de relief doux et
                    organique.</p>
                <Button severity="secondary" variant="outlined" @click="neumorphicModal = true">Voir le relief</Button>

                <Modal v-model="neumorphicModal" variant="neumorphic" title="Style Neumorphic">
                    <p>Ce style utilise des ombres multiples pour créer une illusion de profondeur sans bordures dures.
                    </p>
                    <template #footer>
                        <Button severity="primary" @click="neumorphicModal = false">Fermer</Button>
                    </template>
                </Modal>
            </div>

            <!-- Wizard / Multi-step -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xl">
                        <Icon name="heroicons:arrow-path" />
                    </div>
                    <h3 class="font-bold">Wizard (Multi-step)</h3>
                </div>
                <p class="text-sm text-slate-500">Navigation interne avec transitions fluides entre les étapes.</p>
                <Button severity="success" variant="outlined" @click="wizardModal = true; currentStep = 1">Lancer
                    Wizard</Button>

                <Modal v-model="wizardModal" v-model:step="currentStep" title="Configuration Wizard">
                    <template #body="{ step }">
                        <div v-if="step === 1" class="space-y-4">
                            <h4 class="font-bold">Étape 1 : Informations</h4>
                            <p>Renseignez vos informations de base.</p>
                            <input type="text" placeholder="Nom du projet"
                                class="w-full p-2 border rounded border-slate-200 dark:border-slate-700 bg-transparent">
                        </div>
                        <div v-else-if="step === 2" class="space-y-4">
                            <h4 class="font-bold">Étape 2 : Validation</h4>
                            <p>Veuillez confirmer vos choix.</p>
                            <div
                                class="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 rounded border border-emerald-100 text-sm">
                                Tout semble correct !
                            </div>
                        </div>
                    </template>
                    <template #footer>
                        <Button v-if="currentStep > 1" variant="ghost" @click="currentStep--">Précédent</Button>
                        <Button v-if="currentStep < 2" severity="primary" @click="currentStep++">Suivant</Button>
                        <Button v-else severity="success" @click="wizardModal = false">Terminer</Button>
                    </template>
                </Modal>
            </div>

            <!-- Loading & Blocking -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xl">
                        <Icon name="heroicons:arrow-path-20-solid" />
                    </div>
                    <h3 class="font-bold">Loading & Blocking</h3>
                </div>
                <p class="text-sm text-slate-500">Masque d'interaction et barre de progression pour les actions
                    asynchrones.</p>
                <Button severity="info" variant="outlined" @click="startLoading">Tester Loading</Button>

                <Modal v-model="loadingModal" title="Traitement en cours" :loading="loadingProgress"
                    :dismissible="false">
                    <p>La modale est bloquée tant que le chargement n'est pas fini.</p>
                </Modal>
            </div>

            <!-- Programmatic useModal -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 rounded-lg text-xl">
                        <Icon name="heroicons:code-bracket" />
                    </div>
                    <h3 class="font-bold">Programmatique</h3>
                </div>
                <p class="text-sm text-slate-500">Ouvrez des modales directement via JavaScript avec le composant
                    <code>ModalRenderer</code>.
                </p>
                <Button severity="secondary" variant="outlined" @click="openDynamicModal">useModal()</Button>
            </div>

            <!-- Draggable -->
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div
                        class="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xl">
                        <Icon name="heroicons:arrows-pointing-out" />
                    </div>
                    <h3 class="font-bold">Draggable Header</h3>
                </div>
                <p class="text-sm text-slate-500">Déplacez librement la fenêtre n'importe où sur l'écran via son header.
                </p>
                <Button severity="primary" variant="outlined" @click="draggableModal = true">Ouvrir et glisser</Button>

                <Modal v-model="draggableModal" title="Déplace-moi !" draggable>
                    <div class="p-12 border-2 border-dashed border-indigo-200 rounded-lg text-center text-slate-400">
                        Saisissez le header pour me bouger
                    </div>
                </Modal>
            </div>

        </div>

        <!-- Section Documentation API -->
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Documentation API</h2>

        <div class="space-y-12">
            <!-- Props -->
            <div>
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="heroicons:list-bullet" class="text-indigo-500" />
                    Propriétés (Props)
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Propriété</th>
                                <th class="px-4 py-3 font-semibold">Type</th>
                                <th class="px-4 py-3 font-semibold">Défaut</th>
                                <th class="px-4 py-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">modelValue / open</td>
                                <td class="px-4 py-3 text-slate-500">boolean</td>
                                <td class="px-4 py-3 text-slate-500">false</td>
                                <td class="px-4 py-3">Contrôle l'état d'ouverture de la modale.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">title</td>
                                <td class="px-4 py-3 text-slate-500">string</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Titre de la modale (utilisé pour l'accessibilité).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">description</td>
                                <td class="px-4 py-3 text-slate-500">string</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Description secondaire sous le titre.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">size</td>
                                <td class="px-4 py-3 text-slate-500">sm | md | lg | xl | full | auto</td>
                                <td class="px-4 py-3 text-slate-500">'md'</td>
                                <td class="px-4 py-3">Largeur prédéfinie de la fenêtre.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">variant</td>
                                <td class="px-4 py-3 text-slate-500">default | clean | glass | bottom-sheet | neumorphic
                                </td>
                                <td class="px-4 py-3 text-slate-500">'default'</td>
                                <td class="px-4 py-3">Style visuel de la modale.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">severity</td>
                                <td class="px-4 py-3 text-slate-500">default | success | danger | warning | info</td>
                                <td class="px-4 py-3 text-slate-500">'default'</td>
                                <td class="px-4 py-3">Applique des accents de couleur thématiques.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">position</td>
                                <td class="px-4 py-3 text-slate-500">center | top | right | bottom | left</td>
                                <td class="px-4 py-3 text-slate-500">'center'</td>
                                <td class="px-4 py-3">Positionnement sur l'écran (type Drawer).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">animation</td>
                                <td class="px-4 py-3 text-slate-500">scale | slide | fade | zoom | bounce</td>
                                <td class="px-4 py-3 text-slate-500">'scale'</td>
                                <td class="px-4 py-3">Type de transition à l'entrée et sortie.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">transition</td>
                                <td class="px-4 py-3 text-slate-500">boolean</td>
                                <td class="px-4 py-3 text-slate-500">true</td>
                                <td class="px-4 py-3">Active ou désactive les animations.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">loading</td>
                                <td class="px-4 py-3 text-slate-500">boolean | number</td>
                                <td class="px-4 py-3 text-slate-500">false</td>
                                <td class="px-4 py-3">Affiche une barre de chargement (0-100 ou indéterminé).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">dismissible</td>
                                <td class="px-4 py-3 text-slate-500">boolean</td>
                                <td class="px-4 py-3 text-slate-500">true</td>
                                <td class="px-4 py-3">Permet la fermeture via Escape ou clic externe.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">overlay</td>
                                <td class="px-4 py-3 text-slate-500">boolean</td>
                                <td class="px-4 py-3 text-slate-500">true</td>
                                <td class="px-4 py-3">Affiche ou non le fond obscurci.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">overlayVariant</td>
                                <td class="px-4 py-3 text-slate-500">default | blur | dim | gradient</td>
                                <td class="px-4 py-3 text-slate-500">'default'</td>
                                <td class="px-4 py-3">Style visuel de l'overlay.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">draggable</td>
                                <td class="px-4 py-3 text-slate-500">boolean</td>
                                <td class="px-4 py-3 text-slate-500">false</td>
                                <td class="px-4 py-3">Permet de déplacer la modale via le header.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">resizable</td>
                                <td class="px-4 py-3 text-slate-500">boolean</td>
                                <td class="px-4 py-3 text-slate-500">false</td>
                                <td class="px-4 py-3">Ajoute une poignée de redimensionnement.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">autoClose</td>
                                <td class="px-4 py-3 text-slate-500">number</td>
                                <td class="px-4 py-3 text-slate-500">0</td>
                                <td class="px-4 py-3">Fermeture automatique après X ms.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">swipeToDismiss</td>
                                <td class="px-4 py-3 text-slate-500">boolean</td>
                                <td class="px-4 py-3 text-slate-500">true</td>
                                <td class="px-4 py-3">Fermeture par glissement (Bottom-Sheet).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Slots -->
            <div>
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="heroicons:rectangle-group" class="text-indigo-500" />
                    Slots
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Nom</th>
                                <th class="px-4 py-3 font-semibold">Scope</th>
                                <th class="px-4 py-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">default</td>
                                <td class="px-4 py-3 text-slate-500">{ step, open }</td>
                                <td class="px-4 py-3">Contenu principal du corps de la modale.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">header</td>
                                <td class="px-4 py-3 text-slate-500">{ close }</td>
                                <td class="px-4 py-3">Remplace l'intégralité de l'en-tête.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">title</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Personnalisation du titre uniquement.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">footer</td>
                                <td class="px-4 py-3 text-slate-500">{ close }</td>
                                <td class="px-4 py-3">Zone d'actions en bas de modale.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">close-icon</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Remplace l'icône de fermeture par défaut.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Events -->
            <div>
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="heroicons:bolt" class="text-indigo-500" />
                    Événements (Emits)
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Événement</th>
                                <th class="px-4 py-3 font-semibold">Payload</th>
                                <th class="px-4 py-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">open</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Émis à l'ouverture de la modale.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">close</td>
                                <td class="px-4 py-3 text-slate-500">any?</td>
                                <td class="px-4 py-3">Émis à la fermeture (retourne le résultat si fourni).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">close:prevent</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Émis quand une fermeture est bloquée (dismissible: false).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">after-leave</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Émis une fois l'animation de sortie terminée.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- programmatic API -->
            <div class="p-6 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <h3 class="text-lg font-bold text-white mb-4">Utilisation Programmatique</h3>
                <pre class="text-indigo-300 font-mono text-xs"><code>import { useModal } from '@webflow/ui'

                const { open } = useModal()

                open({
                title: 'Alerte Système',
                severity: 'danger',
                slots: {
                default: () => 'Données perdues !'
                }
                })</code></pre>
            </div>
        </div>
    </section>
</template>
