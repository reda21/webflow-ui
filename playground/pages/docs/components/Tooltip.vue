<script setup lang="ts">
import { ref, computed } from 'vue'
import { Tooltip } from '../../../../src/components/tooltip'
import { Button } from '../../../../src/index'
import type { TooltipPosition, TooltipVariant, TooltipSize, TooltipTrigger, TooltipAnimation } from '../../../../src/components/tooltip/types'

// Configurator State
const selectedPosition = ref<TooltipPosition>('top')
const selectedVariant = ref<TooltipVariant>('dark')
const selectedSize = ref<TooltipSize>('md')
const selectedTrigger = ref<TooltipTrigger>('hover')
const selectedAnimation = ref<TooltipAnimation>('fade')
const showArrow = ref(true)
const isInteractive = ref(false)
const customContent = ref('Ceci est un tooltip')

const positionOptions: TooltipPosition[] = [
    'top', 'top-start', 'top-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end',
    'right', 'right-start', 'right-end'
]
const variantOptions: TooltipVariant[] = ['dark', 'light', 'primary', 'success', 'warning', 'danger', 'info']
const sizeOptions: TooltipSize[] = ['xs', 'sm', 'md', 'lg']
const triggerOptions: TooltipTrigger[] = ['hover', 'click', 'focus', 'manual']
const animationOptions: TooltipAnimation[] = ['fade', 'scale', 'slide', 'none']

// Manual control example
const isManualOpen = ref(false)

// Computed code example
const tooltipCodeExample = computed(() => {
    let props = ''
    if (selectedPosition.value !== 'top') {
        props += ` position="${selectedPosition.value}"`
    }
    if (selectedVariant.value !== 'dark') {
        props += ` variant="${selectedVariant.value}"`
    }
    if (selectedSize.value !== 'md') {
        props += ` size="${selectedSize.value}"`
    }
    if (selectedTrigger.value !== 'hover') {
        props += ` trigger="${selectedTrigger.value}"`
    }
    if (selectedAnimation.value !== 'fade') {
        props += ` animation="${selectedAnimation.value}"`
    }
    if (!showArrow.value) {
        props += ` arrow="none"`
    }
    if (isInteractive.value) {
        props += ` interactive`
    }
    return `<Tooltip content="${customContent.value}"${props}>
  <Button>Survolez-moi</Button>
</Tooltip>`
})
</script>

<template>
    <section id="tooltip" class="scroll-mt-24 mb-20">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-2">
            <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Composant
            </span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                Disponible
            </span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Tooltip
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Composant tooltip accessible et personnalisable avec support pour 12 positions, 7 variantes de couleurs,
            animations fluides et mode interactif.
        </p>

        <!-- Interactive Configurator -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <!-- Configurator Header -->
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4">
                <!-- Position -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">position</span>
                    <select v-model="selectedPosition"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in positionOptions" :key="opt" :value="opt">
                            {{ opt }}
                        </option>
                    </select>
                </div>
                <!-- Variant -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">variant</span>
                    <select v-model="selectedVariant"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in variantOptions" :key="opt" :value="opt">
                            {{ opt }}
                        </option>
                    </select>
                </div>
                <!-- Size -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">size</span>
                    <select v-model="selectedSize"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in sizeOptions" :key="opt" :value="opt">
                            {{ opt }}
                        </option>
                    </select>
                </div>
                <!-- Trigger -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">trigger</span>
                    <select v-model="selectedTrigger"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in triggerOptions" :key="opt" :value="opt">
                            {{ opt }}
                        </option>
                    </select>
                </div>
                <!-- Animation -->
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">animation</span>
                    <select v-model="selectedAnimation"
                        class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500">
                        <option v-for="opt in animationOptions" :key="opt" :value="opt">
                            {{ opt }}
                        </option>
                    </select>
                </div>
                <!-- Arrow -->
                <div class="flex items-center gap-2">
                    <input id="show-arrow" v-model="showArrow" type="checkbox" class="w-4 h-4 text-indigo-600 rounded">
                    <label for="show-arrow"
                        class="text-xs font-medium text-slate-500 dark:text-slate-400 cursor-pointer">
                        Flèche
                    </label>
                </div>
                <!-- Interactive -->
                <div class="flex items-center gap-2">
                    <input id="interactive" v-model="isInteractive" type="checkbox"
                        class="w-4 h-4 text-indigo-600 rounded">
                    <label for="interactive"
                        class="text-xs font-medium text-slate-500 dark:text-slate-400 cursor-pointer">
                        Interactif
                    </label>
                </div>
            </div>

            <!-- Content Input -->
            <div class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Contenu:</span>
                    <input v-model="customContent" type="text"
                        class="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
                        placeholder="Texte du tooltip...">
                </div>
            </div>

            <!-- Live Preview -->
            <div
                class="bg-white dark:bg-slate-900 p-16 flex items-center justify-center min-h-[200px] transition-colors duration-300">
                <Tooltip :content="customContent" :position="selectedPosition" :variant="selectedVariant"
                    :size="selectedSize" :trigger="selectedTrigger" :animation="selectedAnimation"
                    :arrow="showArrow ? 'md' : 'none'" :interactive="isInteractive">
                    <Button severity="primary">
                        {{ selectedTrigger === 'click' ? 'Cliquez-moi' : selectedTrigger === 'focus' ? 'Focus-moi' :
                            'Survolez-moi' }}
                    </Button>
                </Tooltip>
            </div>

            <!-- Code Preview -->
            <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  {{ tooltipCodeExample }}
&lt;/template&gt;</code></pre>
            </div>
        </div>

        <!-- Section Positions -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Positions</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                12 positions disponibles pour un placement précis du tooltip autour de l'élément déclencheur.
            </p>
            <div
                class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 grid grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
                <Tooltip content="Position top" position="top">
                    <Button severity="secondary" size="sm">
                        Top
                    </Button>
                </Tooltip>
                <Tooltip content="Position top-start" position="top-start">
                    <Button severity="secondary" size="sm">
                        Top Start
                    </Button>
                </Tooltip>
                <Tooltip content="Position top-end" position="top-end">
                    <Button severity="secondary" size="sm">
                        Top End
                    </Button>
                </Tooltip>
                <Tooltip content="Position bottom" position="bottom">
                    <Button severity="secondary" size="sm">
                        Bottom
                    </Button>
                </Tooltip>
                <Tooltip content="Position left" position="left">
                    <Button severity="secondary" size="sm">
                        Left
                    </Button>
                </Tooltip>
                <Tooltip content="Position right" position="right">
                    <Button severity="secondary" size="sm">
                        Right
                    </Button>
                </Tooltip>
            </div>
        </div>

        <!-- Section Variantes -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Variantes de couleur</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <Tooltip content="Tooltip sombre" variant="dark">
                    <Button severity="contrast">Dark</Button>
                </Tooltip>
                <Tooltip content="Tooltip clair" variant="light">
                    <Button severity="secondary">Light</Button>
                </Tooltip>
                <Tooltip content="Tooltip primaire" variant="primary">
                    <Button severity="primary">Primary</Button>
                </Tooltip>
                <Tooltip content="Tooltip succès" variant="success">
                    <Button severity="success">Success</Button>
                </Tooltip>
                <Tooltip content="Tooltip avertissement" variant="warning">
                    <Button severity="warn">Warning</Button>
                </Tooltip>
                <Tooltip content="Tooltip danger" variant="danger">
                    <Button severity="danger">Danger</Button>
                </Tooltip>
                <Tooltip content="Tooltip info" variant="info">
                    <Button severity="info">Info</Button>
                </Tooltip>
            </div>
        </div>

        <!-- Section Tailles -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tailles</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap items-center gap-4">
                <Tooltip content="Très petit tooltip" size="xs">
                    <Button severity="secondary" size="xs">
                        XS
                    </Button>
                </Tooltip>
                <Tooltip content="Petit tooltip avec un peu plus de texte" size="sm">
                    <Button severity="secondary" size="sm">
                        SM
                    </Button>
                </Tooltip>
                <Tooltip content="Tooltip de taille moyenne - utilisé par défaut" size="md">
                    <Button severity="secondary">MD (défaut)</Button>
                </Tooltip>
                <Tooltip
                    content="Grand tooltip avec beaucoup plus d'espace pour afficher du contenu détaillé et des descriptions longues."
                    size="lg">
                    <Button severity="secondary" size="lg">
                        LG
                    </Button>
                </Tooltip>
            </div>
        </div>

        <!-- Section Triggers -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Déclencheurs</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Différentes façons de déclencher l'affichage du tooltip.
            </p>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <Tooltip content="Apparaît au survol" trigger="hover">
                    <Button severity="primary">Hover (défaut)</Button>
                </Tooltip>
                <Tooltip content="Apparaît au clic" trigger="click">
                    <Button severity="info">Click</Button>
                </Tooltip>
                <Tooltip content="Apparaît au focus (Tab)" trigger="focus">
                    <Button severity="success">Focus (Tab)</Button>
                </Tooltip>
                <Tooltip v-model="isManualOpen" content="Contrôle manuel via v-model" trigger="manual">
                    <Button severity="warn" @click="isManualOpen = !isManualOpen">
                        Manuel: {{ isManualOpen ? 'ON' : 'OFF' }}
                    </Button>
                </Tooltip>
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Tooltip content="Au survol" trigger="hover"&gt;...&lt;/Tooltip&gt;
&lt;Tooltip content="Au clic" trigger="click"&gt;...&lt;/Tooltip&gt;
&lt;Tooltip v-model="isOpen" trigger="manual"&gt;...&lt;/Tooltip&gt;</code></pre>
            </div>
        </div>

        <!-- Section Animations -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Animations</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <Tooltip content="Animation fade" animation="fade">
                    <Button severity="secondary">Fade</Button>
                </Tooltip>
                <Tooltip content="Animation scale" animation="scale">
                    <Button severity="secondary">Scale</Button>
                </Tooltip>
                <Tooltip content="Animation slide" animation="slide">
                    <Button severity="secondary">Slide</Button>
                </Tooltip>
                <Tooltip content="Sans animation" animation="none">
                    <Button severity="secondary">None</Button>
                </Tooltip>
            </div>
        </div>

        <!-- Section Interactive -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tooltip Interactif</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Permet à l'utilisateur d'interagir avec le contenu du tooltip (cliquer sur des liens, copier du texte,
                etc.)
            </p>
            <div
                class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex justify-center">
                <Tooltip interactive :delay="{ show: 0, hide: 300 }" size="lg">
                    <template #default>
                        <Button severity="primary" icon="heroicons:information-circle">
                            Plus d'infos
                        </Button>
                    </template>
                    <template #content>
                        <div class="text-left space-y-2">
                            <p class="font-semibold">Tooltip Interactif</p>
                            <p class="text-sm opacity-90">Vous pouvez interagir avec ce contenu.</p>
                            <div class="flex gap-2 pt-2">
                                <Button size="xs" severity="success">
                                    Action 1
                                </Button>
                                <Button size="xs" severity="secondary">
                                    Action 2
                                </Button>
                            </div>
                        </div>
                    </template>
                </Tooltip>
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;Tooltip interactive :delay="{ show: 0, hide: 300 }"&gt;
            &lt;template #default&gt;
            &lt;Button&gt;Plus d'infos&lt;/Button&gt;
            &lt;/template&gt;
            &lt;template #content&gt;
            &lt;div&gt;
            &lt;p&gt;Contenu interactif&lt;/p&gt;
            &lt;Button size="xs"&gt;Action&lt;/Button&gt;
            &lt;/div&gt;
            &lt;/template&gt;
            &lt;/Tooltip&gt;</code></pre>
            </div>
        </div>

        <!-- Section Avec Titre -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Avec Titre</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <Tooltip title="Information" content="Voici des détails supplémentaires sur cette fonctionnalité.">
                    <Button severity="info" icon="heroicons:question-mark-circle" />
                </Tooltip>
                <Tooltip title="Attention" content="Cette action est irréversible." variant="warning">
                    <Button severity="warn" icon="heroicons:exclamation-triangle" />
                </Tooltip>
                <Tooltip title="Succès !" content="L'opération a été effectuée avec succès." variant="success">
                    <Button severity="success" icon="heroicons:check-circle" />
                </Tooltip>
            </div>
        </div>

        <!-- API Reference -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">API Reference</h2>

            <!-- Props Table -->
            <div class="mb-8">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Props</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-slate-200 dark:border-slate-700">
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Prop</th>
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Type</th>
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Défaut
                                </th>
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="py-3 px-4"><code>content</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">string</td>
                                <td class="py-3 px-4 text-slate-500">-</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Texte du tooltip</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>title</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">string</td>
                                <td class="py-3 px-4 text-slate-500">-</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Titre optionnel</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>position</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">TooltipPosition</td>
                                <td class="py-3 px-4 text-slate-500">'top'</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Position du tooltip</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>variant</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">TooltipVariant</td>
                                <td class="py-3 px-4 text-slate-500">'dark'</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Thème de couleur</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>size</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">TooltipSize</td>
                                <td class="py-3 px-4 text-slate-500">'md'</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Taille du tooltip</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>trigger</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">TooltipTrigger |
                                    TooltipTrigger[]</td>
                                <td class="py-3 px-4 text-slate-500">'hover'</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Mode de déclenchement</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>animation</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">TooltipAnimation</td>
                                <td class="py-3 px-4 text-slate-500">'fade'</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Type d'animation</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>interactive</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">boolean</td>
                                <td class="py-3 px-4 text-slate-500">false</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Permet l'interaction avec le
                                    contenu
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>delay</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">number | { show, hide }</td>
                                <td class="py-3 px-4 text-slate-500">0</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Délai d'affichage/masquage (ms)
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>disabled</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">boolean</td>
                                <td class="py-3 px-4 text-slate-500">false</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Désactive le tooltip</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Slots -->
            <div class="mb-8">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Slots</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-slate-200 dark:border-slate-700">
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Slot</th>
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="py-3 px-4"><code>default</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Élément déclencheur du tooltip
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>content</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Contenu personnalisé du tooltip
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>title</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Titre personnalisé</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Events -->
            <div>
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Événements</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-slate-200 dark:border-slate-700">
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Événement
                                </th>
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Payload
                                </th>
                                <th class="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="py-3 px-4"><code>update:modelValue</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">boolean</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Émis lors du changement d'état
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>show</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">-</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Émis quand le tooltip s'affiche
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4"><code>hide</code></td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">-</td>
                                <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Émis quand le tooltip se cache
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Accessibility -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Accessibilité</h2>
            <div class="prose prose-slate dark:prose-invert max-w-none">
                <ul class="space-y-2 text-slate-600 dark:text-slate-400">
                    <li>✅ <strong>role="tooltip"</strong> - Rôle ARIA approprié</li>
                    <li>✅ <strong>aria-describedby</strong> - Association trigger/contenu</li>
                    <li>✅ <strong>Échap pour fermer</strong> - Support clavier</li>
                    <li>✅ <strong>Focus visible</strong> - Indicateur de focus pour le trigger</li>
                    <li>✅ <strong>prefers-reduced-motion</strong> - Respect des préférences utilisateur</li>
                    <li>✅ <strong>Contraste suffisant</strong> - Ratio 4.5:1 minimum</li>
                </ul>
            </div>
        </div>
    </section>
</template>
