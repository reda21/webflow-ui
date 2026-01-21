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

        <!-- ═══════════════════════════════════════════════════════════════════════════ -->
        <!-- API SECTION -->
        <!-- ═══════════════════════════════════════════════════════════════════════════ -->
        <div class="scroll-mt-24 mb-16" id="api">
            <div class="flex items-center gap-3 mb-6">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">API</h2>
                <span
                    class="px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">ButtonProps</span>
            </div>
            <p class="text-slate-600 dark:text-slate-400 mb-8">
                Définition des propriétés, événements et slots du composant Button.
            </p>

            <!-- Props Table -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Props
            </h3>
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
                        <!-- Apparence -->
                        <tr class="bg-slate-50/50 dark:bg-slate-800/30">
                            <td colspan="4"
                                class="py-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                                Apparence
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                severity</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'primary'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Définit la couleur d'accentuation
                                du bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                variant</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'soft' | 'outlined' | 'subtle' | 'ghost' | 'link'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'soft'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Style visuel du bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">size
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'md'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Taille du bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                rounded</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'md'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Rayon de bordure du bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                shadow</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'none'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Ombre portée colorée selon la
                                severity.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">ring
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'none' | '1' | '2' | '4'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'none'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Anneau de focus coloré selon la
                                severity.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                raised</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Ajoute un effet d'élévation au
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                square</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Force un ratio d'aspect carré
                                (utile pour les boutons d'icône).</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">block
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Affiche le bouton sur toute la
                                largeur de son conteneur.</td>
                        </tr>

                        <!-- Contenu -->
                        <tr class="bg-slate-50/50 dark:bg-slate-800/30">
                            <td colspan="4"
                                class="py-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                                Contenu
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">label
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Texte affiché dans le bouton
                                (alternative au slot par défaut).</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">icon
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Nom de l'icône Iconify à afficher.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                leadingIcon</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Icône toujours affichée au début du
                                bouton (prioritaire sur <code>icon</code>).</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                iconPos</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'left' | 'right' | 'top' | 'bottom'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'left'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Position de l'icône par rapport au
                                label.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                avatar</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">URL d'une image avatar à afficher
                                dans le bouton.</td>
                        </tr>

                        <!-- État -->
                        <tr class="bg-slate-50/50 dark:bg-slate-800/30">
                            <td colspan="4"
                                class="py-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                                État
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                loading</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Affiche un spinner et désactive le
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                loadingAuto</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Gère automatiquement l'état de
                                chargement lors d'un click retournant une Promise.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                disabled</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Désactive les interactions avec le
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                active</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Force l'état actif du bouton (pour
                                les NuxtLinks).</td>
                        </tr>

                        <!-- Rendu HTML -->
                        <tr class="bg-slate-50/50 dark:bg-slate-800/30">
                            <td colspan="4"
                                class="py-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                                Rendu HTML
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">as
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'button' | 'a' | 'input'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'button'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Élément HTML à rendre.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">type
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'button' | 'submit' | 'reset'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'button'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Type HTML du bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">to
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string |
                                object</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Transforme le bouton en NuxtLink
                                vers cette destination.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">href
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">URL de destination (quand
                                <code>as="a"</code>).
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">value
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Valeur du champ (quand
                                <code>as="input"</code>).
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">name
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Attribut name pour les formulaires.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                autofocus</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Donne le focus au bouton au
                                chargement de la page.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                referrerpolicy</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Politique de référent pour les
                                liens.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                trailingSlash</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'remove' | 'append'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Gestion du slash final pour les
                                NuxtLinks.</td>
                        </tr>

                        <!-- Accessibilité ARIA -->
                        <tr class="bg-slate-50/50 dark:bg-slate-800/30">
                            <td colspan="4"
                                class="py-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                                Accessibilité (ARIA)
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaLabel</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Libellé accessible pour les
                                lecteurs d'écran.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaExpanded</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Indique si l'élément contrôlé est
                                déployé.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaPressed</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean |
                                'mixed'</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Indique l'état pressé d'un bouton à
                                bascule.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaControls</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">ID de l'élément contrôlé par ce
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaHaspopup</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Indique le type de popup déclenché.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaCurrent</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">boolean | 'page' | 'step' | 'location' | 'date' | 'time'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Indique l'élément courant dans un
                                ensemble.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaDescribedby</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">ID de l'élément décrivant ce
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaLabelledby</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">ID de l'élément servant de libellé.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaLive</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'off' | 'assertive' | 'polite'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Priorité des annonces pour les
                                régions live.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaHidden</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Cache l'élément aux technologies
                                d'assistance.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Events Table -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Events
            </h3>
            <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-12">
                <table class="w-full text-sm text-left">
                    <thead
                        class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th class="py-3 px-4">Événement</th>
                            <th class="py-3 px-4">Paramètres</th>
                            <th class="py-3 px-4">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">click
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code class="bg-slate-100 dark:bg-slate-800 px-1 rounded">event: MouseEvent</code>
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">
                                Émis lors du clic sur le bouton. Avec <code>loadingAuto</code>, l'état de chargement est
                                géré automatiquement si le handler retourne une Promise.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Slots Table -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                Slots
            </h3>
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
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                default</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">
                                Contenu principal du bouton. Peut être du texte, des éléments HTML ou d'autres
                                composants.
                                Alternative à la prop <code>label</code>.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">icon
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">
                                Permet de personnaliser l'icône affichée. Remplace l'icône par défaut définie via les
                                props <code>icon</code> ou <code>leadingIcon</code>.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════════════════════ -->
        <!-- ACCESSIBILITY SECTION -->
        <!-- ═══════════════════════════════════════════════════════════════════════════ -->
        <div class="scroll-mt-24 mb-16" id="accessibility">
            <div class="flex items-center gap-3 mb-6">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Accessibilité</h2>
                <span
                    class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">WCAG
                    2.1</span>
            </div>

            <!-- Screen Reader -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Lecteur d'écran</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 mb-8">
                <p class="text-slate-600 dark:text-slate-400 mb-4">
                    Le composant Button rend un élément <code>&lt;button&gt;</code> natif qui inclut implicitement tous
                    les attributs passés.
                    Le texte pour décrire le bouton est défini avec la prop <code>aria-label</code>. Si elle n'est pas
                    présente, la prop <code>label</code> ou le contenu du slot est utilisé.
                </p>
                <p class="text-slate-600 dark:text-slate-400 mb-4">
                    Pour les <strong>boutons d'icône uniquement</strong> ou avec un contenu personnalisé, il est
                    recommandé d'utiliser
                    <code>aria-label</code> pour que les lecteurs d'écran puissent annoncer correctement l'élément.
                </p>
                <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 rounded-lg">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;!-- Bouton icône avec aria-label --&gt;
&lt;Button icon="heroicons:check" aria-label="Valider" /&gt;

&lt;!-- Bouton avec label (accessible automatiquement) --&gt;
&lt;Button icon="heroicons:check" label="Valider" /&gt;

&lt;!-- Bouton personnalisé avec aria-label --&gt;
&lt;Button class="youtube" aria-label="Voir sur YouTube"&gt;
  &lt;Icon name="logos:youtube" /&gt;
  &lt;span&gt;YouTube&lt;/span&gt;
&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Keyboard Support -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Support Clavier</h3>
            <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-8">
                <table class="w-full text-sm text-left">
                    <thead
                        class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th class="py-3 px-4">Touche</th>
                            <th class="py-3 px-4">Fonction</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="py-3 px-4">
                                <kbd
                                    class="px-2 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded">Tab</kbd>
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Déplace le focus vers le bouton.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4">
                                <kbd
                                    class="px-2 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded">Enter</kbd>
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Active le bouton (déclenche
                                l'événement click).</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4">
                                <kbd
                                    class="px-2 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded">Space</kbd>
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Active le bouton (déclenche
                                l'événement click).</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Best Practices -->
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Bonnes pratiques</h3>
            <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
                <ul class="space-y-3 text-slate-600 dark:text-slate-400">
                    <li class="flex items-start gap-3">
                        <span class="text-emerald-500 mt-0.5">✓</span>
                        <span>Utilisez toujours un texte descriptif ou <code>aria-label</code> pour les boutons
                            d'icône.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-emerald-500 mt-0.5">✓</span>
                        <span>Préférez <code>type="submit"</code> pour les boutons de soumission de formulaire.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-emerald-500 mt-0.5">✓</span>
                        <span>Utilisez <code>aria-expanded</code> pour les boutons qui contrôlent des menus ou
                            accordéons.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-emerald-500 mt-0.5">✓</span>
                        <span>Utilisez <code>aria-pressed</code> pour les boutons à bascule (toggle buttons).</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-amber-500 mt-0.5">⚠</span>
                        <span>Évitez d'utiliser <code>as="a"</code> pour des actions qui ne naviguent pas vers une
                            URL.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-amber-500 mt-0.5">⚠</span>
                        <span>N'utilisez pas <code>disabled</code> si vous pouvez plutôt fournir un feedback
                            explicite.</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
