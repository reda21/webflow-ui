<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button, Icon, useToast, Card, Avatar } from '@/index'
import type { ToastPosition, ToastSeverity } from '@/components/toast/types'

const toast = useToast()

const positions: ToastPosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center']
const severities: ToastSeverity[] = ['primary', 'secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast']

// Configurator State
const configTitle = ref('Notification utilisateur')
const configDesc = ref('benjamincanac a été invité dans l\'équipe.')
const configSeverity = ref<ToastSeverity>('contrast')
const configPosition = ref<ToastPosition>('top-right')
const configDuration = ref(5000)
const configClosable = ref(true)
const configShowProgress = ref(true)
const configPreventClose = ref(false)
const mediaType = ref<'none' | 'icon' | 'avatar'>('avatar')
const configCustomIcon = ref('heroicons:bell-solid')
const configAvatar = ref('https://github.com/benjamincanac.png')

import { watch } from 'vue'

watch(configPreventClose, (val) => {
    if (val) {
        configDuration.value = 0
        configShowProgress.value = false
    } else {
        configDuration.value = 5000
        configShowProgress.value = true
    }
})

const configOrientation = ref<'horizontal' | 'vertical'>('horizontal')
const configProgressColor = ref('')

const triggerToast = () => {
    toast.add({
        title: configTitle.value,
        description: configDesc.value,
        severity: configSeverity.value,
        position: configPosition.value,
        duration: configDuration.value,
        closable: configClosable.value,
        orientation: configOrientation.value,
        progress: configProgressColor.value ? { color: configProgressColor.value } : configShowProgress.value,
        preventClose: configPreventClose.value,
        icon: mediaType.value === 'icon' ? configCustomIcon.value : (mediaType.value === 'none' ? false : true),
        avatar: mediaType.value === 'avatar' ? configAvatar.value : undefined
    })
}

const isCopied = ref(false)
const generatedCode = computed(() => {
    let code = `toast.add({\n`
    code += `  title: '${configTitle.value}',\n`
    if (configDesc.value) code += `  description: '${configDesc.value}',\n`
    if (configSeverity.value !== 'contrast') code += `  severity: '${configSeverity.value}',\n`
    if (configPosition.value !== 'top-right') code += `  position: '${configPosition.value}',\n`
    if (configOrientation.value !== 'horizontal') code += `  orientation: '${configOrientation.value}',\n`
    if (configDuration.value !== 5000) code += `  duration: ${configDuration.value},\n`
    if (!configClosable.value) code += `  closable: false,\n`

    if (configProgressColor.value) {
        code += `  progress: { color: '${configProgressColor.value}' },\n`
    } else if (!configShowProgress.value) {
        code += `  progress: false,\n`
    }

    if (configPreventClose.value) code += `  preventClose: true,\n`

    if (mediaType.value === 'avatar') {
        code += `  avatar: '${configAvatar.value}',\n`
    } else if (mediaType.value === 'icon') {
        code += `  icon: '${configCustomIcon.value}',\n`
    } else if (mediaType.value === 'none') {
        code += `  icon: false,\n`
    }

    code += `})`
    return code
})

const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    isCopied.value = true
    setTimeout(() => isCopied.value = false, 2000)
}

const showBasic = () => {
    toast.add({
        title: 'Notification Simple',
        description: 'Ceci est un message de notification standard.'
    })
}

const showSuccess = () => {
    toast.success('Succès !', 'Votre profil a été mis à jour avec succès.')
}

const showPosition = (position: ToastPosition) => {
    toast.add({
        title: 'Position ' + position,
        description: 'La notification apparaît ici.',
        position
    })
}

const showAction = () => {
    toast.add({
        title: 'Fichier supprimé',
        description: 'Le fichier report-2024.pdf a été supprimé définitivement.',
        severity: 'secondary',
        action: {
            label: 'Annuler',
            onClick: () => toast.success('Action annulée', 'Le fichier a été restauré.')
        }
    })
}

const showInfinity = () => {
    toast.add({
        title: 'Mise à jour requise',
        description: 'Une nouvelle version système est disponible.',
        severity: 'warn',
        duration: 0,
        action: {
            label: 'Mettre à jour',
            onClick: () => toast.success('Mise à jour', 'Installation en cours...')
        }
    })
}

function addToCalendar() {
    const eventDate = new Date(Date.now() + Math.random() * 31536000000)
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

    toast.add({
        title: 'Event added to calendar',
        description: `This event is scheduled for ${formattedDate}.`,
        icon: 'heroicons:calendar-days'
    })
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
                    class="px-2 py-0.5 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">Notification</span>
            </div>
            <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Toast</h1>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Un système de notifications non-intrusif (toasts) pour informer l'utilisateur des succès, erreurs ou
                mises à jour.
                Simple à utiliser via un composable et entièrement personnalisable.
            </p>
        </section>

        <!-- Configurator -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <Icon name="heroicons:adjustments-horizontal" class="text-indigo-500" />
                Playground Interactif
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Controls -->
                <div
                    class="lg:col-span-2 space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <!-- Informations -->
                        <div class="space-y-4 md:col-span-2">
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="w-1 h-4 bg-indigo-500 rounded-full"></span>
                                Contenu
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label
                                        class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Titre</label>
                                    <div class="relative group">
                                        <div
                                            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
                                            <Icon name="heroicons:pencil-square" size="xs" />
                                        </div>
                                        <input v-model="configTitle" type="text"
                                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <label
                                        class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description</label>
                                    <div class="relative group">
                                        <div
                                            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
                                            <Icon name="heroicons:chat-bubble-bottom-center-text" size="xs" />
                                        </div>
                                        <input v-model="configDesc" type="text"
                                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Style & Position -->
                        <div class="space-y-4">
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="w-1 h-4 bg-indigo-500 rounded-full"></span>
                                Layout & Style
                            </h3>
                            <div class="space-y-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Position</label>
                                        <select v-model="configPosition"
                                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none transition-all">
                                            <option v-for="p in positions" :key="p" :value="p">{{ p }}</option>
                                        </select>
                                    </div>
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Orientation</label>
                                        <select v-model="configOrientation"
                                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none transition-all">
                                            <option value="horizontal">Horizontal</option>
                                            <option value="vertical">Vertical</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sévérité</label>
                                        <select v-model="configSeverity"
                                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none transition-all">
                                            <option v-for="s in severities" :key="s" :value="s">{{ s }}</option>
                                        </select>
                                    </div>
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Durée
                                            (ms)</label>
                                        <input v-model.number="configDuration" type="number" step="500"
                                            :disabled="configPreventClose"
                                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Options Visuelles -->
                        <div class="space-y-4">
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="w-1 h-4 bg-indigo-500 rounded-full"></span>
                                Médias & Options
                            </h3>
                            <div class="space-y-6">
                                <div class="space-y-3">
                                    <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Type
                                        de média</label>
                                    <div
                                        class="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <button v-for="type in ['none', 'icon', 'avatar']" :key="type"
                                            class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize"
                                            :class="[mediaType === type ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300']"
                                            @click="mediaType = type as any">
                                            {{ type === 'none' ? 'Aucun' : type }}
                                        </button>
                                    </div>
                                </div>

                                <div v-if="mediaType === 'avatar'" class="space-y-2">
                                    <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">URL de
                                        l'Avatar</label>
                                    <div class="relative group">
                                        <div class="absolute left-4 top-1/2 -translate-y-1/2 shrink-0">
                                            <Avatar :src="configAvatar" size="xs" rounded="full" loading="eager" />
                                        </div>
                                        <input v-model="configAvatar" type="text"
                                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-2 text-sm focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                </div>

                                <div v-if="mediaType === 'icon'" class="space-y-2">
                                    <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nom de
                                        l'icône</label>
                                    <div class="relative group">
                                        <div
                                            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 dark:text-white transition-colors pointer-events-none">
                                            <Icon :name="configCustomIcon || 'heroicons:bell'" size="xs" />
                                        </div>
                                        <input v-model="configCustomIcon" type="text"
                                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:border-indigo-500 outline-none transition-all"
                                            placeholder="ex: heroicons:bell" />
                                    </div>
                                </div>

                                <!-- Options checkboxes -->
                                <div class="space-y-3 pt-2">
                                    <div class="flex items-center justify-between">
                                        <label class="flex items-center gap-2 cursor-pointer group">
                                            <input v-model="configShowProgress" type="checkbox"
                                                :disabled="configPreventClose"
                                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed" />
                                            <span
                                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter"
                                                :class="{ 'opacity-50': configPreventClose }">Auto-progression</span>
                                        </label>
                                        <div v-if="configShowProgress" class="flex items-center gap-2">
                                            <Icon name="heroicons:swatch" size="xs" class="text-slate-400" />
                                            <input v-model="configProgressColor" type="color"
                                                class="w-6 h-6 p-0 border-none bg-transparent cursor-pointer" />
                                        </div>
                                    </div>

                                    <label class="flex items-center gap-2 cursor-pointer group">
                                        <input v-model="configClosable" type="checkbox"
                                            class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                        <span
                                            class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Bouton
                                            de fermeture</span>
                                    </label>

                                    <label class="flex items-center gap-2 cursor-pointer group">
                                        <input v-model="configPreventClose" type="checkbox"
                                            class="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                                        <span
                                            class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Mode
                                            Persistant (Bloquant)</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Preview Area -->
                <div
                    class="flex flex-col justify-center items-center gap-6 p-8 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-3xl border-2 border-dashed border-indigo-200 dark:border-indigo-800/50">
                    <div class="text-center space-y-2">
                        <p class="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">Prêt à tester ?
                        </p>
                        <p class="text-xs text-slate-500 leading-relaxed px-4">Utilisez le bouton ci-dessous pour
                            déclencher la notification avec vos paramètres.</p>
                    </div>
                    <Button size="lg" severity="primary" icon="heroicons:paper-airplane" @click="triggerToast"
                        class="shadow-xl shadow-indigo-500/20">
                        Déclencher le Toast
                    </Button>
                    <button @click="toast.clear()"
                        class="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        Tout effacer
                    </button>
                </div>
            </div>

            <!-- Generated Code Preview -->
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Icon name="heroicons:code-bracket" size="xs" />
                        Code de configuration
                    </h3>
                    <button @click="copyCode"
                        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all active:scale-95">
                        <Icon :name="isCopied ? 'heroicons:check-badge' : 'heroicons:clipboard-document'" size="xs" />
                        {{ isCopied ? 'Copié !' : 'Copier le code' }}
                    </button>
                </div>
                <div
                    class="bg-slate-950 rounded-2xl p-6 border border-white/5 shadow-2xl relative group overflow-hidden">
                    <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px] pointer-events-none">
                    </div>
                    <pre
                        class="text-xs leading-relaxed font-mono"><code class="text-indigo-300">{{ generatedCode }}</code></pre>
                </div>
            </div>
        </section>

        <!-- Basic Usage (Quick Shortcuts) -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Raccourcis Rapides</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button severity="secondary" variant="soft" block @click="showBasic">Message Simple</Button>
                <Button severity="success" variant="soft" block @click="showSuccess">Mise à jour Réussie</Button>
                <Button severity="info" variant="soft" block @click="showAction">Alerte avec Action</Button>
                <Button severity="danger" variant="soft" block
                    @click="toast.error('Échec de la connexion', 'Vérifiez vos identifiants et réessayez.')">Échec
                    Système</Button>
                <Button severity="warning" variant="soft" block @click="showInfinity">Attention (Persistant)</Button>
                <Button severity="contrast" variant="soft" block
                    @click="toast.add({ title: 'Mode Nuit Activé', severity: 'contrast' })">Notification
                    Contrastée</Button>
            </div>
        </section>

        <!-- Usage Code -->
        <section class="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-2xl font-bold">Installation & Usage</h2>

            <div class="space-y-6">
                <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">1. Provider Global
                    </p>
                    <div class="bg-slate-950 rounded-2xl p-6 border border-white/5 shadow-2xl">
                        <pre class="text-xs leading-relaxed"><code class="text-indigo-300">&lt;template&gt;
  &lt;ToastProvider&gt;
    &lt;App /&gt;
    &lt;!-- Les notifications seront rendues ici --&gt;
  &lt;/ToastProvider&gt;
&lt;/template&gt;</code></pre>
                    </div>
                </div>

                <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">2. Déclenchement via
                        Composable</p>
                    <div class="bg-slate-950 rounded-2xl p-6 border border-white/5 shadow-2xl">
                        <pre class="text-xs leading-relaxed"><code class="text-indigo-300">import { useToast } from '@webmx/ui'

const toast = useToast()

// Raccourci succès
toast.success('Félicitations !', 'Compte créé avec succès.')

// Configuration complète
toast.add({
  title: 'Information',
  description: 'Un nouvel article est en ligne.',
  position: 'bottom-right',
  severity: 'info',
  duration: 3000,
  avatar: 'https://github.com/benjamincanac.png'
})</code></pre>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between mb-4">
                        <p class="text-sm text-slate-600 dark:text-slate-400">Exemple complexe (Orientation & Actions) :
                        </p>
                        <div class="flex gap-2">
                            <Button size="xs" severity="secondary" @click="toast.add({
                                title: 'Uh oh! Something went wrong.',
                                description: 'There was a problem with your request.',
                                actions: [{ label: 'Retry', onClick: () => console.log('Retry') }],
                                orientation: 'horizontal'
                            })">Horizontal</Button>
                            <Button size="xs" severity="secondary" @click="toast.add({
                                title: 'Uh oh! Something went wrong.',
                                description: 'There was a problem with your request.',
                                actions: [
                                    { label: 'Retry', icon: 'heroicons:arrow-path', onClick: () => console.log('Retry') },
                                    { label: 'Cancel', variant: 'ghost', color: 'neutral', onClick: () => console.log('Cancel') }
                                ],
                                orientation: 'vertical'
                            })">Vertical</Button>
                        </div>
                    </div>
                </div>

                <div>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Planification d'événement (Usage Lucide)
                        :</p>
                    <div
                        class="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-between gap-8">
                        <div class="space-y-1">
                            <p class="font-bold text-slate-900 dark:text-white">Planification d'événement</p>
                            <p class="text-sm text-slate-500">Ajoutez dynamiquement des dates au calendrier.</p>
                        </div>
                        <Button variant="outlined" icon="heroicons:plus" @click="addToCalendar" size="sm">
                            Ajouter au calendrier
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <!-- API Reference -->
        <section class="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-bold font-black">API Reference</h2>

            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:list-bullet" class="text-indigo-500" />
                    Options du Toast (ToastOptions)
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/10 border-b border-inherit">
                            <tr>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Propriété</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Type</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Défaut</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">title</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">description</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">severity</td>
                                <td class="px-6 py-4 text-slate-500 italic">default | success | danger | warning | info
                                </td>
                                <td class="px-6 py-4 text-slate-500">'default'</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">position</td>
                                <td class="px-6 py-4 text-slate-500 italic">ToastPosition</td>
                                <td class="px-6 py-4 text-slate-500">'top-right'</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">avatar</td>
                                <td class="px-6 py-4 text-slate-500 italic">string (URL)</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">duration</td>
                                <td class="px-6 py-4 text-slate-500 italic">number</td>
                                <td class="px-6 py-4 text-slate-500">5000</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">closable</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">true</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">progress</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean | { color?: string }</td>
                                <td class="px-6 py-4 text-slate-500">true</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">orientation</td>
                                <td class="px-6 py-4 text-slate-500 italic">'horizontal' | 'vertical'</td>
                                <td class="px-6 py-4 text-slate-500">'horizontal'</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">actions</td>
                                <td class="px-6 py-4 text-slate-500 italic">Array&lt;Action&gt;</td>
                                <td class="px-6 py-4 text-slate-500">-</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">type</td>
                                <td class="px-6 py-4 text-slate-500 italic">'foreground' | 'background'</td>
                                <td class="px-6 py-4 text-slate-500">'foreground'</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">preventClose</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Slots -->
        <section class="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:square-3-stack-3d" class="text-indigo-500" />
                    Slots
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/10 border-b border-inherit">
                            <tr>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Nom</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Scope</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">leading</td>
                                <td class="px-6 py-4 text-slate-500 italic">{ ui: { severity: string } }</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">title</td>
                                <td class="px-6 py-4 text-slate-500 italic">{}</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">description</td>
                                <td class="px-6 py-4 text-slate-500 italic">{}</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">actions</td>
                                <td class="px-6 py-4 text-slate-500 italic">{}</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">close</td>
                                <td class="px-6 py-4 text-slate-500 italic">{ ui: { closable: boolean, forceClose:
                                    Function } }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Emits -->
        <section class="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:bolt" class="text-indigo-500" />
                    Événements (Emits)
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/10 border-b border-inherit">
                            <tr>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Événement</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Type / Arguments</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">pause</td>
                                <td class="px-6 py-4 text-slate-500">[]</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">resume</td>
                                <td class="px-6 py-4 text-slate-500">[]</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">escapeKeyDown</td>
                                <td class="px-6 py-4 text-slate-500">[event: KeyboardEvent]</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">swipeStart</td>
                                <td class="px-6 py-4 text-slate-500">[event: TouchEvent]</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">swipeMove</td>
                                <td class="px-6 py-4 text-slate-500">[event: TouchEvent]</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">swipeCancel</td>
                                <td class="px-6 py-4 text-slate-500">[event: TouchEvent]</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">swipeEnd</td>
                                <td class="px-6 py-4 text-slate-500">[event: SwipeEvent]</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">update:open</td>
                                <td class="px-6 py-4 text-slate-500">[value: boolean]</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Expose -->
        <section class="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:eye" class="text-indigo-500" />
                    Expose
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/10 border-b border-inherit">
                            <tr>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Propriété</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Type</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">height</td>
                                <td class="px-6 py-4 text-slate-500 italic">Ref&lt;number&gt;</td>
                                <td class="px-6 py-4 text-slate-500">Hauteur réelle du toast calculée dynamiquement
                                    (px).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Configuration Globale -->
        <section class="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-black">Configuration Globale</h2>
            <p class="text-slate-600 dark:text-slate-400">Configurez les défauts de vos Toasts au niveau de
                l'application.</p>

            <div class="space-y-10">
                <!-- NuxtJS -->
                <div class="space-y-4">
                    <h3 class="text-lg font-bold flex items-center gap-2">
                        <Icon name="logos:nuxt-icon" size="sm" />
                        Usage avec NuxtJS
                    </h3>
                    <div
                        class="bg-slate-950 rounded-2xl p-6 border border-white/5 shadow-2xl relative group overflow-hidden">
                        <div
                            class="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] pointer-events-none">
                        </div>
                        <pre class="text-xs leading-relaxed font-mono"><code class="text-emerald-300">// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@webmx/ui'],
  webflowUi: {
    toaster: {
      max: 5
    },
    toast: {
      duration: 3000,
      position: 'bottom-right'
    }
  }
})</code></pre>
                    </div>
                </div>

                <!-- ViteJS -->
                <div class="space-y-4">
                    <h3 class="text-lg font-bold flex items-center gap-2">
                        <Icon name="logos:vitejs" size="sm" />
                        Usage avec Vite / Vue
                    </h3>
                    <div
                        class="bg-slate-950 rounded-2xl p-6 border border-white/5 shadow-2xl relative group overflow-hidden">
                        <div
                            class="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-[80px] pointer-events-none">
                        </div>
                        <pre class="text-xs leading-relaxed font-mono"><code class="text-amber-300">// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.provide('webmx-config', {
  toaster: { max: 10 },
  toast: { severity: 'primary' }
})

app.mount('#app')</code></pre>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
