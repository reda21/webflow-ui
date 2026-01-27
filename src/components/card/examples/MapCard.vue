<script setup lang="ts">
import { Card, Button, Icon } from '../../../index'

const props = defineProps<{
    location: {
        city: string
        address: string
        lat: number
        lng: number
        price?: string
    }
}>()
</script>

<template>
    <Card class="w-full max-w-[350px] overflow-hidden group" padding="none">
        <div class="h-48 w-full bg-slate-200 dark:bg-slate-800 relative">
            <!-- Simulated Mapbox UI -->
            <iframe class="w-full h-full grayscale-[0.5] contrast-[1.1] pointer-events-none"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d2.3522!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sfr!4v1"
                frameborder="0"></iframe>

            <div class="absolute top-4 left-4">
                <div
                    class="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-xs font-bold flex items-center gap-1.5">
                    <Icon name="heroicons:map-pin" class="text-rose-500" />
                    {{ location.city }}
                </div>
            </div>

            <div v-if="location.price" class="absolute bottom-4 right-4">
                <div class="px-2 py-1.5 bg-indigo-600 text-white rounded-lg shadow-xl text-sm font-black">
                    {{ location.price }}
                </div>
            </div>
        </div>

        <div class="p-4 space-y-3">
            <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">{{ location.address }}</h3>
                <p class="text-xs text-slate-500">Paris, Île-de-France, France</p>
            </div>

            <div class="flex items-center gap-2">
                <Button severity="primary" size="sm" class="flex-1">Naviguer</Button>
                <Button variant="outlined" size="sm" icon="heroicons:share" />
            </div>
        </div>
    </Card>
</template>
