<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardGroup, Button, Icon } from '@/index'
import type { CardVariant, CardShadow, CardPadding } from '@/components/card/types'
import EcommerceCard from '@/components/card/examples/EcommerceCard.vue'
import SocialCard from '@/components/card/examples/SocialCard.vue'
import DashboardCard from '@/components/card/examples/DashboardCard.vue'
import ChartCard from '@/components/card/examples/ChartCard.vue'
import VideoCard from '@/components/card/examples/VideoCard.vue'
import MapCard from '@/components/card/examples/MapCard.vue'
import CardQuickView from '@/components/card/examples/CardQuickView.vue'
import ThreeCard from '@/components/card/examples/ThreeCard.vue'
import CollaborativeCard from '@/components/card/examples/CollaborativeCard.vue'
import ThemedCard from '@/components/card/examples/ThemedCard.vue'

// Configurator State
const title = ref('Premium Design')
const subtitle = ref('Built for performance')
const variant = ref<CardVariant>('default')
const shadow = ref<CardShadow>('md')
const padding = ref<CardPadding>('md')
const hover = ref<any>('scale')
const showImage = ref(true)
const scrollable = ref(false)

const quickViewRef = ref<any>(null)
const selectedProduct = ref({
    name: 'Air Pulse Headphones',
    price: 299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    description: 'Une expérience sonore immersive avec réduction de bruit active et autonomie de 40 heures.',
    stock: 5
})

const openQuickView = (product: any) => {
    selectedProduct.value = {
        ...product,
        description: 'Une expérience sonore immersive avec réduction de bruit active et autonomie de 40 heures.'
    }
    quickViewRef.value?.open()
}

const variantOptions: CardVariant[] = ['default', 'outlined', 'ghost', 'glass', 'soft', 'gradient']
const shadowOptions: CardShadow[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner']
const paddingOptions: CardPadding[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl']
const hoverOptions = [
    { label: 'None', value: false },
    { label: 'Scale', value: 'scale' },
    { label: 'Raise', value: 'raise' },
    { label: 'Glow', value: 'glow' }
]

const cardCodeExample = computed(() => {
    let props = ''
    if (title.value) props += `\n    title="${title.value}"`
    if (subtitle.value) props += `\n    subtitle="${subtitle.value}"`
    if (variant.value !== 'default') props += `\n    variant="${variant.value}"`
    if (shadow.value !== 'md') props += `\n    shadow="${shadow.value}"`
    if (padding.value !== 'md') props += `\n    padding="${padding.value}"`
    if (hover.value) props += `\n    hover="${hover.value}"`
    if (showImage.value) props += `\n    image="https://picsum.photos/400/200"`
    if (scrollable.value) props += `\n    scrollable`

    return `<Card${props}\n>\n    <p>Your content here...</p>\n</Card>`
})
</script>

<template>
    <div class="space-y-12">
        <!-- Hero Section -->
        <section>
            <div class="flex items-center gap-3 mb-2">
                <span
                    class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
                <span
                    class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
            </div>
            <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Card</h1>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Un composant de conteneur premium hautement flexible pour grouper du contenu connexe. Supporte plusieurs
                variantes, ombres, et animations au survol.
            </p>
        </section>

        <!-- Interactive Playground -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Icon name="heroicons:play" class="text-indigo-500" />
                Playground Interactif
            </h2>

            <div
                class="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                <!-- Configurator Controls -->
                <div
                    class="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Title & Subtitle -->
                    <div class="space-y-4">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Titre</label>
                            <input v-model="title" type="text"
                                class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Sous-titre</label>
                            <input v-model="subtitle" type="text"
                                class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>

                    <!-- Variant & Shadow -->
                    <div class="space-y-4">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Variante</label>
                            <select v-model="variant"
                                class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option v-for="opt in variantOptions" :key="opt">{{ opt }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Ombre</label>
                            <select v-model="shadow"
                                class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option v-for="opt in shadowOptions" :key="opt">{{ opt }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Padding & Hover -->
                    <div class="space-y-4">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Padding</label>
                            <select v-model="padding"
                                class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option v-for="opt in paddingOptions" :key="opt">{{ opt }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Hover
                                Effect</label>
                            <select v-model="hover"
                                class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option v-for="opt in hoverOptions" :key="opt.label" :value="opt.value">{{ opt.label }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Switches -->
                    <div class="flex flex-col justify-center gap-4">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input v-model="showImage" type="checkbox"
                                class="w-4 h-4 text-indigo-600 rounded border-slate-300 dark:border-slate-700 focus:ring-indigo-500" />
                            <span
                                class="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors">Afficher
                                une image</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input v-model="scrollable" type="checkbox"
                                class="w-4 h-4 text-indigo-600 rounded border-slate-300 dark:border-slate-700 focus:ring-indigo-500" />
                            <span
                                class="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors">Corps
                                scrollable</span>
                        </label>
                    </div>
                </div>

                <!-- Preview Area -->
                <div class="p-12 flex items-center justify-center bg-slate-100 dark:bg-slate-950/50 min-h-[300px]">
                    <div class="w-full max-w-sm">
                        <Card :title="title" :subtitle="subtitle" :variant="variant" :shadow="shadow" :padding="padding"
                            :hover="hover"
                            :image="showImage ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' : undefined"
                            :scrollable="scrollable" class="transition-all duration-300"
                            :class="{ 'h-64': scrollable }">
                            <p class="text-slate-600 dark:text-slate-400">
                                Le contenu de votre carte s'adapte automatiquement à vos réglages.
                                <template v-if="scrollable">
                                    <br><br>
                                    Ceci est un exemple de contenu long pour tester le défilement interne de la carte.
                                    Vous pouvez ajouter autant de texte que vous le souhaitez ici sans briser la mise en
                                    page.
                                </template>
                            </p>
                            <template #footer>
                                <Button severity="primary" size="sm" block>Action principale</Button>
                            </template>
                        </Card>
                    </div>
                </div>

                <!-- Code Section -->
                <div class="bg-slate-900 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Code Preview</span>
                        <Button variant="ghost" size="xs" severity="contrast" icon="heroicons:clipboard-document"
                            @click="() => { }">Copier</Button>
                    </div>
                    <pre class="text-sm text-indigo-300 overflow-x-auto"><code>{{ cardCodeExample }}</code></pre>
                </div>
            </div>
        </section>

        <!-- Exemples de base -->
        <section class="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Icon name="heroicons:square-3-stack-3d" class="text-indigo-500" />
                Variantes de base
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Default -->
                <Card title="Card par défaut" subtitle="Variante standard">
                    <p class="text-slate-600 dark:text-slate-400">
                        La carte standard avec une bordure fine et une ombre légère.
                    </p>
                    <template #footer>
                        <Button variant="ghost" size="sm">En savoir plus</Button>
                    </template>
                </Card>

                <!-- Outlined -->
                <Card variant="outlined" title="Bordures accentuées" subtitle="Variante outlined">
                    <p class="text-slate-600 dark:text-slate-400">
                        Idéal pour les interfaces épurées avec des séparations marquées.
                    </p>
                </Card>

                <!-- Soft -->
                <Card variant="soft" title="Style Doux" subtitle="Variante soft">
                    <p class="text-slate-600 dark:text-slate-400">
                        Utilise une couleur de fond subtile au lieu d'une bordure.
                    </p>
                </Card>
            </div>
        </section>

        <!-- Glass & Gradients -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Icon name="heroicons:sparkles" class="text-indigo-500" />
                Effets Premium
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-8 bg-slate-900 rounded-3xl">
                <!-- Glass -->
                <Card variant="glass" title="Glassmorphism" subtitle="Effet de transparence">
                    <p class="text-slate-300">
                        Supporte le flou d'arrière-plan natif avec une bordure lumineuse subtile.
                    </p>
                    <template #footer>
                        <Button severity="contrast" size="sm">Découvrir</Button>
                    </template>
                </Card>

                <!-- Gradient -->
                <Card variant="gradient" title="Gradients Dynamiques" subtitle="Couleurs vives">
                    <p class="text-indigo-50">
                        Idéal pour mettre en avant des offres spéciales ou des actions prioritaires.
                    </p>
                    <template #footer>
                        <Button variant="outlined" severity="contrast" size="sm"
                            class="!border-white/40 !text-white">Action</Button>
                    </template>
                </Card>
            </div>
        </section>

        <!-- Images & Content -->
        <section class="space-y-6">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Icon name="heroicons:photo" class="text-indigo-500" />
                Images et Contenu
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                    image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                    title="Design Abstrait" subtitle="Inspiré par la nature" hover="scale">
                    <p class="text-slate-600 dark:text-slate-400 line-clamp-2">
                        Les images d'en-tête s'intègrent parfaitement et supportent des effets de zoom au survol.
                    </p>
                    <template #footer>
                        <div class="flex items-center gap-2">
                            <Icon name="heroicons:heart" class="text-rose-500" />
                            <span class="text-sm font-medium">124 Likes</span>
                        </div>
                    </template>
                </Card>

                <Card title="Gestion du Scroll" subtitle="Contenu long" scrollable padding="lg" class="h-[250px]">
                    <div class="space-y-4">
                        <p v-for="i in 5" :key="i" class="text-slate-600 dark:text-slate-400 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore
                            et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                    </div>
                </Card>
            </div>
        </section>

        <!-- Animations -->
        <section class="space-y-6 text-center py-12 border-y border-slate-200 dark:border-slate-800">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Effets de survol (Hover)</h2>
            <div class="flex flex-wrap justify-center gap-6 pt-4">
                <Card title="Scale" hover="scale" class="w-64 text-left" />
                <Card title="Raise" hover="raise" class="w-64 text-left" />
                <Card title="Glow" hover="glow" class="w-64 text-left border-indigo-500" />
            </div>
        </section>

        <!-- Use Cases Section -->
        <section class="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Cas d'Usage Réels</h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- E-commerce Use Case -->
                <div class="space-y-4">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <Icon name="heroicons:shopping-bag" class="text-indigo-500" />
                        E-commerce
                    </h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">
                        Product card avec badge promotionnel, prix formaté, rating et système de wishlist.
                    </p>
                    <div class="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl flex justify-center">
                        <EcommerceCard :product="{
                            id: 1,
                            name: 'Air Pulse Headphones',
                            price: 299,
                            rating: 4,
                            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
                            stock: 3,
                            category: 'Audio'
                        }" @quick-view="openQuickView" />
                    </div>
                </div>

                <CardQuickView ref="quickViewRef" :item="selectedProduct" />

                <!-- Dashboard Use Case -->
                <div class="space-y-4">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <Icon name="heroicons:chart-bar" class="text-indigo-500" />
                        Dashboard
                    </h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">
                        Metric card utilisant le glassmorphism pour afficher des indicateurs de performance.
                    </p>
                    <div class="grid grid-cols-1 gap-4 p-8 bg-slate-900 rounded-3xl">
                        <DashboardCard :metric="{
                            label: 'Revenus Totaux',
                            value: '€45,230',
                            trend: 12.5,
                            icon: 'heroicons:banknotes',
                            color: '#10b981'
                        }" />
                        <DashboardCard :metric="{
                            label: 'Nouveaux Clients',
                            value: '1,284',
                            trend: -2.4,
                            icon: 'heroicons:users',
                            color: '#6366f1'
                        }" />
                    </div>
                </div>
            </div>

            <!-- Social Media Use Case -->
            <div class="space-y-4">
                <h3 class="text-xl font-bold flex items-center gap-2">
                    <Icon name="heroicons:user-group" class="text-indigo-500" />
                    Médias Sociaux
                </h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm">
                    Post card avec carrousel d'images, interactions (like/comment) et profil utilisateur.
                </p>
                <div class="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl flex justify-center">
                    <SocialCard :user="{
                        name: 'Sarah Anderson',
                        username: 'sarah_dev',
                        avatar: 'https://i.pravatar.cc/150?u=sarah'
                    }" :post="{
                        content: 'Exploration des nouveaux composants UI de @webmx ! Le mode glassmorphism est incroyable. ✨ #webdev #vuejs #uiux',
                        images: [
                            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
                        ],
                        likes: 842,
                        comments: 31,
                        date: '2h'
                    }" />
                </div>
            </div>
        </section>

        <!-- Performance Section -->
        <section class="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Icon name="heroicons:bolt" class="text-amber-500" />
                Performance & Optimisation
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-4">
                    <h3 class="text-xl font-bold">Code Splitting</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">
                        Le composant <code class="text-indigo-500">Card</code> utilise <code
                            class="text-indigo-500">defineAsyncComponent</code> pour les fonctionnalités lourdes comme
                        le
                        carrousel d'images et le squelette de chargement. Ces ressources ne sont chargées que si la prop
                        correspondante est active.
                    </p>
                </div>

                <div class="space-y-4">
                    <h3 class="text-xl font-bold">Virtualisation (CardGroup)</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">
                        Pour les listes contenant des centaines de cartes, utilisez <code
                            class="text-indigo-500">CardGroup</code> avec l'attribut <code
                            class="text-indigo-500">virtual</code>. Il utilise <code
                            class="text-indigo-500">IntersectionObserver</code> pour ne rendre le contenu que lorsqu'il
                        approche
                        de la zone visible.
                    </p>
                </div>
            </div>

            <div
                class="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 class="font-bold mb-4 flex items-center gap-2">Exemple de virtualisation</h4>
                <div class="h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    <CardGroup :items="Array.from({ length: 100 }, (_, i) => ({ id: i, title: `Card #${i + 1}` }))"
                        :columns="2" virtual>
                        <template #default="{ item }">
                            <Card :title="item.title" subtitle="Contenu virtualisé" hover="raise" />
                        </template>
                    </CardGroup>
                </div>
            </div>
        </section>

        <!-- Dynamic Integration Section -->
        <section class="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Intégrations & Bibliothèques</h2>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Chart Card -->
                <div class="space-y-4">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <Icon name="heroicons:presentation-chart-line" class="text-emerald-500" />
                        Chart.js
                    </h3>
                    <ChartCard title="Ventes hebdomadaires" value="€12,480" :data="[40, 60, 45, 80, 50, 90, 70]"
                        color="#10b981" />
                </div>

                <!-- Video Card -->
                <div class="space-y-4">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <Icon name="heroicons:video-camera" class="text-rose-500" />
                        Vidéo
                    </h3>
                    <VideoCard :video="{
                        title: 'Explorer le futur de l\'UI Design avec WebMX',
                        views: '2.4M',
                        duration: '12:45',
                        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
                        author: 'WebMX Team',
                        authorAvatar: 'https://i.pravatar.cc/150?u=webmx',
                        date: 'il y a 3 jours'
                    }" />
                </div>

                <!-- Map Card -->
                <div class="space-y-4">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <Icon name="heroicons:map" class="text-indigo-500" />
                        Cartes / Mapbox
                    </h3>
                    <MapCard :location="{
                        city: 'Paris',
                        address: '75001 Rue de Rivoli',
                        lat: 48.8566,
                        lng: 2.3522,
                        price: '€1,200/nuit'
                    }" />
                </div>
            </div>
        </section>

        <!-- Advanced Features Section -->
        <section class="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Icon name="heroicons:rocket-launch" class="text-indigo-500" />
                Fonctionnalités Avancées
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Three.js Integration -->
                <div class="space-y-4">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <Icon name="heroicons:cube" size="lg" class="text-indigo-500" />
                        Expériences 3D (Three.js)
                    </h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">
                        Rendu WebGL temps réel pour des présentations de produits 3D interactives directement dans la
                        carte.
                    </p>
                    <div class="p-8 bg-slate-900 rounded-3xl flex justify-center">
                        <ThreeCard title="Prototype 3D v1" color="#818cf8" />
                    </div>
                </div>

                <!-- Collaborative Feature -->
                <div class="space-y-4">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <Icon name="heroicons:chat-bubble-left-right" size="lg" class="text-indigo-500" />
                        Collaboration & Annotations
                    </h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">
                        Système de commentaires intégré avec présence utilisateur en temps réel et historique.
                    </p>
                    <div class="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl flex justify-center">
                        <CollaborativeCard />
                    </div>
                </div>
            </div>

            <!-- Theming Section -->
            <div class="space-y-4">
                <h3 class="text-xl font-bold flex items-center gap-2">
                    <Icon name="heroicons:swatch" size="lg" class="text-indigo-500" />
                    Thèmes Dynamiques & Saisonniers
                </h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
                    Changement dynamique de thème basé sur des variables CSS, permettant des adaptations saisonnières ou
                    personnalisées par l'utilisateur sans rechargement.
                </p>
                <div class="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl">
                    <ThemedCard :card="{
                        title: 'WebMX Premium Pack',
                        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop'
                    }" />
                </div>
            </div>
        </section>

        <!-- API Section -->
        <section class="space-y-8">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">API Reference</h2>

            <!-- Props -->
            <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center gap-2">
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
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">title</td>
                                <td class="px-4 py-3 text-slate-500">string</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Titre de la carte.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">subtitle</td>
                                <td class="px-4 py-3 text-slate-500">string</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">Sous-titre affiché sous le titre.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">variant</td>
                                <td class="px-4 py-3 text-slate-500">default | outlined | ghost | glass | soft |
                                    gradient</td>
                                <td class="px-4 py-3 text-slate-500">'default'</td>
                                <td class="px-4 py-3">Style visuel de la carte.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">shadow</td>
                                <td class="px-4 py-3 text-slate-500">none | sm | md | lg | xl | 2xl</td>
                                <td class="px-4 py-3 text-slate-500">'md'</td>
                                <td class="px-4 py-3">Niveau d'ombre portée.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">padding</td>
                                <td class="px-4 py-3 text-slate-500">none | xs | sm | md | lg | xl</td>
                                <td class="px-4 py-3 text-slate-500">'md'</td>
                                <td class="px-4 py-3">Marges internes du corps.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">image</td>
                                <td class="px-4 py-3 text-slate-500">string</td>
                                <td class="px-4 py-3 text-slate-500">-</td>
                                <td class="px-4 py-3">URL d'une image d'en-tête.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">hover</td>
                                <td class="px-4 py-3 text-slate-500">boolean | 'scale' | 'raise' | 'glow'</td>
                                <td class="px-4 py-3 text-slate-500">false</td>
                                <td class="px-4 py-3">Effet visuel lors du survol.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">scrollable</td>
                                <td class="px-4 py-3 text-slate-500">boolean</td>
                                <td class="px-4 py-3 text-slate-500">false</td>
                                <td class="px-4 py-3">Permet le scroll vertical si le contenu est trop long.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Slots -->
            <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center gap-2">
                    <Icon name="heroicons:rectangle-group" class="text-indigo-500" />
                    Slots
                </h3>
                <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th class="px-4 py-3 font-semibold">Nom</th>
                                <th class="px-4 py-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">default</td>
                                <td class="px-4 py-3">Corps principal de la carte.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">header</td>
                                <td class="px-4 py-3">Remplace l'en-tête complet (titre + sous-titre).</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">title</td>
                                <td class="px-4 py-3">Personnalisation du titre.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">footer</td>
                                <td class="px-4 py-3">Pied de page pour les actions.</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-mono text-indigo-400 font-bold">image</td>
                                <td class="px-4 py-3">Remplace l'élément image par défaut.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>
