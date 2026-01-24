<script setup lang="ts">
import { Card, Button, Icon, Avatar } from '@/index'
import { ref } from 'vue'

const props = defineProps<{
    video: {
        title: string
        views: string
        duration: string
        thumbnail: string
        author: string
        authorAvatar: string
        date: string
    }
}>()

const isPlaying = ref(false)
</script>

<template>
    <Card class="w-full max-w-[320px] overflow-hidden group" padding="none" hover="scale">
        <!-- Custom Image/Video Header -->
        <div class="relative aspect-video overflow-hidden bg-slate-900">
            <template v-if="!isPlaying">
                <img :src="video.thumbnail" :alt="video.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div
                    class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button severity="contrast" rounded="full" icon="heroicons:play-solid" size="xl"
                        class="!p-4 shadow-2xl" @click="isPlaying = true" />
                </div>
                <div
                    class="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded">
                    {{ video.duration }}
                </div>
            </template>
            <template v-else>
                <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
            </template>
        </div>

        <div class="p-4 flex gap-3">
            <Avatar :src="video.authorAvatar" size="sm" rounded="full" class="shrink-0" />
            <div class="flex flex-col gap-1 min-w-0">
                <h3 class="text-sm font-bold text-slate-900 dark:text-white leading-tight line-clamp-2">{{ video.title
                    }}</h3>
                <div class="text-[11px] text-slate-500 font-medium">
                    {{ video.author }}
                </div>
                <div class="text-[11px] text-slate-400">
                    {{ video.views }} vues • {{ video.date }}
                </div>
            </div>
            <Button variant="ghost" icon="heroicons:ellipsis-vertical" size="xs" class="ml-auto !p-0" />
        </div>
    </Card>
</template>
