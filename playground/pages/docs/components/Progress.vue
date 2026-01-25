<script setup lang="ts">
import { ref, computed } from 'vue'
import { Progress, UProgress, CircularProgress, Button, Icon, Card } from '@/index'
import type { ProgressSize, ProgressSeverity, ProgressVariant, ProgressAnimation, ProgressRounded } from '@/components/progress/types'

// Configurator State
const configValue = ref(65)
const configSize = ref<ProgressSize>('md')
const configSeverity = ref<ProgressSeverity>('primary')
const configVariant = ref<ProgressVariant>('solid')
const configAnimation = ref<ProgressAnimation>('none')
const configRounded = ref<ProgressRounded>('full')
const configShowValue = ref(true)
const configLabelPosition = ref<'inside' | 'outside' | 'top'>('outside')
const configIndeterminate = ref(false)

const configSteps = ref<number | undefined>(undefined)
const configSecondary = ref<number | undefined>(undefined)
const configReverse = ref(false)
const configTransition = ref(500)

const sizes: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const severities: ProgressSeverity[] = ['primary', 'secondary', 'success', 'info', 'warn', 'danger', 'contrast']
const variants: ProgressVariant[] = ['solid', 'striped', 'gradient']
const animations: ProgressAnimation[] = ['none', 'carousel', 'carousel-inverse', 'swing', 'elastic', 'pulse', 'striped', 'indeterminate', 'bounce', 'gradient-flow', 'glow', 'flash', 'scan']
const roundedOptions: ProgressRounded[] = ['none', 'sm', 'md', 'lg', 'full']

// Demo states
const downloadProgress = ref(0)
const isDownloading = ref(false)
const stepValue = ref(1)
const stepLabels = ['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']
const animDemo = ref<ProgressAnimation>('elastic')

const startDownload = () => {
    isDownloading.value = true
    downloadProgress.value = 0
    const interval = setInterval(() => {
        downloadProgress.value += Math.random() * 15
        if (downloadProgress.value >= 100) {
            downloadProgress.value = 100
            isDownloading.value = false
            clearInterval(interval)
        }
    }, 300)
}

// Code generator
const isCopied = ref(false)
const generatedCode = computed(() => {
    let code = `<Progress`
    if (configValue.value !== 0) code += `\n  :value="${configValue.value}"`
    if (configSize.value !== 'md') code += `\n  size="${configSize.value}"`
    if (configSeverity.value !== 'primary') code += `\n  severity="${configSeverity.value}"`
    if (configVariant.value !== 'solid') code += `\n  variant="${configVariant.value}"`
    if (configAnimation.value !== 'none') code += `\n  animation="${configAnimation.value}"`
    if (configRounded.value !== 'full') code += `\n  rounded="${configRounded.value}"`
    if (configShowValue.value) code += `\n  show-value`
    if (configLabelPosition.value !== 'outside') code += `\n  label-position="${configLabelPosition.value}"`
    if (configIndeterminate.value) code += `\n  indeterminate`
    if (configSteps.value) code += `\n  :steps="${configSteps.value}"\n  show-step-markers`
    if (configSecondary.value) code += `\n  :secondary-value="${configSecondary.value}"`
    if (configReverse.value) code += `\n  reverse`
    if (configTransition.value !== 500) code += `\n  :transition-duration="${configTransition.value}"`
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
                    class="px-2 py-0.5 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">Feedback</span>
            </div>
            <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Progress</h1>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Indicateur de progression pour afficher l'avancement d'une tâche ou d'un processus.
                Disponible en version linéaire et circulaire avec support des animations et états indéterminés.
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
                    <!-- Value Slider -->
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Valeur</label>
                            <span class="text-sm font-bold text-indigo-600">{{ configValue }}%</span>
                        </div>
                        <input v-model.number="configValue" type="range" min="0" max="100"
                            :disabled="configIndeterminate"
                            class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 disabled:opacity-50" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <!-- Size -->
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Taille</label>
                            <select v-model="configSize"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="s in sizes" :key="s" :value="s">{{ s }}</option>
                            </select>
                        </div>

                        <!-- Severity -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sévérité</label>
                            <select v-model="configSeverity"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="s in severities" :key="s" :value="s">{{ s }}</option>
                            </select>
                        </div>

                        <!-- Variant -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Variante</label>
                            <select v-model="configVariant"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="v in variants" :key="v" :value="v">{{ v }}</option>
                            </select>
                        </div>

                        <!-- Animation -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Animation</label>
                            <select v-model="configAnimation"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="a in animations" :key="a" :value="a">{{ a }}</option>
                            </select>
                        </div>

                        <!-- Rounded -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Arrondi</label>
                            <select v-model="configRounded"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="r in roundedOptions" :key="r" :value="r">{{ r }}</option>
                            </select>
                        </div>

                        <!-- Label Position -->
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Position
                                Label</label>
                            <select v-model="configLabelPosition"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option value="inside">Inside</option>
                                <option value="outside">Outside</option>
                                <option value="top">Top</option>
                            </select>
                        </div>
                    </div>

                    <!-- Steps & Secondary -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Étapes</label>
                            <input v-model.number="configSteps" type="number" min="0" max="10" placeholder="Ex: 5"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Val.
                                Secondaire</label>
                            <input v-model.number="configSecondary" type="number" min="0" max="100" placeholder="Ex: 30"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none" />
                        </div>
                    </div>

                    <!-- Checkboxes -->
                    <div class="flex flex-wrap gap-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="configShowValue" type="checkbox"
                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span
                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Afficher
                                valeur</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="configIndeterminate" type="checkbox"
                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span
                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Indéterminé</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="configReverse" type="checkbox"
                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span
                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Reverse</span>
                        </label>
                    </div>
                </div>

                <!-- Preview -->
                <div
                    class="flex flex-col gap-6 p-8 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-3xl border-2 border-dashed border-indigo-200 dark:border-indigo-800/50">
                    <div class="text-center space-y-2">
                        <p class="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">Aperçu</p>
                    </div>

                    <div class="flex-1 flex items-center justify-center">
                        <div class="w-full max-w-md">
                            <Progress :value="configValue" :size="configSize" :severity="configSeverity"
                                :variant="configVariant" :animation="configAnimation" :rounded="configRounded"
                                :show-value="configShowValue" :label-position="configLabelPosition"
                                :indeterminate="configIndeterminate" :steps="configSteps"
                                :show-step-markers="!!configSteps" :secondary-value="configSecondary"
                                :reverse="configReverse" :transition-duration="configTransition" />
                        </div>
                    </div>

                    <div class="text-center">
                        <p class="text-xs text-slate-500">Circular Progress</p>
                        <div class="flex justify-center mt-4">
                            <CircularProgress :value="configValue" :size="configSize" :severity="configSeverity"
                                :indeterminate="configIndeterminate" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Generated Code -->
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
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

        <!-- Sizes -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Tailles</h2>
            <div
                class="space-y-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div v-for="size in sizes" :key="size" class="space-y-2">
                    <p class="text-xs font-bold text-slate-400 uppercase">{{ size }}</p>
                    <Progress :value="65" :size="size" severity="primary" />
                </div>
            </div>
        </section>

        <!-- Severities -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Sévérités</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card v-for="severity in severities" :key="severity" variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-500 uppercase">{{ severity }}</p>
                    <Progress :value="75" :severity="severity" size="md" />
                </Card>
            </div>
        </section>

        <!-- Variants -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Variantes</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card v-for="variant in variants" :key="variant" variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-500 uppercase">{{ variant }}</p>
                    <Progress :value="60" :variant="variant" severity="primary" size="lg" />
                </Card>
            </div>
        </section>

        <!-- Indeterminate -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Indeterminate</h2>
            <p class="text-slate-600 dark:text-slate-400">
                When no v-model is set or the value is <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-indigo-500">null</code>, the Progress
                becomes indeterminate. The progress bar is animated as a carousel, but you can change it using the <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">animation</code> prop.
            </p>
            <Card variant="soft" padding="lg" class="space-y-6">
                <div class="space-y-4">
                    <UProgress :model-value="null" severity="primary" />
                </div>
                <div class="bg-slate-950 rounded-xl p-4">
                    <pre class="text-xs text-indigo-300"><code>&lt;script setup lang="ts"&gt;
const value = ref(null)
&lt;/script&gt;

&lt;template&gt;
  &lt;UProgress v-model="value" /&gt;
&lt;/template&gt;</code></pre>
                </div>
            </Card>
        </section>

        <!-- Animations -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Animation</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Use the <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-indigo-500">animation</code>
                prop to
                change the animation of the Progress to an <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">inverse carousel</code>, a <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">swinging bar</code> or an <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">elastic bar</code>. Defaults to <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-bold">carousel</code>.
            </p>

            <Card variant="soft" padding="none"
                class="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
                <!-- Header / Control -->
                <div
                    class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-start bg-slate-50/50 dark:bg-slate-900/50">
                    <div
                        class="flex items-center bg-slate-200/50 dark:bg-slate-800 rounded-lg p-1 border border-slate-300 dark:border-slate-700 shadow-inner">
                        <span
                            class="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">animation</span>
                        <select v-model="animDemo"
                            class="bg-white dark:bg-slate-950 border-l border-slate-300 dark:border-slate-700 rounded-r-md px-3 py-1 text-sm font-bold focus:outline-none appearance-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                            <option value="carousel">carousel</option>
                            <option value="carousel-inverse">carousel-inverse</option>
                            <option value="swing">swing</option>
                            <option value="elastic">elastic</option>
                        </select>
                    </div>
                </div>

                <!-- Preview Area -->
                <div class="p-12 bg-slate-900/5 dark:bg-slate-950/20 flex items-center justify-center min-h-[140px]">
                    <div class="w-full max-w-2xl px-8">
                        <UProgress :model-value="null" :animation="animDemo" severity="success" size="sm" />
                    </div>
                </div>

                <!-- Code Snippet -->
                <div class="bg-[#0f172a] p-6 border-t border-slate-800/50">
                    <pre class="text-xs leading-relaxed font-mono"><code class="text-slate-300">&lt;template&gt;
  &lt;UProgress animation="{{ animDemo }}" /&gt;
&lt;/template&gt;</code></pre>
                </div>
            </Card>
        </section>

        <!-- Orientation -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Orientation</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Use the <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-indigo-500">orientation</code>
                prop
                to change the orientation of the Progress to <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">vertical</code>. Defaults to <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-bold">horizontal</code>.
            </p>
            <Card variant="soft" padding="lg"
                class="flex flex-col md:flex-row items-center justify-center gap-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                <div class="flex flex-col items-center gap-4">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Horizontal
                    </p>
                    <UProgress :model-value="65" class="w-64" severity="primary" />
                </div>
                <div class="flex flex-col items-center gap-4">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Vertical</p>
                    <UProgress :model-value="65" orientation="vertical" severity="success" />
                </div>
            </Card>
        </section>

        <!-- Inverted -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Inverted</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Use the <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-indigo-500">inverted</code>
                prop to visually invert the Progress direction.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="soft" padding="md"
                    class="space-y-3 flex flex-col items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl h-48">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Horizontal Inverted</p>
                    <UProgress :model-value="40" inverted severity="info" class="w-full max-w-xs" />
                </Card>
                <Card variant="soft" padding="md"
                    class="space-y-3 flex flex-col items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl h-48">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vertical Inverted</p>
                    <UProgress :model-value="40" orientation="vertical" inverted severity="warn" />
                </Card>
            </div>
        </section>

        <!-- Labels -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Position des Labels</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-500 uppercase">Outside (default)</p>
                    <Progress :value="45" show-value label-position="outside" severity="primary" />
                </Card>
                <Card variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-500 uppercase">Inside</p>
                    <Progress :value="65" show-value label-position="inside" severity="success" size="xl" />
                </Card>
                <Card variant="soft" padding="md" class="space-y-3">
                    <p class="text-xs font-bold text-slate-500 uppercase">Top</p>
                    <Progress :value="80" show-value label-position="top" severity="info">
                        <template #label-text>Téléchargement</template>
                    </Progress>
                </Card>
            </div>
        </section>

        <!-- Circular Progress -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Progress Circulaire</h2>
            <div
                class="flex flex-wrap items-end justify-center gap-8 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div v-for="size in sizes" :key="size" class="text-center space-y-2">
                    <CircularProgress :value="65" :size="size" severity="primary" />
                    <p class="text-xs font-bold text-slate-400 uppercase">{{ size }}</p>
                </div>
            </div>

            <div
                class="flex flex-wrap items-center justify-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <CircularProgress v-for="severity in severities" :key="severity" :value="75" :severity="severity"
                    size="md" />
            </div>

            <div
                class="flex flex-wrap items-center justify-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div class="text-center space-y-2">
                    <CircularProgress indeterminate severity="primary" size="lg" />
                    <p class="text-xs text-slate-500">Indeterminate</p>
                </div>
                <div class="text-center space-y-2">
                    <CircularProgress :value="85" severity="success" size="lg">
                        <Icon name="heroicons:check" class="text-emerald-500" />
                    </CircularProgress>
                    <p class="text-xs text-slate-500">Custom Content</p>
                </div>
            </div>
        </section>

        <!-- Real-world Example -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Exemple Pratique</h2>
            <Card variant="outlined" padding="lg" class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="font-bold text-slate-900 dark:text-white">Téléchargement de fichier</h3>
                        <p class="text-sm text-slate-500">document-report-2024.pdf</p>
                    </div>
                    <Button :disabled="isDownloading" severity="primary" @click="startDownload">
                        <Icon name="heroicons:arrow-down-tray" size="xs" class="mr-2" />
                        {{ isDownloading ? 'Téléchargement...' : 'Télécharger' }}
                    </Button>
                </div>

                <Progress :value="downloadProgress" :indeterminate="isDownloading && downloadProgress === 0" show-value
                    label-position="top" :severity="downloadProgress === 100 ? 'success' : 'primary'" size="md">
                    <template #label-text>
                        {{ downloadProgress === 100 ? 'Terminé !' : 'Progression' }}
                    </template>
                </Progress>
            </Card>
        </section>

        <!-- Status -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Status</h2>
            <p class="text-slate-600 dark:text-slate-400">Utilisez la prop <code
                    class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">status</code> pour afficher la valeur
                au-dessus
                de la barre.</p>
            <Card variant="soft" padding="lg" class="space-y-6">
                <div class="space-y-4">
                    <UProgress :model-value="50" status severity="primary" />
                </div>
                <div class="bg-slate-950 rounded-xl p-4">
                    <pre class="text-xs text-indigo-300"><code>&lt;UProgress v-model="value" status /&gt;</code></pre>
                </div>
            </Card>
        </section>

        <!-- Progress Steps -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Steps</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Use the <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-indigo-500">max</code> prop
                with an
                array of strings to display the active step under the bar, the maximum value of the Progress is the
                length of
                the array.
            </p>

            <Card variant="soft" padding="none" class="overflow-hidden border border-slate-200 dark:border-slate-800">
                <!-- Header / Control -->
                <div
                    class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-start bg-slate-50/50 dark:bg-slate-900/50">
                    <div
                        class="flex items-center bg-slate-200/50 dark:bg-slate-800 rounded-lg p-1 border border-slate-300 dark:border-slate-700">
                        <span
                            class="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">modelValue</span>
                        <input v-model.number="stepValue" type="number" min="0" :max="stepLabels.length - 1"
                            class="w-16 bg-white dark:bg-slate-950 border-l border-slate-300 dark:border-slate-700 rounded-r-md px-2 py-1 text-sm font-bold focus:outline-none" />
                    </div>
                </div>

                <!-- Preview Area -->
                <div class="p-8 bg-slate-900/10 dark:bg-slate-950/20">
                    <UProgress :model-value="stepValue" :max="stepLabels" show-value size="sm" color="#4f46e5" />
                </div>

                <!-- Code Snippet -->
                <div class="bg-slate-900 p-6 border-t border-slate-800">
                    <pre class="text-xs leading-relaxed font-mono"><code class="text-indigo-300">&lt;script setup lang="ts"&gt;
                    const value = ref({{ stepValue }})
                    &lt;/script&gt;

                    &lt;template&gt;
                    &lt;UProgress
                    v-model="value"
                    :max="['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']"
                    /&gt;
                    &lt;/template&gt;</code></pre>
                </div>
            </Card>
        </section>

        <!-- API Reference -->
        <section class="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-black">API Reference</h2>

            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:list-bullet" class="text-indigo-500" />
                    Props (Progress)
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
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">value</td>
                                <td class="px-6 py-4 text-slate-500 italic">number</td>
                                <td class="px-6 py-4 text-slate-500">0</td>
                                <td class="px-6 py-4 text-slate-500">Valeur actuelle (0-100)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">max</td>
                                <td class="px-6 py-4 text-slate-500 italic">number</td>
                                <td class="px-6 py-4 text-slate-500">100</td>
                                <td class="px-6 py-4 text-slate-500">Valeur maximale</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">size</td>
                                <td class="px-6 py-4 text-slate-500 italic">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                                <td class="px-6 py-4 text-slate-500">'md'</td>
                                <td class="px-6 py-4 text-slate-500">Taille de la barre</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">severity</td>
                                <td class="px-6 py-4 text-slate-500 italic">ProgressSeverity</td>
                                <td class="px-6 py-4 text-slate-500">'primary'</td>
                                <td class="px-6 py-4 text-slate-500">Couleur/thème visuel</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">variant</td>
                                <td class="px-6 py-4 text-slate-500 italic">'solid' | 'striped' | 'gradient'</td>
                                <td class="px-6 py-4 text-slate-500">'solid'</td>
                                <td class="px-6 py-4 text-slate-500">Style visuel</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">animation</td>
                                <td class="px-6 py-4 text-slate-500 italic">'none' | 'pulse' | 'striped' |
                                    'indeterminate'</td>
                                <td class="px-6 py-4 text-slate-500">'none'</td>
                                <td class="px-6 py-4 text-slate-500">Type d'animation</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">rounded</td>
                                <td class="px-6 py-4 text-slate-500 italic">'none' | 'sm' | 'md' | 'lg' | 'full'</td>
                                <td class="px-6 py-4 text-slate-500">'full'</td>
                                <td class="px-6 py-4 text-slate-500">Arrondi des bords</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">showValue</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">Afficher le pourcentage</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">status</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">Afficher la valeur au-dessus (alias top label)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">orientation</td>
                                <td class="px-6 py-4 text-slate-500 italic">'horizontal' | 'vertical'</td>
                                <td class="px-6 py-4 text-slate-500">'horizontal'</td>
                                <td class="px-6 py-4 text-slate-500">Orientation de la barre</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">inverted</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">Inverser la direction de progression</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">labelPosition</td>
                                <td class="px-6 py-4 text-slate-500 italic">'inside' | 'outside' | 'top'</td>
                                <td class="px-6 py-4 text-slate-500">'outside'</td>
                                <td class="px-6 py-4 text-slate-500">Position du label</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">indeterminate</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">Mode chargement infini</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">buffer</td>
                                <td class="px-6 py-4 text-slate-500 italic">number</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                                <td class="px-6 py-4 text-slate-500">Valeur du buffer (chargement vidéo)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">color</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                                <td class="px-6 py-4 text-slate-500">Couleur custom (override severity)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">formatValue</td>
                                <td class="px-6 py-4 text-slate-500 italic">(value, max) => string</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                                <td class="px-6 py-4 text-slate-500">Formater l'affichage</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">label</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                                <td class="px-6 py-4 text-slate-500">Texte (remplace slot label)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">steps</td>
                                <td class="px-6 py-4 text-slate-500 italic">number</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                                <td class="px-6 py-4 text-slate-500">Nombre d'étapes</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">showStepMarkers</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">Afficher les marqueurs</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">secondaryValue</td>
                                <td class="px-6 py-4 text-slate-500 italic">number</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                                <td class="px-6 py-4 text-slate-500">Valeur secondaire (background)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">reverse</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">Sens inverse (alias inverted)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">transitionDuration</td>
                                <td class="px-6 py-4 text-slate-500 italic">number</td>
                                <td class="px-6 py-4 text-slate-500">500</td>
                                <td class="px-6 py-4 text-slate-500">Durée transition (ms)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">ariaValuetext</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                                <td class="px-6 py-4 text-slate-500">Texte pour lecteur d'écran</td>
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
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">label</td>
                                <td class="px-6 py-4 text-slate-500">Contenu custom pour le label (position top)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">label-text</td>
                                <td class="px-6 py-4 text-slate-500">Texte du label à gauche (position top)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">default (Circular)</td>
                                <td class="px-6 py-4 text-slate-500">Contenu au centre du progress circulaire</td>
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
                        <span><code class="px-1 bg-slate-200 dark:bg-slate-700 rounded">role="progressbar"</code>
                            appliqué automatiquement</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span><code class="px-1 bg-slate-200 dark:bg-slate-700 rounded">aria-valuenow</code>,
                            <code class="px-1 bg-slate-200 dark:bg-slate-700 rounded">aria-valuemin</code>,
                            <code class="px-1 bg-slate-200 dark:bg-slate-700 rounded">aria-valuemax</code> pour les
                            lecteurs d'écran</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span><code class="px-1 bg-slate-200 dark:bg-slate-700 rounded">aria-busy="true"</code> en mode
                            indéterminé</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Support de <code
                                class="px-1 bg-slate-200 dark:bg-slate-700 rounded">prefers-reduced-motion</code>
                            pour désactiver les animations</span>
                    </li>
                </ul>
            </Card>
        </section>
    </div>
</template>
