<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, AvatarGroup, Icon } from '../../../../src/index'

const initialsAlt = ref('Benjamin Canac')
const initialsSize = ref<any>('md')
const textValue = ref('+1')
const textSize = ref<any>('md')
const iconValue = ref('heroicons:user')
const iconSize = ref<any>('md')

// New features refs
const isGradient = ref(false)
const isSkeleton = ref(false)
const isInteractive = ref(false)
const showChip = ref(false)
const chipColor = ref<any>('success')
const chipPulse = ref(false)
</script>

<template>
    <section id="avatar" class="scroll-mt-24 mb-20 px-4 md:px-0">
        <!-- Badge Status -->
        <div class="flex items-center gap-3 mb-2">
            <span
                class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
        </div>

        <!-- Title & Description -->
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Avatar
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">
            Un composant polyvalent pour afficher des photos de profil, des initiales ou des icônes.
            Il supporte plusieurs tailles, formes et un indicateur de statut (chip).
        </p>

        <!-- Basic Examples -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <span class="text-xs font-medium text-slate-500">Aperçu</span>
            </div>
            <div class="bg-white dark:bg-slate-900 p-8 flex flex-wrap gap-8 items-center justify-center">
                <Avatar src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
                <Avatar text="JD" />
                <Avatar icon="heroicons:user" />
                <Avatar src="/invalid.jpg" alt="Fallback User" />
                <Avatar src="https://i.pravatar.cc/150?img=5" chip />
            </div>
            <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar src="https://i.pravatar.cc/150?img=1" alt="John Doe" /&gt;
  &lt;Avatar text="JD" /&gt;
  &lt;Avatar icon="heroicons:user" /&gt;
  &lt;Avatar src="https://i.pravatar.cc/150?img=5" chip /&gt;
&lt;/template&gt;</code></pre>
            </div>
        </div>

        <!-- Interactive Playground -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Playground Interactif</h3>
            <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <!-- Controls -->
                <div
                    class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div class="flex items-center justify-between gap-4 p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
                        <span class="text-xs text-slate-500 font-mono">Gradient</span>
                        <input type="checkbox" v-model="isGradient" class="w-4 h-4 rounded" />
                    </div>
                    <div class="flex items-center justify-between gap-4 p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
                        <span class="text-xs text-slate-500 font-mono">Skeleton</span>
                        <input type="checkbox" v-model="isSkeleton" class="w-4 h-4 rounded" />
                    </div>
                    <div class="flex items-center justify-between gap-4 p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
                        <span class="text-xs text-slate-500 font-mono">Interactive</span>
                        <input type="checkbox" v-model="isInteractive" class="w-4 h-4 rounded" />
                    </div>
                    <div class="flex items-center justify-between gap-4 p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
                        <span class="text-xs text-slate-500 font-mono">Show Chip</span>
                        <input type="checkbox" v-model="showChip" class="w-4 h-4 rounded" />
                    </div>
                    <div class="flex items-center justify-between gap-4 p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
                        <span class="text-xs text-slate-500 font-mono">Chip Color</span>
                        <select v-model="chipColor"
                            class="bg-transparent border-none outline-none text-xs dark:text-white">
                            <option v-for="c in ['success', 'warning', 'danger', 'info', 'primary']" :key="c"
                                :value="c">{{ c }}</option>
                        </select>
                    </div>
                </div>
                <!-- Preview -->
                <div class="bg-white dark:bg-slate-900 p-12 flex items-center justify-center min-h-[160px]">
                    <Avatar alt="John Doe" :gradient="isGradient" :skeleton="isSkeleton" :interactive="isInteractive"
                        :chip="showChip ? { color: chipColor, pulse: chipPulse, inset: true } : false" size="xl" />
                </div>
            </div>
        </div>

        <!-- Initials -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Initials</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                When no icon or text is provided, the <span
                    class="font-bold text-slate-900 dark:text-white">initials</span> of the <code>alt</code> prop is
                used as fallback.
            </p>
            <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <!-- Controls -->
                <div
                    class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4 text-sm">
                    <div
                        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                        <span
                            class="px-2 py-1 text-xs text-slate-500 font-mono border-r border-slate-300 dark:border-slate-600">alt</span>
                        <input v-model="initialsAlt" type="text"
                            class="bg-transparent border-none outline-none px-2 py-1 w-40 dark:text-white" />
                    </div>
                    <div
                        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                        <span
                            class="px-2 py-1 text-xs text-slate-500 font-mono border-r border-slate-300 dark:border-slate-600">size</span>
                        <select v-model="initialsSize"
                            class="bg-transparent border-none outline-none px-2 py-1 dark:text-white">
                            <option v-for="s in ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="s"
                                :value="s">{{ s }}</option>
                        </select>
                    </div>
                </div>
                <!-- Preview -->
                <div class="bg-white dark:bg-slate-900 p-12 flex items-center justify-center min-h-[160px]">
                    <Avatar :alt="initialsAlt" :size="initialsSize" />
                </div>
                <!-- Code -->
                <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar alt="{{ initialsAlt }}" size="{{ initialsSize }}" /&gt;
&lt;/template&gt;</code></pre>
                </div>
            </div>
            <!-- Info Box -->
            <div
                class="mt-4 p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/50 flex gap-3 items-start shadow-sm">
                <Icon name="heroicons:information-circle" class="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <p class="text-sm text-sky-700 dark:text-sky-300 leading-relaxed">
                    The <code>alt</code> prop is passed to the <code>img</code> element as the <code>alt</code>
                    attribute.
                </p>
            </div>
        </div>

        <!-- Text -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Text</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Use the <code>text</code> prop to display a fallback text.
            </p>
            <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <!-- Controls -->
                <div
                    class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4 text-sm">
                    <div
                        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                        <span
                            class="px-2 py-1 text-xs text-slate-500 font-mono border-r border-slate-300 dark:border-slate-600">text</span>
                        <input v-model="textValue" type="text"
                            class="bg-transparent border-none outline-none px-2 py-1 w-20 dark:text-white" />
                    </div>
                    <div
                        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                        <span
                            class="px-2 py-1 text-xs text-slate-500 font-mono border-r border-slate-300 dark:border-slate-600">size</span>
                        <select v-model="textSize"
                            class="bg-transparent border-none outline-none px-2 py-1 dark:text-white">
                            <option v-for="s in ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="s"
                                :value="s">{{ s }}</option>
                        </select>
                    </div>
                </div>
                <!-- Preview -->
                <div class="bg-white dark:bg-slate-900 p-12 flex items-center justify-center min-h-[160px]">
                    <Avatar :text="textValue" :size="textSize" />
                </div>
                <!-- Code -->
                <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar text="{{ textValue }}" size="{{ textSize }}" /&gt;
&lt;/template&gt;</code></pre>
                </div>
            </div>
        </div>

        <!-- Squircle -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Squircle</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                You can create a squircle shaped avatar by combining <code>rounded="none"</code> and a custom class.
            </p>
            <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <div class="bg-white dark:bg-slate-900 p-12 flex items-center justify-center min-h-[160px]">
                    <Avatar class="rounded-none squircle" size="xl"
                        src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Benjamin Canac" />
                </div>
                <!-- Code / Style -->
                <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar class="rounded-none squircle" src="..." alt="Benjamin Canac" /&gt;
&lt;/template&gt;

&lt;style&gt;
.squircle {
  mask-image: url("data:image/svg+xml,...");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
}
&lt;/style&gt;</code></pre>
                </div>
            </div>
        </div>

        <!-- Squircle -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Squircle</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                You can create a squircle shaped avatar by combining <code>rounded="none"</code> and a custom class.
            </p>
            <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <div class="bg-white dark:bg-slate-900 p-12 flex items-center justify-center min-h-[160px]">
                    <Avatar class="rounded-none squircle" size="xl"
                        src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Benjamin Canac" />
                </div>
                <!-- Code / Style -->
                <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar class="rounded-none squircle" src="..." alt="Benjamin Canac" /&gt;
&lt;/template&gt;

&lt;style&gt;
.squircle {
  mask-image: url("data:image/svg+xml,...");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
}
&lt;/style&gt;</code></pre>
                </div>
            </div>
        </div>

        <!-- Icon -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Icon</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Use the <code>icon</code> prop to display a fallback <span
                    class="text-emerald-500 font-bold">Icon</span>.
            </p>
            <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <!-- Controls -->
                <div
                    class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4 text-sm">
                    <div
                        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                        <span
                            class="px-2 py-1 text-xs text-slate-500 font-mono border-r border-slate-300 dark:border-slate-600">icon</span>
                        <input v-model="iconValue" type="text"
                            class="bg-transparent border-none outline-none px-2 py-1 w-48 dark:text-white" />
                    </div>
                    <div
                        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                        <span
                            class="px-2 py-1 text-xs text-slate-500 font-mono border-r border-slate-300 dark:border-slate-600">size</span>
                        <select v-model="iconSize"
                            class="bg-transparent border-none outline-none px-2 py-1 dark:text-white">
                            <option v-for="s in ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="s"
                                :value="s">{{ s }}</option>
                        </select>
                    </div>
                </div>
                <!-- Preview -->
                <div class="bg-white dark:bg-slate-900 p-12 flex items-center justify-center min-h-[160px]">
                    <Avatar :icon="iconValue" :size="iconSize" />
                </div>
                <!-- Code -->
                <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                    <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar icon="{{ iconValue }}" size="{{ iconSize }}" /&gt;
&lt;/template&gt;</code></pre>
                </div>
            </div>
        </div>

        <!-- Tailles -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tailles</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                De <code>3xs</code> à <code>3xl</code> pour s'adapter à tous vos contextes.
            </p>
            <div
                class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-6 items-end justify-center">
                <div class="flex flex-col items-center gap-2"
                    v-for="s in ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="s">
                    <Avatar :size="s" src="https://i.pravatar.cc/150?img=10" />
                    <span class="text-[10px] text-slate-500 font-mono">{{ s }}</span>
                </div>
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar size="3xs" src="..." /&gt;
  &lt;Avatar size="md" src="..." /&gt;
  &lt;Avatar size="3xl" src="..." /&gt;
&lt;/template&gt;</code></pre>
            </div>
        </div>

        <!-- Formes -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Formes</h3>
            <div
                class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-8 items-center justify-center">
                <div class="flex flex-col items-center gap-3" v-for="r in ['none', 'md', 'full']" :key="r">
                    <Avatar :rounded="r" size="xl" src="https://i.pravatar.cc/150?img=20" />
                    <span class="text-xs text-slate-500">{{ r }}</span>
                </div>
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar rounded="none" src="..." /&gt;
  &lt;Avatar rounded="md" src="..." /&gt;
  &lt;Avatar rounded="full" src="..." /&gt;
&lt;/template&gt;</code></pre>
            </div>
        </div>

        <!-- AvatarGroup -->
        <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">AvatarGroup</h3>
                <span
                    class="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded uppercase tracking-tighter">Stack</span>
            </div>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Empilez plusieurs avatars avec une gestion automatique du surplus.
            </p>
            <div
                class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-col gap-8">
                <div class="flex items-center gap-8">
                    <AvatarGroup :max="3">
                        <Avatar src="https://i.pravatar.cc/150?img=31" />
                        <Avatar src="https://i.pravatar.cc/150?img=32" />
                        <Avatar src="https://i.pravatar.cc/150?img=33" />
                        <Avatar src="https://i.pravatar.cc/150?img=34" />
                        <Avatar src="https://i.pravatar.cc/150?img=35" />
                    </AvatarGroup>
                    <span class="text-sm text-slate-500">Max = 3</span>
                </div>
                <div class="flex items-center gap-8">
                    <AvatarGroup :max="4" size="lg">
                        <Avatar src="https://i.pravatar.cc/150?img=41" />
                        <Avatar src="https://i.pravatar.cc/150?img=42" />
                        <Avatar src="https://i.pravatar.cc/150?img=43" />
                        <Avatar src="https://i.pravatar.cc/150?img=44" />
                        <Avatar src="https://i.pravatar.cc/150?img=45" />
                        <Avatar src="https://i.pravatar.cc/150?img=46" />
                    </AvatarGroup>
                    <span class="text-sm text-slate-500">Size = LG, Max = 4</span>
                </div>
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;AvatarGroup :max="3"&gt;
    &lt;Avatar src="..." /&gt;
    &lt;Avatar src="..." /&gt;
    &lt;Avatar src="..." /&gt;
    &lt;Avatar src="..." /&gt;
  &lt;/AvatarGroup&gt;
&lt;/template&gt;</code></pre>
            </div>
        </div>

        <!-- Chip -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Chip</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Utilisez la prop <code>chip</code> pour afficher un indicateur (ex: statut en ligne) autour de l'Avatar.
            </p>
            <div
                class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-8 items-center justify-center">
                <Avatar src="https://i.pravatar.cc/150?img=1" chip />
                <Avatar src="https://i.pravatar.cc/150?img=2" :chip="{ inset: true }" />
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;Avatar src="..." chip /&gt;
  
  &lt;Avatar src="..." :chip="{ inset: true }" /&gt;
&lt;/template&gt;</code></pre>
            </div>
        </div>

        <!-- Tooltip -->
        <div class="mb-20">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tooltip</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Vous pouvez utiliser un composant <code>Tooltip</code> pour afficher une information au survol.
            </p>
            <div
                class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex items-center justify-center">
                <!-- Simulation d'un tooltip pour la démo -->
                <div class="relative group">
                    <Avatar src="https://i.pravatar.cc/150?img=5" alt="Benjamin Canac" />
                    <div
                        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Benjamin Canac
                    </div>
                </div>
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;template&gt;
  &lt;UTooltip text="Benjamin Canac"&gt;
    &lt;Avatar src="..." alt="Benjamin Canac" /&gt;
  &lt;/UTooltip&gt;
&lt;/template&gt;</code></pre>
            </div>
        </div>

        <!-- Performance -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6 fund-bold">
                Optimisez le chargement des images critiques.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
                    <h4 class="font-bold text-slate-900 dark:text-white mb-2">Preloading</h4>
                    <p class="text-xs text-slate-500 mb-4">Utilisez <code>preload</code> pour les avatars au-dessus de
                        la ligne de flottaison.</p>
                    <pre class="text-[10px] text-sky-400"><code>&lt;Avatar src="..." preload /&gt;</code></pre>
                </div>
                <div class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
                    <h4 class="font-bold text-slate-900 dark:text-white mb-2">Blur Hash</h4>
                    <p class="text-xs text-slate-500 mb-4">Affichez un placeholder flou pendant le chargement.</p>
                    <pre
                        class="text-[10px] text-sky-400"><code>&lt;Avatar src="..." blurHash="data:..." /&gt;</code></pre>
                </div>
            </div>
        </div>

        <!-- Migration Guide -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Guide de Migration</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- From Nuxt UI -->
                <div
                    class="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div class="flex items-center gap-2 mb-4">
                        <Icon name="logos:nuxt-icon" class="w-5 h-5" />
                        <span class="font-bold">Depuis Nuxt UI</span>
                    </div>
                    <ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li class="flex gap-2">
                            <Icon name="heroicons:arrow-right" class="w-4 h-4 mt-1 text-slate-400" />
                            <span><code>UAvatar</code> devient <code>Avatar</code>.</span>
                        </li>
                        <li class="flex gap-2">
                            <Icon name="heroicons:arrow-right" class="w-4 h-4 mt-1 text-slate-400" />
                            <span>La prop <code>chip-color</code> est maintenant dans l'objet <code>chip</code>.</span>
                        </li>
                    </ul>
                </div>
                <!-- From Vuetify -->
                <div
                    class="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div class="flex items-center gap-2 mb-4">
                        <Icon name="logos:vuetify" class="w-5 h-5" />
                        <span class="font-bold">Depuis Vuetify</span>
                    </div>
                    <ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li class="flex gap-2">
                            <Icon name="heroicons:arrow-right" class="w-4 h-4 mt-1 text-slate-400" />
                            <span><code>v-avatar</code> devient <code>Avatar</code>.</span>
                        </li>
                        <li class="flex gap-2">
                            <Icon name="heroicons:arrow-right" class="w-4 h-4 mt-1 text-slate-400" />
                            <span>Utilisez <code>rounded="none"</code> pour les avatars carrés.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- API Reference -->
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Icon name="heroicons:code-bracket" class="w-6 h-6 text-indigo-500" />
            API Reference
        </h2>

        <!-- Props Table -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Props</h3>
            <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
                <table class="w-full text-sm text-left">
                    <thead
                        class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th class="py-4 px-6">Prop</th>
                            <th class="py-4 px-6">Default</th>
                            <th class="py-4 px-6">Type</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900/50">
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">as</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">'span'</td>
                            <td class="py-4 px-6">
                                <span class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">any</span>
                                <p class="mt-1 text-slate-500 text-xs">The element or component this component should
                                    render as.</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">src</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6">
                                <span class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">string</span>
                                <p class="mt-1 text-slate-500 text-xs">URL source de l'image.</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">alt</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6">
                                <span class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">string</span>
                                <p class="mt-1 text-slate-500 text-xs">Texte alternatif pour l'image.</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">icon</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6">
                                <span class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">any</span>
                                <p class="mt-1 text-slate-500 text-xs">Nom de l'icône à afficher.</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">text</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6">
                                <span class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">string</span>
                                <p class="mt-1 text-slate-500 text-xs">Initiales ou texte à afficher.</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">size</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">'md'</td>
                            <td class="py-4 px-6">
                                <div class="flex flex-wrap gap-1 max-w-[300px]">
                                    <span v-for="s in ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']"
                                        :key="s"
                                        class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-600 dark:text-emerald-400">"{{
                                            s }}"</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">chip</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">false</td>
                            <td
                                class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs tracking-tighter">
                                boolean | ChipProps</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">rounded</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">'full'</td>
                            <td class="py-4 px-6">
                                <div class="flex flex-wrap gap-1 max-w-[300px]">
                                    <span v-for="r in ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full']" :key="r"
                                        class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-600 dark:text-emerald-400">"{{
                                            r }}"</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">loading</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs">"eager" |
                                "lazy"</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                                referrerpolicy</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">crossorigin
                            </td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs">"" |
                                "anonymous" | "use-credentials"</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">decoding</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs">"async" |
                                "auto" | "sync"</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">height</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string |
                                number</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">width</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string |
                                number</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">srcset</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        </tr>
                        <tr>
                            <td class="py-4 px-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">usemap</td>
                            <td class="py-4 px-6 font-mono text-slate-400 text-xs">-</td>
                            <td class="py-4 px-6 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<style scoped>
@reference "../../../../src/theme.css";

/* Fix select dropdown in dark mode */
select {
    @apply bg-transparent;
}

select option {
    @apply bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white;
}
</style>
