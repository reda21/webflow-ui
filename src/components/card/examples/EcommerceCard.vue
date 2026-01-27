<script setup lang="ts">
import { Card, Button, Icon } from '../../../index'
import { ref } from 'vue'

const props = defineProps<{
    product: {
        id: number
        name: string
        price: number
        rating: number
        image: string
        stock: number
        category: string
    }
}>()

const isFavorited = ref(false)
const loading = ref(false)

const emit = defineEmits<{
    'quick-view': [product: any]
}>()

const addToCart = () => {
    loading.value = true
    setTimeout(() => loading.value = false, 1500)
}
</script>

<template>
    <Card class="w-full max-w-[300px]" :image="product.image" hover="raise"
        :badge="product.stock < 5 ? 'Vente flash !' : undefined" :price="product.price" :rating="product.rating"
        double-tap-to-like>

        <div class="absolute top-2 left-2 z-20">
            <Button variant="glass" size="xs" icon="heroicons:eye" rounded="full"
                class="scale-0 group-hover:scale-100 transition-transform duration-300"
                @click="emit('quick-view', product)" />
        </div>
        <template #header>
            <div class="flex items-start justify-between">
                <div>
                    <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider">{{ product.category
                        }}</span>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-snug">{{ product.name }}</h3>
                </div>
            </div>
        </template>

        <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-2">
            Un produit premium conçu pour répondre à tous vos besoins avec style et performance.
        </p>

        <div class="mt-4 flex items-center gap-2">
            <div v-if="product.stock > 0" class="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                En stock ({{ product.stock }})
            </div>
            <div v-else class="flex items-center gap-1.5 text-xs font-medium text-rose-500">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                En rupture de stock
            </div>
        </div>

        <template #footer>
            <div class="flex items-center gap-2 w-full">
                <Button :loading="loading" severity="primary" icon="heroicons:shopping-cart" block @click="addToCart">
                    Acheter
                </Button>
                <Button variant="ghost" :severity="isFavorited ? 'danger' : 'secondary'"
                    :icon="isFavorited ? 'heroicons:heart-solid' : 'heroicons:heart'"
                    @click="isFavorited = !isFavorited" />
            </div>
        </template>
    </Card>
</template>
