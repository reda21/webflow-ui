<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button, SocialButton, ButtonGroup, SplitButton } from '../../../../src/index'
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

// States for new examples
const toggleValue = ref('bold')
const multiToggleValue = ref(['bold'])
const splitButtonLoading = ref(false)

const handleSplitClick = () => {
    splitButtonLoading.value = true
    setTimeout(() => {
        splitButtonLoading.value = false
    }, 2000)
}


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

        <!-- Section Nouvelles Variantes Avancées -->
        <div class="mb-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Variantes Avancées</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Nouvelles variantes visuelles avec des effets modernes et dynamiques.
            </p>

            <!-- Gradient -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                    Gradient
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Boutons avec dégradés colorés dynamiques. L'effet s'intensifie au survol.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-gradient">Primary Gradient</button>
                    <button class="btn btn-success btn-gradient">Success Gradient</button>
                    <button class="btn btn-danger btn-gradient">Danger Gradient</button>
                    <button class="btn btn-info btn-gradient">Info Gradient</button>
                    <button class="btn btn-help btn-gradient">Help Gradient</button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre
                        class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-gradient"&gt;Gradient&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- Glass -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-white/50 backdrop-blur border border-white/30"></span>
                    Glass (Glassmorphism)
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Effet glassmorphism avec <code>backdrop-blur</code> pour un look moderne et translucide.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-glass">Primary Glass</button>
                    <button class="btn btn-success btn-glass">Success Glass</button>
                    <button class="btn btn-danger btn-glass">Danger Glass</button>
                    <button class="btn btn-info btn-glass">Info Glass</button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre
                        class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-glass"&gt;Glass&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- 3D -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded bg-indigo-500 shadow-[0_2px_0_0_theme(colors.indigo.700)]"></span>
                    3D (Profondeur)
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Effet de profondeur avec ombres décalées. Le bouton s'enfonce au clic pour un feedback tactile.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-3d">Primary 3D</button>
                    <button class="btn btn-success btn-3d">Success 3D</button>
                    <button class="btn btn-danger btn-3d">Danger 3D</button>
                    <button class="btn btn-warn btn-3d">Warning 3D</button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre
                        class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-3d"&gt;3D Button&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- Neon -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span
                        class="w-3 h-3 rounded-full bg-transparent border-2 border-cyan-400 shadow-[0_0_5px_theme(colors.cyan.400)]"></span>
                    Neon (Glow)
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Effet lumineux/glow autour du bouton. Particulièrement efficace sur fond sombre.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-neon">Primary Neon</button>
                    <button class="btn btn-success btn-neon">Success Neon</button>
                    <button class="btn btn-danger btn-neon">Danger Neon</button>
                    <button class="btn btn-info btn-neon">Info Neon</button>
                    <button class="btn btn-help btn-neon">Help Neon</button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre
                        class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-neon"&gt;Neon&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- Pill -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-4 h-2.5 rounded-full bg-indigo-500"></span>
                    Pill
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Variante avec bords arrondis maximum (<code>rounded-full</code>) et padding horizontal augmenté.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-pill">Primary Pill</button>
                    <button class="btn btn-success btn-pill">Success Pill</button>
                    <button class="btn btn-danger btn-outlined btn-pill">Outlined Pill</button>
                    <button class="btn btn-info btn-subtle btn-pill">Subtle Pill</button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre
                        class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-pill"&gt;Pill&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- Combinaisons -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"></span>
                    Combinaisons
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Les variantes peuvent être combinées pour créer des effets uniques.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-gradient btn-pill">Gradient + Pill</button>
                    <button class="btn btn-success btn-3d btn-pill">3D + Pill</button>
                    <button class="btn btn-danger btn-neon btn-pill">Neon + Pill</button>
                    <button class="btn btn-info btn-glass btn-pill">Glass + Pill</button>
                </div>
            </div>
        </div>

        <!-- Section Améliorations Visuelles -->
        <div class="mb-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Améliorations Visuelles</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Effets visuels avancés pour améliorer l'expérience utilisateur et le feedback interactif.
            </p>

            <!-- Effet Ripple -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-blue-500 animate-ping"></span>
                    Effet Ripple (Material Design)
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Animation d'ondulation au clic inspirée de Material Design. Cliquez sur les boutons pour voir
                    l'effet.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-ripple">Ripple Primary</button>
                    <button class="btn btn-success btn-ripple">Ripple Success</button>
                    <button class="btn btn-danger btn-ripple">Ripple Danger</button>
                    <button class="btn btn-secondary btn-ripple btn-ripple-dark">Ripple Dark</button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-ripple"&gt;Ripple&lt;/button&gt;
&lt;!-- Pour boutons clairs --&gt;
&lt;button class="btn btn-secondary btn-ripple btn-ripple-dark"&gt;Ripple&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- Transitions Fluides -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-purple-500"></span>
                    Transitions Fluides
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Transitions avec courbes de Bézier pour un mouvement naturel. Survol = élévation, clic =
                    compression.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-smooth">Smooth Primary</button>
                    <button class="btn btn-success btn-smooth">Smooth Success</button>
                    <button class="btn btn-info btn-smooth btn-ripple">Smooth + Ripple</button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre
                        class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-smooth"&gt;Smooth&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- Animations d'Icônes -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-amber-500"></span>
                    Animations d'Icônes
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Animations pour attirer l'attention ou indiquer un état : rotation, pulse, bounce, shake.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-6">
                    <div class="flex flex-col items-center gap-2">
                        <button class="btn btn-primary btn-icon-spin">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Spin
                        </button>
                        <span class="text-xs text-slate-500">btn-icon-spin</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <button class="btn btn-danger btn-icon-pulse">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            Pulse
                        </button>
                        <span class="text-xs text-slate-500">btn-icon-pulse</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <button class="btn btn-success btn-icon-bounce">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            Bounce
                        </button>
                        <span class="text-xs text-slate-500">btn-icon-bounce</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <button class="btn btn-warn btn-icon-shake">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Shake
                        </button>
                        <span class="text-xs text-slate-500">btn-icon-shake</span>
                    </div>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-icon-spin"&gt;...&lt;/button&gt;
&lt;button class="btn btn-danger btn-icon-pulse"&gt;...&lt;/button&gt;
&lt;button class="btn btn-success btn-icon-bounce"&gt;...&lt;/button&gt;
&lt;button class="btn btn-warn btn-icon-shake"&gt;...&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- Animations au survol -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-cyan-500"></span>
                    Animations au Survol
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Animations déclenchées uniquement au survol pour un effet plus subtil.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-icon-hover-spin">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Hover Spin
                    </button>
                    <button class="btn btn-success btn-icon-hover-bounce">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Hover Bounce
                    </button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-icon-hover-spin"&gt;...&lt;/button&gt;
&lt;button class="btn btn-success btn-icon-hover-bounce"&gt;...&lt;/button&gt;</code></pre>
                </div>
            </div>

            <!-- État Success -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                    État Success (Checkmark animé)
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Feedback visuel après une action réussie avec checkmark animé. Cliquez pour tester !
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-success-state" @click="(e) => {
                        e.target.classList.add('is-success');
                        setTimeout(() => e.target.classList.remove('is-success'), 2000);
                    }">
                        <span class="btn-content">Sauvegarder</span>
                        <span class="btn-success-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </button>
                    <button class="btn btn-info btn-success-state" @click="(e) => {
                        e.target.classList.add('is-success');
                        setTimeout(() => e.target.classList.remove('is-success'), 2000);
                    }">
                        <span class="btn-content">Envoyer</span>
                        <span class="btn-success-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </button>
                    <button class="btn btn-contrast btn-success-state" @click="(e) => {
                        e.target.classList.add('is-success');
                        setTimeout(() => e.target.classList.remove('is-success'), 2000);
                    }">
                        <span class="btn-content">Confirmer</span>
                        <span class="btn-success-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;button class="btn btn-primary btn-success-state"&gt;
  &lt;span class="btn-content"&gt;Sauvegarder&lt;/span&gt;
  &lt;span class="btn-success-icon"&gt;
    &lt;svg viewBox="0 0 24 24"&gt;&lt;path d="M5 13l4 4L19 7" /&gt;&lt;/svg&gt;
  &lt;/span&gt;
&lt;/button&gt;

// JavaScript pour activer l'état success
button.classList.add('is-success');</code></pre>
                </div>
            </div>

            <!-- Combinaisons avancées -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></span>
                    Combinaisons Avancées
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Combinez les effets pour créer des interactions riches.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-900 flex flex-wrap items-center gap-4">
                    <button class="btn btn-primary btn-gradient btn-ripple btn-smooth">Gradient + Ripple +
                        Smooth</button>
                    <button class="btn btn-success btn-3d btn-ripple btn-icon-hover-bounce">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        3D + Ripple + Bounce
                    </button>
                    <button class="btn btn-danger btn-neon btn-icon-pulse btn-pill">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        Neon + Pulse + Pill
                    </button>
                </div>
            </div>
        </div>

        <!-- Section Props Additionnelles -->
        <div class="mb-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Props Additionnelles</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Nouvelles fonctionnalités intégrées directement dans le composant Button via des props.
            </p>

            <!-- Loading Text -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading Text
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Affiche un texte personnalisé pendant l'état de chargement au lieu du label par défaut.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="primary" loading loading-text="Sauvegarde en cours...">Sauvegarder</Button>
                    <Button severity="info" loading loading-text="Envoi...">Envoyer le message</Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre
                        class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button loading loading-text="Sauvegarde en cours..."&gt;Sauvegarder&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Tooltip -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded bg-slate-700"></span>
                    Tooltip
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Tooltip intégré au survol avec 4 positions possibles : top, bottom, left, right.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-6">
                    <Button severity="primary" tooltip="Position par défaut (top)"
                        icon="heroicons:information-circle" />
                    <Button severity="success" tooltip="Info au survol" tooltip-position="bottom">Bottom</Button>
                    <Button severity="info" tooltip="À gauche" tooltip-position="left">Left</Button>
                    <Button severity="warn" tooltip="À droite" tooltip-position="right">Right</Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button tooltip="Position par défaut (top)"&gt;...&lt;/Button&gt;
&lt;Button tooltip="À droite" tooltip-position="right"&gt;Right&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Badge -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span
                        class="w-5 h-5 rounded-full bg-danger text-white text-xs flex items-center justify-center font-bold">3</span>
                    Badge
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Badge/compteur positionné sur le bouton. La couleur peut être personnalisée via
                    <code>badge-color</code>.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-6">
                    <Button severity="primary" icon="heroicons:bell" :badge="3" />
                    <Button severity="secondary" icon="heroicons:envelope" :badge="12" badge-color="danger" />
                    <Button severity="info" :badge="99">Notifications</Button>
                    <Button severity="success" badge="NEW" badge-color="success">Fonctionnalité</Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button icon="heroicons:bell" :badge="3" /&gt;
&lt;Button :badge="99" badge-color="danger"&gt;Notifications&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Success / Error States -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                    Success / Error States
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Props <code>success</code> et <code>error</code> pour afficher un feedback visuel après une
                    action.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="primary" :success="true">Succès !</Button>
                    <Button severity="danger" :error="true">Erreur !</Button>
                    <Button severity="info" variant="outlined">État normal</Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button :success="isSuccess"&gt;Sauvegarder&lt;/Button&gt;
&lt;Button :error="hasError"&gt;Soumettre&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Countdown -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="font-mono font-bold text-orange-500">5</span>
                    Countdown
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Compte à rebours avant activation. Le bouton est désactivé pendant le countdown.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="danger" :countdown="5">Action dangereuse</Button>
                    <Button severity="warn" :countdown="3" variant="outlined">Confirmation</Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre
                        class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button :countdown="5"&gt;Action dangereuse&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Combinaisons -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"></span>
                    Combinaisons
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Les props peuvent être combinées pour des interactions riches.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="primary" icon="heroicons:bell" :badge="5" tooltip="Vous avez 5 notifications">
                        Notifications
                    </Button>
                    <Button severity="danger" icon="heroicons:trash" tooltip="Cette action est irréversible"
                        tooltip-position="bottom">
                        Supprimer
                    </Button>
                </div>
            </div>
        </div>

        <!-- Section Comportements Avancés -->
        <div class="mb-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Comportements Avancés</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Fonctionnalités de comportement pour améliorer l'UX et éviter les erreurs utilisateur.
            </p>

            <!-- Double-click Protection -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Double-click Protection
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Empêche les soumissions multiples accidentelles. Le bouton est temporairement désactivé après un
                    clic.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="primary" double-click-protection>Protection par défaut (1s)</Button>
                    <Button severity="danger" :double-click-protection="3000">Protection 3 secondes</Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button double-click-protection&gt;Protection par défaut&lt;/Button&gt;
&lt;Button :double-click-protection="3000"&gt;3 secondes&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Long Press -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                    Long Press
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Déclenche un événement <code>@long-press</code> après une pression longue. Utile pour des actions
                    contextuelles.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="info" :long-press-delay="500" @long-press="() => alert('Long press détecté !')">
                        Maintenez appuyé (500ms)
                    </Button>
                    <Button severity="warn" :long-press-delay="1000" @long-press="() => alert('Long press 1s !')">
                        Maintenez 1 seconde
                    </Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button :long-press-delay="500" @long-press="handleLongPress"&gt;
  Maintenez appuyé
&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Keyboard Shortcuts -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Keyboard Shortcuts
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Associe un raccourci clavier au bouton. Supporte les combinaisons Ctrl, Alt, Shift, Meta/Cmd.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="primary" shortcut="ctrl+s" @click="() => alert('Ctrl+S pressé !')">
                        Sauvegarder
                        <span class="ml-2 px-1.5 py-0.5 text-xs bg-white/20 rounded">Ctrl+S</span>
                    </Button>
                    <Button severity="danger" shortcut="alt+d" @click="() => alert('Alt+D pressé !')">
                        Supprimer
                        <span class="ml-2 px-1.5 py-0.5 text-xs bg-white/20 rounded">Alt+D</span>
                    </Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button shortcut="ctrl+s" @click="save"&gt;Sauvegarder&lt;/Button&gt;
&lt;Button shortcut="alt+shift+n" @click="createNew"&gt;Nouveau&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Copy to Clipboard -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Copie automatiquement un texte dans le presse-papiers au clic. Émet <code>@copy</code> avec le texte
                    copié.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="secondary" copy-text="npm install @webmx/ui" icon="heroicons:clipboard-document">
                        Copier la commande
                    </Button>
                    <Button severity="info" copy-text="contact@example.com" variant="outlined">
                        Copier l'email
                    </Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button copy-text="npm install @webmx/ui" @copy="showToast"&gt;
  Copier
&lt;/Button&gt;</code></pre>
                </div>
            </div>
        </div>

        <!-- Section Thèmes & Responsive -->
        <div class="mb-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Thèmes & Responsive</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Personnalisation visuelle et adaptation aux différents appareils.
            </p>

            <!-- Presets Thèmes -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Presets de Thèmes
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Utilisez la prop <code>theme</code> pour appliquer des presets de couleurs prédéfinis.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button theme="ocean">Thème Ocean</Button>
                    <Button theme="forest">Thème Forest</Button>
                    <Button theme="sunset">Thème Sunset</Button>
                    <Button theme="neon">Thème Neon</Button>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Button theme="ocean"&gt;Ocean&lt;/Button&gt;
&lt;Button theme="neon"&gt;Neon&lt;/Button&gt;</code></pre>
                </div>
            </div>

            <!-- Responsive & Tactile -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Responsive & Tactile
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Le bouton s'adapte automatiquement aux appareils tactiles (zones de tap plus grandes) et supporte le
                    feedback haptique.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="primary" class="btn-responsive">Bouton Responsive (Taille variable)</Button>
                    <div class="text-xs text-slate-400 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Testez sur mobile pour le feedback haptique !
                    </div>
                </div>
            </div>

            <!-- Mode Daltonien -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Mode Daltonien (Color-blind)
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Améliore l'accessibilité en utilisant des bordures distinctes (solide, pointillé, tireté) pour
                    différencier les états sans se fier uniquement à la couleur.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap items-center gap-4">
                    <Button severity="success" colorblind>Succès (Trait plein)</Button>
                    <Button severity="warn" colorblind>Attention (Tirets)</Button>
                    <Button severity="danger" colorblind>Danger (Double trait)</Button>
                    <Button severity="info" colorblind>Info (Pointillés)</Button>
                </div>
            </div>
        </div>

        <!-- Section Modèles Avancés -->
        <div class="mb-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Modèles Avancés</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Composants combinés pour des interactions plus complexes.
            </p>

            <!-- Toggle Groups -->
            <div class="mb-12">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Toggle Groups / Tabs
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Utilisez <code>ButtonGroup</code> avec la prop <code>toggle</code> pour créer des sélections
                    uniques ou multiples (tabs, filtres).
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Single Selection -->
                    <div class="space-y-4">
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Sélection
                            Unique</span>
                        <div
                            class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
                            <ButtonGroup v-model="toggleValue" toggle>
                                <Button value="left" icon="heroicons:bars-3-bottom-left" square
                                    aria-label="Align left" />
                                <Button value="center" icon="heroicons:bars-3" square aria-label="Align center" />
                                <Button value="right" icon="heroicons:bars-3-bottom-right" square
                                    aria-label="Align right" />
                            </ButtonGroup>
                            <div class="mt-4 text-xs text-slate-500 italic">Valeur sélectionnée : {{ toggleValue }}
                            </div>
                        </div>
                    </div>

                    <!-- Multiple Selection -->
                    <div class="space-y-4">
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Sélection
                            Multiple</span>
                        <div
                            class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
                            <ButtonGroup v-model="multiToggleValue" toggle multiple>
                                <Button value="bold" icon="heroicons:bold" square aria-label="Bold" />
                                <Button value="italic" icon="heroicons:italic" square aria-label="Italic" />
                                <Button value="underline" icon="heroicons:underline" square aria-label="Underline" />
                            </ButtonGroup>
                            <div class="mt-4 text-xs text-slate-500 italic">Valeurs : {{ multiToggleValue }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Split Button -->
            <div class="mb-12">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Split Button
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Sépare une action principale d'un menu d'actions secondaires.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap gap-4">
                    <SplitButton @click="handleSplitClick" :loading="splitButtonLoading">
                        Enregistrer
                    </SplitButton>
                    <SplitButton severity="secondary" variant="outlined">
                        Exporter
                    </SplitButton>
                    <SplitButton severity="danger" icon="heroicons:trash">
                        Supprimer définitivement
                    </SplitButton>
                </div>
            </div>

            <!-- FAB -->
            <div class="mb-8">
                <h4 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Floating Action Button (FAB)
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Bouton flottant pour les actions globales de la page. Supporte plusieurs positions.
                </p>
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap gap-4">
                    <Button fab icon="heroicons:plus" severity="primary" size="lg" shadow="xl" />
                    <div class="text-xs text-slate-400 self-center">Regardez le coin inférieur droit ! (Simulé ici)
                    </div>
                </div>
                <div
                    class="bg-indigo-50 dark:bg-indigo-950/30 p-4 border border-indigo-100 dark:border-indigo-900 rounded-xl mt-4 text-xs text-indigo-700 dark:text-indigo-300">
                    Propriétés disponibles : <code>fab</code>, <code>fab-position</code> (top-right, top-left,
                    bottom-right, bottom-left).
                </div>
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
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'primary'
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Définit la couleur
                                d'accentuation
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
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                size
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
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Rayon de bordure du bouton.
                            </td>
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
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ring
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
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Ajoute un effet d'élévation au
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                square</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Force un ratio d'aspect carré
                                (utile pour les boutons d'icône).</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                block
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Affiche le bouton sur toute la
                                largeur de son conteneur.</td>
                        </tr>

                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                fab</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Transforme le bouton en Floating
                                Action Button flottant.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                fabPosition</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'bottom-right'
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Position du bouton flottant si
                                <code>fab</code> est activé.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                colorblind</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Active le mode d'accessibilité
                                visuelle pour les daltoniens.</td>
                        </tr>

                        <!-- Contenu -->
                        <tr class="bg-slate-50/50 dark:bg-slate-800/30">
                            <td colspan="4"
                                class="py-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                                Contenu
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                label
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Texte affiché dans le bouton
                                (alternative au slot par défaut).</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                icon
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Nom de l'icône Iconify à
                                afficher.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                leadingIcon</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Icône toujours affichée au
                                début du
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
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Position de l'icône par rapport
                                au
                                label.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                avatar</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">URL d'une image avatar à
                                afficher
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
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Affiche un spinner et désactive
                                le
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                loadingAuto</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Gère automatiquement l'état de
                                chargement lors d'un click retournant une Promise.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                disabled</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Désactive les interactions avec
                                le
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                active</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Force l'état actif du bouton
                                (pour
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
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                as
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'button' | 'a' | 'input'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'button'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Élément HTML à rendre.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                type
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'button' | 'submit' | 'reset'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">'button'</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Type HTML du bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                to
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string |
                                object</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Transforme le bouton en
                                NuxtLink
                                vers cette destination.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                href
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">URL de destination (quand
                                <code>as="a"</code>).
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                value
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Valeur du champ (quand
                                <code>as="input"</code>).
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                name
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Attribut name pour les
                                formulaires.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                autofocus</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Donne le focus au bouton au
                                chargement de la page.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                referrerpolicy</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Politique de référent pour les
                                liens.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                trailingSlash</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'remove' | 'append'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
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
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Libellé accessible pour les
                                lecteurs d'écran.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaExpanded</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Indique si l'élément contrôlé
                                est
                                déployé.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaPressed</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean |
                                'mixed'</td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Indique l'état pressé d'un
                                bouton à
                                bascule.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaControls</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
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
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Indique le type de popup
                                déclenché.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaCurrent</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">boolean | 'page' | 'step' | 'location' | 'date' | 'time'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Indique l'élément courant dans
                                un
                                ensemble.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaDescribedby</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">ID de l'élément décrivant ce
                                bouton.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaLabelledby</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">ID de l'élément servant de
                                libellé.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaLive</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code
                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">'off' | 'assertive' | 'polite'</code>
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Priorité des annonces pour les
                                régions live.</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                ariaHidden</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean
                            </td>
                            <td class="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 text-xs">undefined
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Cache l'élément aux
                                technologies
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
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                click
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                <code class="bg-slate-100 dark:bg-slate-800 px-1 rounded">event: MouseEvent</code>
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">
                                Émis lors du clic sur le bouton. Avec <code>loadingAuto</code>, l'état de chargement
                                est
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
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                icon
                            </td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">
                                Permet de personnaliser l'icône affichée. Remplace l'icône par défaut définie via
                                les
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
                    Le composant Button rend un élément <code>&lt;button&gt;</code> natif qui inclut implicitement
                    tous
                    les attributs passés.
                    Le texte pour décrire le bouton est défini avec la prop <code>aria-label</code>. Si elle n'est
                    pas
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
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Déplace le focus vers le
                                bouton.
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
                        <span>Préférez <code>type="submit"</code> pour les boutons de soumission de
                            formulaire.</span>
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
