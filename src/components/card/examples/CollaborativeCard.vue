<script setup lang="ts">
import { ref } from 'vue'
import { Card, Button, Avatar, Icon } from '@/index'

const comments = ref([
    { id: 1, user: 'Marc L.', text: 'Design incroyable, bravo !', date: 'il y a 5m' },
    { id: 2, user: 'Sophie A.', text: 'Est-ce que c\'est déjà disponible ?', date: 'il y a 2m' }
])

const newComment = ref('')

const addComment = () => {
    if (!newComment.value.trim()) return
    comments.value.unshift({
        id: Date.now(),
        user: 'Vous',
        text: newComment.value,
        date: 'à l\'instant'
    })
    newComment.value = ''
}
</script>

<template>
    <Card title="Collaboration Design" subtitle="Version 2.4 - Draft" class="w-full max-w-[400px]">
        <div class="space-y-4">
            <div
                class="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                <Icon name="heroicons:presentation-chart-bar" size="xl" class="text-indigo-500 opacity-50" />
                <div class="absolute top-2 right-2 flex -space-x-2">
                    <Avatar src="https://i.pravatar.cc/150?u=1" size="xs" rounded="full"
                        class="border-2 border-white" />
                    <Avatar src="https://i.pravatar.cc/150?u=2" size="xs" rounded="full"
                        class="border-2 border-white" />
                    <div
                        class="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                        +3</div>
                </div>
            </div>

            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Commentaires</h4>
                    <span class="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded font-bold">{{
                        comments.length }}</span>
                </div>

                <div class="max-h-32 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    <TransitionGroup name="comment-list">
                        <div v-for="comment in comments" :key="comment.id" class="flex gap-2">
                            <Avatar :alt="comment.user" size="xs" rounded="full" class="shrink-0" />
                            <div class="flex-1">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs font-bold text-slate-900 dark:text-white">{{ comment.user
                                        }}</span>
                                    <span class="text-[10px] text-slate-400">{{ comment.date }}</span>
                                </div>
                                <p class="text-xs text-slate-600 dark:text-slate-400">{{ comment.text }}</p>
                            </div>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </div>

        <template #footer>
            <div class="w-full flex flex-col gap-3 pt-4">
                <div class="flex gap-2">
                    <input v-model="newComment" type="text" placeholder="Ajouter un commentaire..."
                        class="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-indigo-500"
                        @keyup.enter="addComment" />
                    <Button severity="primary" size="xs" icon="heroicons:paper-airplane" @click="addComment" />
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.comment-list-enter-active,
.comment-list-leave-active {
    transition: all 0.3s ease;
}

.comment-list-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.comment-list-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
</style>
