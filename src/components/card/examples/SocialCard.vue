<script setup lang="ts">
import { Card, Button, Avatar, Icon } from '../../../index'
import { ref } from 'vue'

const props = defineProps<{
    user: {
        name: string
        username: string
        avatar: string
    },
    post: {
        content: string
        images: string[]
        likes: number
        comments: number
        date: string
    }
}>()

const isLiked = ref(false)
const localLikes = ref(props.post.likes)

const handleLike = () => {
    isLiked.value = !isLiked.value
    localLikes.value += isLiked.value ? 1 : -1
}
</script>

<template>
    <Card class="w-full max-w-[450px]" :images="post.images" double-tap-to-like @like-toggle="isLiked = $event">
        <template #header>
            <div class="flex items-center gap-3">
                <Avatar :src="user.avatar" :alt="user.name" size="md" rounded="full" />
                <div class="flex flex-col">
                    <span class="text-sm font-bold text-slate-900 dark:text-white leading-none">{{ user.name }}</span>
                    <span class="text-xs text-slate-500">@{{ user.username }} • {{ post.date }}</span>
                </div>
                <Button variant="ghost" icon="heroicons:ellipsis-horizontal" class="ml-auto" size="sm" />
            </div>
        </template>

        <p class="text-slate-800 dark:text-slate-200 mt-2 leading-relaxed">
            {{ post.content }}
        </p>

        <template #footer>
            <div class="flex items-center gap-6 w-full">
                <button class="flex items-center gap-2 group outline-none" @click="handleLike">
                    <Icon :name="isLiked ? 'heroicons:heart-solid' : 'heroicons:heart'"
                        :class="[isLiked ? 'text-rose-500' : 'text-slate-500 group-hover:text-rose-500']"
                        class="transition-colors" />
                    <span class="text-sm font-medium transition-colors"
                        :class="[isLiked ? 'text-rose-600' : 'text-slate-500 group-hover:text-rose-600']">{{ localLikes
                        }}</span>
                </button>

                <button class="flex items-center gap-2 group outline-none">
                    <Icon name="heroicons:chat-bubble-left"
                        class="text-slate-500 group-hover:text-indigo-500 transition-colors" />
                    <span class="text-sm font-medium text-slate-500 group-hover:text-indigo-500 transition-colors">{{
                        post.comments }}</span>
                </button>

                <button class="flex items-center gap-2 group outline-none">
                    <Icon name="heroicons:arrow-path"
                        class="text-slate-500 group-hover:text-emerald-500 transition-colors" />
                </button>

                <button class="ml-auto flex items-center group outline-none">
                    <Icon name="heroicons:bookmark"
                        class="text-slate-500 group-hover:text-amber-500 transition-colors" />
                </button>
            </div>
        </template>
    </Card>
</template>
