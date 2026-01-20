<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button, SocialButton } from '../../../../src/index'
// Import Types
import type { ButtonSeverity, ButtonVariant, ButtonSize, ButtonRounded, ButtonShadow, ButtonRing, ButtonIconPos } from '../../../../src/components/button/types'

// Button Configurator State
type ButtonAs = 'button' | 'a' | 'input'

const selectedSeverity = ref<ButtonSeverity>('primary')
const selectedVariant = ref<ButtonVariant>('soft')
const selectedSize = ref<ButtonSize>('md')
const selectedRounded = ref<ButtonRounded>('md')
const selectedShadow = ref<ButtonShadow>('none')
const selectedRing = ref<ButtonRing>('none')
const selectedAs = ref<ButtonAs>('button')
const selectedIcon = ref('')
const selectedIconPos = ref<ButtonIconPos>('left')
const showOnlyIcon = ref(false)

const severityOptions: ButtonSeverity[] = ['primary', 'secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast']
const variantOptions: ButtonVariant[] = ['soft', 'outlined', 'subtle', 'ghost', 'link']
const sizeOptions: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const roundedOptions: ButtonRounded[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full']
const shadowOptions: ButtonShadow[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner']
const ringOptions: ButtonRing[] = ['none', '1', '2', '4']
const asOptions: ButtonAs[] = ['button', 'a', 'input']
const iconPosOptions: ButtonIconPos[] = ['left', 'right', 'top', 'bottom']
const iconOptions = [
    { label: 'Aucun', value: '' },
    { label: 'Recherche', value: 'heroicons:magnifying-glass' },
    { label: 'Fusée', value: 'heroicons:rocket-launch' },
    { label: 'Paramètres', value: 'heroicons:cog-6-tooth' },
    { label: 'Supprimer', value: 'heroicons:trash' },
    { label: 'Plus', value: 'heroicons:plus' },
]

const buttonCodeExample = computed(() => {
    let props = ''
    if (selectedSeverity.value !== 'primary') {
        props += ` severity="${selectedSeverity.value}"`
    }
    if (selectedVariant.value !== 'soft') {
        props += ` variant="${selectedVariant.value}"`
    }
    if (selectedSize.value !== 'md') {
        props += ` size="${selectedSize.value}"`
    }
    if (selectedRounded.value !== 'md') {
        props += ` rounded="${selectedRounded.value}"`
    }
    if (selectedShadow.value !== 'none') {
        props += ` shadow="${selectedShadow.value}"`
    }
    if (selectedRing.value !== 'none') {
        props += ` ring="${selectedRing.value}"`
    }
    if (selectedAs.value !== 'button') {
        props += ` as="${selectedAs.value}"`
    }
    if (selectedIcon.value) {
        props += ` icon="${selectedIcon.value}"`
        if (selectedIconPos.value !== 'left') {
            props += ` icon-pos="${selectedIconPos.value}"`
        }
    }
    const label = showOnlyIcon.value && selectedIcon.value ? '' : 'Button'
    return `<Button${props}>${label}</Button>`
})
</script>

<template>
    <section id="button" class="scroll-mt-24 mb-20">
        <div class="flex items-center gap-3 mb-2">
            <span
                class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Button
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Composant de bouton personnalisable avec plus de 30 combinaisons de styles, support d'icônes et états de
            chargement.
        </p>

        <!-- Interactive Configurator -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <!-- Configurator Header -->
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4">
                <!-- Severity -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">severity</span>
                    <select v-model="selectedSeverity"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in severityOptions" :key="opt" :value="opt">{{ opt }}</option>
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
                <!-- Size -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">size</span>
                    <select v-model="selectedSize"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in sizeOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <!-- Rounded -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">rounded</span>
                    <select v-model="selectedRounded"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in roundedOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <!-- Shadow -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">shadow</span>
                    <select v-model="selectedShadow"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in shadowOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <!-- Ring -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">ring</span>
                    <select v-model="selectedRing"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in ringOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <!-- Icon -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Icône</span>
                    <select v-model="selectedIcon"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                </div>
                <!-- Position (conditional) -->
                <div v-if="selectedIcon" class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Pos.</span>
                    <select v-model="selectedIconPos"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in iconPosOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                </div>
                <!-- Mode "Icône Seule" (conditional) -->
                <div v-if="selectedIcon" class="flex items-center gap-2">
                    <input type="checkbox" v-model="showOnlyIcon" id="icon-only"
                        class="w-4 h-4 text-indigo-600 rounded">
                    <label for="icon-only"
                        class="text-xs font-medium text-slate-500 dark:text-slate-400 cursor-pointer">Seule</label>
                </div>
            </div>

            <!-- Live Preview -->
            <div
                class="bg-white dark:bg-slate-900 p-12 flex items-center justify-center min-h-[160px] transition-colors duration-300">
                <Button :severity="selectedSeverity" :variant="selectedVariant" :size="selectedSize"
                    :rounded="selectedRounded" :shadow="selectedShadow" :ring="selectedRing" :as="selectedAs"
                    :icon="selectedIcon" :icon-pos="selectedIconPos">
                    {{ showOnlyIcon && selectedIcon ? '' : 'Button' }}
                </Button>
            </div>

            <!-- Code Preview -->
            <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  {{ buttonCodeExample }}
&lt;/template&gt;</code></pre>
            </div>
        </div>

        <!-- Props Table -->
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Props</h3>
        <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-12">
            <table class="w-full text-sm text-left">
                <thead
                    class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th class="py-3 px-4">Propriété</th>
                        <th class="py-3 px-4">Type</th>
                        <th class="py-3 px-4">Par défaut</th>
                        <th class="py-3 px-4">Description</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">severity
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'primary'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Couleur d'accentuation (primary,
                            secondary, success, info, warn, help, danger, contrast).</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">variant
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'soft'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Style visuel du bouton (soft, outlined,
                            subtle, ghost, link).</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">size</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'md'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Taille du bouton (xs, sm, md, lg, xl,
                            2xl).</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">block
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">false</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Affiche le bouton sur toute la largeur
                            de son conteneur.</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">icon</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">''</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Nom de l'icône Iconify à afficher.</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">iconPos
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'left'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Position de l'icône (left, right, top,
                            bottom).</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">loading
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">false</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Affiche un indicateur de chargement et
                            désactive le bouton.</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                            loadingAuto</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">false</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Gère automatiquement l'état de
                            chargement basé sur la promesse du clic.</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">disabled
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">false</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Désactive les interactions avec le
                            bouton.</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">to</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string | object
                        </td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">undefined</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Transforme le bouton en lien NuxtLink.
                        </td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">as</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'button'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Élément HTML à utiliser (button, a,
                            input).</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">type</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'button'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Type HTML du bouton (button, submit,
                            reset).</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">autofocus
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">false</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Donne le focus au bouton lors du
                            chargement de la page.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Slots Table -->
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Slots</h3>
        <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-12">
            <table class="w-full text-sm text-left">
                <thead
                    class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th class="py-3 px-4">Slot</th>
                        <th class="py-3 px-4">Description</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">default
                        </td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Contenu principal du bouton.</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">icon</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Permet de remplacer l'icône par défaut.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Section Variantes -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Variantes</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <Button variant="soft" severity="primary">Soft</Button>
                <Button variant="outlined" severity="primary">Outlined</Button>
                <Button variant="subtle" severity="primary">Subtle</Button>
                <Button variant="ghost" severity="primary">Ghost</Button>
                <Button variant="link" severity="primary">Link</Button>
            </div>
        </div>

        <!-- Section Sévérités -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Sévérités</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <Button severity="primary" rounded="full">Primary</Button>
                <Button severity="secondary" rounded="full">Secondary</Button>
                <Button severity="success" rounded="full">Success</Button>
                <Button severity="info" rounded="full">Info</Button>
                <Button severity="warn" rounded="full">Warning</Button>
                <Button severity="danger" rounded="full">Danger</Button>
                <Button severity="contrast" rounded="full">Contrast</Button>
            </div>
        </div>

        <!-- Section Social -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Boutons Sociaux</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <SocialButton provider="google">Google</SocialButton>
                <SocialButton provider="github">GitHub</SocialButton>
                <SocialButton provider="facebook">Facebook</SocialButton>
                <SocialButton provider="twitter">Twitter</SocialButton>
            </div>
        </div>

        <!-- Section Icons -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Icônes</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap items-center gap-4">
                <Button icon="heroicons:magnifying-glass" severity="primary">Suivant</Button>
                <Button icon="heroicons:rocket-launch" severity="success" icon-pos="right">Lancer</Button>
                <Button icon="heroicons:trash" severity="danger" />
                <Button icon="heroicons:cog-6-tooth" severity="secondary" rounded="full" />
                <Button icon="heroicons:plus" severity="contrast" size="xl" rounded="full" />
            </div>
        </div>

        <!-- Section Ombres -->
        <div class="mb-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Ombres (Shadows)</h3>
            <div
                class="p-12 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-center gap-8">
                <Button shadow="sm" severity="contrast">Shadow SM</Button>
                <Button shadow="md" severity="contrast">Shadow MD</Button>
                <Button shadow="lg" severity="contrast">Shadow LG</Button>
                <Button shadow="xl" severity="contrast">Shadow XL</Button>
                <Button shadow="2xl" severity="contrast">Shadow 2XL</Button>
                <Button shadow="inner" severity="contrast" variant="subtle">Inner Shadow</Button>
            </div>
        </div>

        <!-- Section Anneaux -->
        <div class="mb-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Anneaux (Focus Rings)</h3>
            <div
                class="p-12 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 flex flex-wrap items-center justify-center gap-8">
                <Button ring="1" severity="primary">Ring 1</Button>
                <Button ring="2" severity="success">Ring 2</Button>
                <Button ring="4" severity="danger">Ring 4</Button>
                <Button ring="2" severity="info" variant="outlined">Outlined Ring</Button>
            </div>
        </div>
        <!-- Section Avatar et Label -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Avatar et Label</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Utilisez les props <code>label</code> pour le texte et <code>avatar</code> pour afficher une image.
            </p>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4 items-center">
                <Button avatar="https://i.pravatar.cc/150?img=1" label="John Doe" variant="soft" severity="info" />
                <Button avatar="https://i.pravatar.cc/150?img=32" severity="success" rounded="full" />
                <Button label="Label seul" variant="outlined" />
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre
                    class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button avatar="..." label="John Doe" variant="soft" /&gt;</code></pre>
            </div>
        </div>

        <!-- Section Icônes avancées -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Icônes avancées</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Utilisez <code>leadingIcon</code> pour forcer une icône au début.
            </p>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4 items-center">
                <Button leadingIcon="heroicons:sparkles" label="Premium" severity="help" raised />
                <Button leadingIcon="heroicons:check-circle" severity="success" square />
            </div>
        </div>

        <!-- Section Render Types -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Types de rendu (as)</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <Button as="button">HTML Button</Button>
                <Button as="a" href="#">HTML Link (a)</Button>
                <Button as="input" type="submit" value="HTML Input Submit" />
            </div>
        </div>
    </section>
</template>
