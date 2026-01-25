<script setup lang="ts">
import { ref } from 'vue'
import { Separator, USeparator, Card, Button, Icon } from '@/index'
import type { SeparatorOrientation, SeparatorVariant, SeparatorSize, SeparatorSeverity } from '@/components/separator/types'

// Configurator State
const configOrientation = ref<SeparatorOrientation>('horizontal')
const configVariant = ref<SeparatorVariant>('solid')
const configSize = ref<SeparatorSize>('md')
const configSeverity = ref<SeparatorSeverity>('default')
const configLabel = ref('')
const configLabelPosition = ref<'start' | 'center' | 'end'>('center')
const configSpacing = ref<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md')

const orientations: SeparatorOrientation[] = ['horizontal', 'vertical']
const variants: SeparatorVariant[] = ['solid', 'dashed', 'dotted', 'gradient']
const sizes: SeparatorSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const severities: SeparatorSeverity[] = ['default', 'primary', 'secondary', 'success', 'info', 'warn', 'danger', 'contrast']
const labelPositions = ['start', 'center', 'end']
const spacings = ['none', 'sm', 'md', 'lg', 'xl']

// Code generator
const isCopied = ref(false)
import { computed } from 'vue'
const generatedCode = computed(() => {
    let code = `<Separator`
    if (configOrientation.value !== 'horizontal') code += `\n  orientation="${configOrientation.value}"`
    if (configVariant.value !== 'solid') code += `\n  variant="${configVariant.value}"`
    if (configSize.value !== 'md') code += `\n  size="${configSize.value}"`
    if (configSeverity.value !== 'default') code += `\n  severity="${configSeverity.value}"`
    if (configLabel.value) code += `\n  label="${configLabel.value}"`
    if (configLabelPosition.value !== 'center') code += `\n  label-position="${configLabelPosition.value}"`
    if (configSpacing.value !== 'md') code += `\n  spacing="${configSpacing.value}"`
    code += `\n/>`
    return code
})

const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    isCopied.value = true
    setTimeout(() => isCopied.value = false, 2000)
}
</script>

<template>
    <div class="space-y-12 pb-20">
        <!-- Hero Section -->
        <section>
            <div class="flex items-center gap-3 mb-2">
                <span
                    class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
                <span
                    class="px-2 py-0.5 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">Layout</span>
            </div>
            <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Separator</h1>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Un séparateur visuel pour diviser le contenu horizontalement ou verticalement.
                Supporte plusieurs styles, couleurs et peut contenir un label central.
            </p>
        </section>

        <!-- Interactive Playground -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <Icon name="heroicons:adjustments-horizontal" class="text-indigo-500" />
                Playground Interactif
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Controls -->
                <div
                    class="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Orientation -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Orientation</label>
                            <select v-model="configOrientation"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="o in orientations" :key="o" :value="o">{{ o }}</option>
                            </select>
                        </div>

                        <!-- Variant -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Variante</label>
                            <select v-model="configVariant"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="v in variants" :key="v" :value="v">{{ v }}</option>
                            </select>
                        </div>

                        <!-- Size -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Épaisseur</label>
                            <select v-model="configSize"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="s in sizes" :key="s" :value="s">{{ s }}</option>
                            </select>
                        </div>

                        <!-- Severity -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Couleur</label>
                            <select v-model="configSeverity"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="s in severities" :key="s" :value="s">{{ s }}</option>
                            </select>
                        </div>

                        <!-- Spacing -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Espacement</label>
                            <select v-model="configSpacing"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="sp in spacings" :key="sp" :value="sp">{{ sp }}</option>
                            </select>
                        </div>

                        <!-- Label Position -->
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Position
                                Label</label>
                            <select v-model="configLabelPosition"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="lp in labelPositions" :key="lp" :value="lp">{{ lp }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Label Input -->
                    <div class="space-y-2">
                        <label class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Label
                            (optionnel)</label>
                        <input v-model="configLabel" type="text" placeholder="Ex: OU, Section, etc."
                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none" />
                    </div>
                </div>

                <!-- Preview -->
                <div
                    class="flex flex-col gap-6 p-8 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-3xl border-2 border-dashed border-indigo-200 dark:border-indigo-800/50">
                    <div class="text-center space-y-2">
                        <p class="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">Aperçu</p>
                    </div>

                    <div class="flex-1 flex items-center justify-center"
                        :class="{ 'h-48': configOrientation === 'vertical' }">
                        <template v-if="configOrientation === 'horizontal'">
                            <div class="w-full max-w-md">
                                <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Contenu au-dessus</p>
                                <Separator :orientation="configOrientation" :variant="configVariant" :size="configSize"
                                    :severity="configSeverity" :label="configLabel || undefined"
                                    :label-position="configLabelPosition" :spacing="configSpacing" />
                                <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">Contenu en-dessous</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex items-center gap-4 h-32">
                                <p class="text-sm text-slate-600 dark:text-slate-400">Gauche</p>
                                <Separator :orientation="configOrientation" :variant="configVariant" :size="configSize"
                                    :severity="configSeverity" :label="configLabel || undefined"
                                    :label-position="configLabelPosition" :spacing="configSpacing" />
                                <p class="text-sm text-slate-600 dark:text-slate-400">Droite</p>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <!-- Generated Code -->
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Icon name="heroicons:code-bracket" size="xs" />
                        Code généré
                    </h3>
                    <button @click="copyCode"
                        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all active:scale-95">
                        <Icon :name="isCopied ? 'heroicons:check-badge' : 'heroicons:clipboard-document'" size="xs" />
                        {{ isCopied ? 'Copié !' : 'Copier' }}
                    </button>
                </div>
                <div class="bg-slate-950 rounded-2xl p-6 border border-white/5 shadow-2xl">
                    <pre
                        class="text-xs leading-relaxed font-mono"><code class="text-indigo-300">{{ generatedCode }}</code></pre>
                </div>
            </div>
        </section>

        <!-- Variants -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Variantes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card v-for="variant in variants" :key="variant" variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">{{ variant }}</p>
                    <Separator :variant="variant" severity="primary" />
                </Card>
            </div>
        </section>

        <!-- Severities -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Couleurs</h2>
            <Card variant="soft" padding="lg" class="space-y-4">
                <div v-for="severity in severities" :key="severity" class="space-y-1">
                    <p class="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">{{ severity }}</p>
                    <Separator :severity="severity" size="sm" />
                </div>
            </Card>
        </section>

        <!-- Sizes -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Épaisseurs</h2>
            <Card variant="soft" padding="lg" class="space-y-6">
                <div v-for="size in sizes" :key="size" class="space-y-2">
                    <p class="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">{{ size }}</p>
                    <Separator :size="size" severity="primary" />
                </div>
            </Card>
        </section>

        <!-- With Label -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Avec Label</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Ajoutez un texte au centre du séparateur pour créer des divisions plus expressives.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Start</p>
                    <Separator label="OU" label-position="start" severity="primary" />
                </Card>
                <Card variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Center</p>
                    <Separator label="OU" label-position="center" severity="primary" />
                </Card>
                <Card variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">End</p>
                    <Separator label="OU" label-position="end" severity="primary" />
                </Card>
            </div>
        </section>

        <!-- Vertical Orientation -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Orientation Verticale</h2>
            <Card variant="soft" padding="lg">
                <div class="flex items-center justify-center gap-6 h-32">
                    <span class="text-slate-600 dark:text-slate-400">Option A</span>
                    <Separator orientation="vertical" severity="primary" />
                    <span class="text-slate-600 dark:text-slate-400">Option B</span>
                    <Separator orientation="vertical" variant="dashed" severity="success" />
                    <span class="text-slate-600 dark:text-slate-400">Option C</span>
                </div>
            </Card>
        </section>

        <!-- Use Cases -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Exemples d'utilisation</h2>

            <!-- Login Form Divider -->
            <Card variant="outlined" padding="lg" class="max-w-md mx-auto space-y-4">
                <h3 class="font-bold text-center">Connexion</h3>
                <Button severity="primary" class="w-full">
                    <Icon name="heroicons:envelope" class="mr-2" size="xs" />
                    Continuer avec Email
                </Button>
                <Separator label="ou continuer avec" severity="secondary" />
                <div class="flex gap-3">
                    <Button variant="outlined" class="flex-1">Google</Button>
                    <Button variant="outlined" class="flex-1">Apple</Button>
                </div>
            </Card>

            <!-- Section Divider -->
            <Card variant="soft" padding="lg" class="space-y-4">
                <h3 class="font-bold">Paramètres du compte</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400">Gérez vos informations personnelles.</p>
                <Separator variant="gradient" severity="primary" />
                <h3 class="font-bold">Notifications</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400">Configurez vos préférences de notification.</p>
            </Card>
        </section>

        <!-- API Reference -->
        <section class="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-black">API Reference</h2>

            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:list-bullet" class="text-indigo-500" />
                    Props
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/10 border-b border-inherit">
                            <tr>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Prop</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Type</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Défaut</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">orientation</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">'horizontal' | 'vertical'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">'horizontal'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Orientation du séparateur</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">variant</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">'solid' | 'dashed' | 'dotted' | 'gradient'
                                </td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">'solid'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Style visuel de la ligne</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">size</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">'md'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Épaisseur de la ligne</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">severity</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">SeparatorSeverity</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">'default'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Couleur du séparateur</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">label</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">string</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">-</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Texte au centre du séparateur</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">labelPosition</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">'start' | 'center' | 'end'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">'center'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Position du label</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">spacing</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">'none' | 'sm' | 'md' | 'lg' | 'xl'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">'md'</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Espacement autour du séparateur</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">decorative</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">true</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Si true, caché des lecteurs d'écran</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">color</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300 italic">string</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">-</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Couleur personnalisée (override severity)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Slots -->
            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:square-3-stack-3d" class="text-indigo-500" />
                    Slots
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/10 border-b border-inherit">
                            <tr>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Slot</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">default</td>
                                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Contenu personnalisé pour le label (remplace la
                                    prop label)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Accessibility -->
        <section class="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <Icon name="heroicons:eye" class="text-emerald-500" />
                Accessibilité
            </h2>
            <Card variant="soft" padding="md">
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Par défaut <code
                                class="px-1 bg-slate-200 dark:bg-slate-700 rounded">decorative="true"</code>
                            masque le
                            séparateur des lecteurs d'écran</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Utilisez <code
                                class="px-1 bg-slate-200 dark:bg-slate-700 rounded">decorative="false"</code> pour
                            les
                            séparateurs sémantiques avec <code
                                class="px-1 bg-slate-200 dark:bg-slate-700 rounded">role="separator"</code></span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span><code class="px-1 bg-slate-200 dark:bg-slate-700 rounded">aria-orientation</code>
                            automatiquement défini en mode non-décoratif</span>
                    </li>
                </ul>
            </Card>
        </section>
    </div>
</template>
