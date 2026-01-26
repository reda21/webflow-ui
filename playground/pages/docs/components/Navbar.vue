<script setup lang="ts">
import { ref, computed } from 'vue'
import { Navbar, Button, Icon, Card, Avatar, type NavItem } from '@/index'

// Basic demo nav items
const basicNavItems = ref<NavItem[]>([
    { label: 'Accueil', href: '#', active: true },
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
])

// Extended nav items with icons and badges
const extendedNavItems = ref<NavItem[]>([
    { label: 'Dashboard', href: '#', icon: 'heroicons:home', active: true },
    { label: 'Projets', href: '#', icon: 'heroicons:folder', badge: 3 },
    { label: 'Équipe', href: '#', icon: 'heroicons:users' },
    { label: 'Documentation', href: '#', icon: 'heroicons:book-open', external: true },
])

// Config state for playground
const configBrandName = ref('WebMX')
const configVariant = ref<'default' | 'minimal' | 'centered'>('default')
const configSize = ref<'sm' | 'md' | 'lg'>('md')
const configSticky = ref(false)
const configBlur = ref(true)
const configTransparent = ref(false)
const configShowSearch = ref(true)
const configShowThemeToggle = ref(true)
const configCtaText = ref('Get Started')
const configIsDark = ref(false)

const variants = ['default', 'minimal', 'centered'] as const
const sizes = ['sm', 'md', 'lg'] as const

// Code generator
const isCopied = ref(false)
const generatedCode = computed(() => {
    let code = `<Navbar`
    if (configBrandName.value !== 'WebFlow') code += `\n  brand-name="${configBrandName.value}"`
    if (configVariant.value !== 'default') code += `\n  variant="${configVariant.value}"`
    if (configSize.value !== 'md') code += `\n  size="${configSize.value}"`
    if (configSticky.value) code += `\n  sticky`
    if (!configBlur.value) code += `\n  :blur="false"`
    if (configTransparent.value) code += `\n  transparent`
    if (!configShowSearch.value) code += `\n  :show-search="false"`
    if (!configShowThemeToggle.value) code += `\n  :show-theme-toggle="false"`
    if (configCtaText.value) code += `\n  cta-text="${configCtaText.value}"`
    code += `\n  :nav-items="navItems"`
    code += `\n/>`
    return code
})

const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    isCopied.value = true
    setTimeout(() => isCopied.value = false, 2000)
}

// Fullscreen preview
const isFullscreen = ref(false)
const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
    if (isFullscreen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
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
                    class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
            </div>
            <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Navbar</h1>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Barre de navigation responsive et personnalisable avec support du dark mode, menu mobile,
                et sections configurables (start, center, end).
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
                    <!-- Brand Name -->
                    <div class="space-y-2">
                        <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nom de la
                            marque</label>
                        <input v-model="configBrandName" type="text"
                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <!-- Variant -->
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Variante</label>
                            <select v-model="configVariant"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="v in variants" :key="v" :value="v">{{ v }}</option>
                            </select>
                        </div>

                        <!-- Size -->
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Taille</label>
                            <select v-model="configSize"
                                class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                <option v-for="s in sizes" :key="s" :value="s">{{ s }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- CTA Text -->
                    <div class="space-y-2">
                        <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Texte CTA</label>
                        <input v-model="configCtaText" type="text" placeholder="Ex: Get Started"
                            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none" />
                    </div>

                    <!-- Checkboxes -->
                    <div class="flex flex-wrap gap-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="configSticky" type="checkbox"
                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span
                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Sticky</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="configBlur" type="checkbox"
                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span
                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Blur</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="configTransparent" type="checkbox"
                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span
                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Transparent</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="configShowSearch" type="checkbox"
                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span
                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Search</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="configShowThemeToggle" type="checkbox"
                                class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span
                                class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Theme
                                Toggle</span>
                        </label>
                    </div>
                </div>

                <!-- Preview -->
                <div
                    class="flex flex-col gap-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-3xl border-2 border-dashed border-indigo-200 dark:border-indigo-800/50 overflow-hidden">
                    <div class="text-center pt-4">
                        <p class="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">Aperçu</p>
                    </div>

                    <div class="flex-1">
                        <Navbar :brand-name="configBrandName" :variant="configVariant" :size="configSize"
                            :sticky="configSticky" :blur="configBlur" :transparent="configTransparent"
                            :show-search="configShowSearch" :show-theme-toggle="configShowThemeToggle"
                            :cta-text="configCtaText" :nav-items="basicNavItems" :is-dark="configIsDark" />
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

        <!-- Basic Usage -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Utilisation de base</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Le composant Navbar offre une barre de navigation complète avec logo, liens, recherche et bouton CTA.
            </p>
            <Card variant="soft" padding="none" class="overflow-hidden border border-slate-200 dark:border-slate-800">
                <div class="bg-white dark:bg-slate-900">
                    <Navbar brand-name="MonApp" :nav-items="basicNavItems" :show-search="true" :show-theme-toggle="true"
                        cta-text="Inscription" />
                </div>
                <div class="bg-slate-950 p-6 border-t border-slate-800">
                    <pre class="text-xs leading-relaxed font-mono"><code class="text-indigo-300">&lt;Navbar
  brand-name="MonApp"
  :nav-items="navItems"
  :show-search="true"
  :show-theme-toggle="true"
  cta-text="Inscription"
/&gt;</code></pre>
                </div>
            </Card>
        </section>

        <!-- Sections personnalisables -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Sections personnalisables</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Utilisez les slots <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">start</code>,
                <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">center</code> et
                <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">end</code> pour personnaliser
                entièrement le contenu de la navbar.
            </p>

            <Card variant="soft" padding="none" class="overflow-hidden border border-slate-200 dark:border-slate-800">
                <div class="bg-white dark:bg-slate-900">
                    <Navbar>
                        <template #start>
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                                    <Icon name="heroicons:fire" class="text-white" />
                                </div>
                                <span class="text-xl font-bold text-slate-900 dark:text-white">FireApp</span>
                            </div>
                        </template>

                        <template #center>
                            <div class="flex items-center gap-6">
                                <a href="#"
                                    class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600">Produits</a>
                                <a href="#"
                                    class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600">Solutions</a>
                                <a href="#"
                                    class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600">Ressources</a>
                                <a href="#"
                                    class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600">Entreprise</a>
                            </div>
                        </template>

                        <template #end>
                            <div class="flex items-center gap-3">
                                <button class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                                    <Icon name="heroicons:bell" class="text-slate-600 dark:text-slate-300" />
                                </button>
                                <button class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                                    <Icon name="heroicons:cog-6-tooth" class="text-slate-600 dark:text-slate-300" />
                                </button>
                                <Avatar src="https://i.pravatar.cc/150?img=32" size="sm" rounded="full" />
                            </div>
                        </template>
                    </Navbar>
                </div>
                <div class="bg-slate-950 p-6 border-t border-slate-800">
                    <pre class="text-xs leading-relaxed font-mono"><code class="text-indigo-300">&lt;Navbar&gt;
            &lt;template #start&gt;
            &lt;Logo /&gt;
            &lt;span&gt;FireApp&lt;/span&gt;
            &lt;/template&gt;

            &lt;template #center&gt;
            &lt;NavLinks /&gt;
            &lt;/template&gt;

            &lt;template #end&gt;
            &lt;IconButton icon="bell" /&gt;
            &lt;IconButton icon="cog" /&gt;
            &lt;Avatar /&gt;
            &lt;/template&gt;
            &lt;/Navbar&gt;</code></pre>
                </div>
            </Card>
        </section>

        <!-- Sizes -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Tailles</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Utilisez la prop <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">size</code>
                pour ajuster la hauteur de la navbar.
            </p>
            <div class="space-y-4">
                <Card v-for="size in sizes" :key="size" variant="soft" padding="none"
                    class="overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div
                        class="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <span class="text-xs font-bold text-slate-500 uppercase">{{ size }}</span>
                    </div>
                    <div class="bg-white dark:bg-slate-900">
                        <Navbar :size="size" brand-name="WebMX" :nav-items="basicNavItems.slice(0, 3)"
                            :show-search="false" cta-text="Action" />
                    </div>
                </Card>
            </div>
        </section>

        <!-- With Icons & Badges -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Avec icônes et badges</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Les éléments de navigation peuvent contenir des icônes et des badges pour indiquer des notifications.
            </p>
            <Card variant="soft" padding="none" class="overflow-hidden border border-slate-200 dark:border-slate-800">
                <div class="bg-white dark:bg-slate-900">
                    <Navbar brand-name="Dashboard" :nav-items="extendedNavItems" :show-search="true"
                        :show-theme-toggle="true" />
                </div>
                <div class="bg-slate-950 p-6 border-t border-slate-800">
                    <pre class="text-xs leading-relaxed font-mono"><code class="text-indigo-300">const navItems = [
                    { label: 'Dashboard', href: '#', icon: 'heroicons:home', active: true },
                    { label: 'Projets', href: '#', icon: 'heroicons:folder', badge: 3 },
                    { label: 'Équipe', href: '#', icon: 'heroicons:users' },
                    { label: 'Docs', href: '#', icon: 'heroicons:book-open', external: true },
                    ]</code></pre>
                </div>
            </Card>
        </section>

        <!-- Sticky & Blur -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold">Sticky avec effet blur</h2>
            <p class="text-slate-600 dark:text-slate-400">
                Combinez <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">sticky</code> et
                <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">blur</code> pour un effet moderne.
            </p>
            <Card variant="soft" padding="none" class="overflow-hidden border border-slate-200 dark:border-slate-800">
                <div
                    class="h-48 overflow-auto bg-gradient-to-b from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
                    <Navbar sticky blur brand-name="StickyNav" :nav-items="basicNavItems.slice(0, 3)"
                        cta-text="Action" />
                    <div class="p-8 space-y-4">
                        <p class="text-slate-600 dark:text-slate-400">Scrollez pour voir l'effet sticky...</p>
                        <div v-for="i in 5" :key="i" class="h-20 bg-white/50 dark:bg-slate-800/50 rounded-xl"></div>
                    </div>
                </div>
                <div class="bg-slate-950 p-6 border-t border-slate-800">
                    <pre class="text-xs leading-relaxed font-mono"><code class="text-indigo-300">&lt;Navbar sticky blur
                    brand-name="StickyNav" /&gt;</code></pre>
                </div>
            </Card>
        </section>

        <!-- API Reference -->
        <section class="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-black">API Reference</h2>

            <!-- Props -->
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
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">brandName</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">'WebFlow'</td>
                                <td class="px-6 py-4 text-slate-500">Nom de la marque affiché</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">logoHref</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">'/'</td>
                                <td class="px-6 py-4 text-slate-500">URL du lien du logo</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">navItems</td>
                                <td class="px-6 py-4 text-slate-500 italic">NavItem[]</td>
                                <td class="px-6 py-4 text-slate-500">[]</td>
                                <td class="px-6 py-4 text-slate-500">Éléments de navigation</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">variant</td>
                                <td class="px-6 py-4 text-slate-500 italic">'default' | 'minimal' | 'centered'</td>
                                <td class="px-6 py-4 text-slate-500">'default'</td>
                                <td class="px-6 py-4 text-slate-500">Variante de style</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">size</td>
                                <td class="px-6 py-4 text-slate-500 italic">'sm' | 'md' | 'lg'</td>
                                <td class="px-6 py-4 text-slate-500">'md'</td>
                                <td class="px-6 py-4 text-slate-500">Taille de la navbar</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">sticky</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">Navbar fixe en haut</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">blur</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">true</td>
                                <td class="px-6 py-4 text-slate-500">Effet de flou (backdrop-blur)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">transparent</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">Fond transparent</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">showSearch</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">true</td>
                                <td class="px-6 py-4 text-slate-500">Afficher le bouton recherche</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">showThemeToggle</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">true</td>
                                <td class="px-6 py-4 text-slate-500">Afficher le toggle thème</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">isDark</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">false</td>
                                <td class="px-6 py-4 text-slate-500">État du mode sombre</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">ctaText</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">''</td>
                                <td class="px-6 py-4 text-slate-500">Texte du bouton CTA</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">searchPlaceholder</td>
                                <td class="px-6 py-4 text-slate-500 italic">string</td>
                                <td class="px-6 py-4 text-slate-500">'Search...'</td>
                                <td class="px-6 py-4 text-slate-500">Placeholder de la recherche</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- NavItem Type -->
            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:code-bracket-square" class="text-indigo-500" />
                    Type NavItem
                </h3>
                <div class="bg-slate-950 rounded-2xl p-6 border border-white/5">
                    <pre class="text-xs leading-relaxed font-mono"><code class="text-indigo-300">interface NavItem {
                    label: string // Texte affiché
                    href: string // URL du lien
                    active?: boolean // Item actif
                    icon?: string // Icône (format Iconify)
                    external?: boolean // Lien externe
                    badge?: string | number // Badge/notification
                    }</code></pre>
                </div>
            </div>

            <!-- Events -->
            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:bolt" class="text-indigo-500" />
                    Événements
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/10 border-b border-inherit">
                            <tr>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Événement</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Arguments</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">logo-click</td>
                                <td class="px-6 py-4 text-slate-500 italic">MouseEvent</td>
                                <td class="px-6 py-4 text-slate-500">Clic sur le logo</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">nav-click</td>
                                <td class="px-6 py-4 text-slate-500 italic">NavItem, MouseEvent</td>
                                <td class="px-6 py-4 text-slate-500">Clic sur un lien de navigation</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">search-click</td>
                                <td class="px-6 py-4 text-slate-500 italic">MouseEvent</td>
                                <td class="px-6 py-4 text-slate-500">Clic sur le bouton recherche</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">theme-toggle</td>
                                <td class="px-6 py-4 text-slate-500 italic">MouseEvent</td>
                                <td class="px-6 py-4 text-slate-500">Basculement du thème</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">cta-click</td>
                                <td class="px-6 py-4 text-slate-500 italic">MouseEvent</td>
                                <td class="px-6 py-4 text-slate-500">Clic sur le bouton CTA</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">mobile-menu-toggle</td>
                                <td class="px-6 py-4 text-slate-500 italic">boolean</td>
                                <td class="px-6 py-4 text-slate-500">Ouverture/fermeture du menu mobile</td>
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
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">start</td>
                                <td class="px-6 py-4 text-slate-500">Section gauche (logo par défaut)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">center</td>
                                <td class="px-6 py-4 text-slate-500">Section centrale (navigation par défaut)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">end</td>
                                <td class="px-6 py-4 text-slate-500">Section droite (actions par défaut)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">logo-icon</td>
                                <td class="px-6 py-4 text-slate-500">Icône personnalisée du logo</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">brand</td>
                                <td class="px-6 py-4 text-slate-500">Texte de la marque</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">nav</td>
                                <td class="px-6 py-4 text-slate-500">Liens de navigation (mode par défaut)</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">theme-icon</td>
                                <td class="px-6 py-4 text-slate-500">Icône du toggle thème</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">cta</td>
                                <td class="px-6 py-4 text-slate-500">Contenu du bouton CTA</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">mobile</td>
                                <td class="px-6 py-4 text-slate-500">Contenu complet du menu mobile</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">mobile-nav</td>
                                <td class="px-6 py-4 text-slate-500">Éléments de navigation mobile</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Exposed Methods -->
            <div class="space-y-4">
                <h3 class="text-lg font-bold flex items-center gap-2">
                    <Icon name="heroicons:cursor-arrow-rays" class="text-indigo-500" />
                    Méthodes exposées
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/10 border-b border-inherit">
                            <tr>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Méthode</th>
                                <th class="px-6 py-4 font-bold text-slate-900 dark:text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">toggleMobileMenu()</td>
                                <td class="px-6 py-4 text-slate-500">Basculer le menu mobile</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">openMobileMenu()</td>
                                <td class="px-6 py-4 text-slate-500">Ouvrir le menu mobile</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 font-mono text-indigo-500 font-bold">closeMobileMenu()</td>
                                <td class="px-6 py-4 text-slate-500">Fermer le menu mobile</td>
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
                        <span>Élément <code class="px-1 bg-slate-200 dark:bg-slate-700 rounded">&lt;nav&gt;</code>
                            sémantique</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Attribut <code class="px-1 bg-slate-200 dark:bg-slate-700 rounded">aria-label</code> sur
                            les boutons</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Support de la navigation au clavier</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Liens externes marqués avec <code
                                class="px-1 bg-slate-200 dark:bg-slate-700 rounded">rel="noopener noreferrer"</code></span>
                    </li>
                    <li class="flex items-start gap-2">
                        <Icon name="heroicons:check" size="xs" class="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Menu mobile avec transitions fluides</span>
                    </li>
                </ul>
            </Card>
        </section>
    </div>
</template>
