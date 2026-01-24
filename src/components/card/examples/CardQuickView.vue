<script setup lang="ts">
import { ref } from 'vue'
import { Modal, Button, Icon, Slider, Badge } from '@/index'

const props = defineProps<{
    item: {
        name: string
        price: number
        image: string
        description: string
        stock: number
    }
}>()

const open = ref(false)
const selectedSize = ref('M')
const quantities = ref(1)

defineExpose({
    open: () => open.value = true
})
</script>

<template>
    <Modal v-model="open" :title="item.name" size="lg" variant="bottom-sheet" :swipe-to-dismiss="true">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div class="aspect-square rounded-2xl overflow-hidden bg-slate-100">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
            </div>

            <div class="space-y-6">
                <div>
                    <h2 class="text-2xl font-black text-slate-900 dark:text-white">{{ item.name }}</h2>
                    <p class="text-3xl font-black text-indigo-600 mt-2">{{ item.price }} €</p>
                </div>

                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {{ item.description }}
                </p>

                <div class="space-y-3">
                    <span class="text-xs font-bold uppercase tracking-widest text-slate-500">Taille</span>
                    <div class="flex gap-2">
                        <button v-for="size in ['S', 'M', 'L', 'XL']" :key="size"
                            class="w-12 h-12 rounded-xl border-2 transition-all font-bold"
                            :class="[selectedSize === size ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-500 hover:border-slate-300']"
                            @click="selectedSize = size">
                            {{ size }}
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-4 pt-4">
                    <Button severity="primary" size="lg" block icon="heroicons:shopping-bag">Ajouter au panier</Button>
                </div>
            </div>
        </div>
    </Modal>
</template>
